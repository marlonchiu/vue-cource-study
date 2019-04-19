import { routes, routerMap } from '@/router/router'

const state = {
  routers: routes,
  // 判断是否获取了路由的列表
  hasGetRules: false
}

const mutations = {
  CONCAT_ROUTERS (state, routerList) {
    state.routers = routerList.concat(routes)
    state.hasGetRules = true
  }
}

// 过滤路由数组 可访问的
const getAccessRouterList = (routes, rules) => {
  return routes.filter(item => {
    if (rules[item.name]) {
      if (item.children) item.children = getAccessRouterList(item.children, rules)
      return true
    } else {
      return false
    }
  })
}
const actions = {
  concatRoutes ({ commit }, rules) {
    return new Promise((resolve, reject) => {
      try {
        let routerList = []
        // Object.entries()  ES6 可以把二维对象转换成数组列表 属性作为某个想的第一个值，key作为第二个值
        // Object.entries(rules).every(item => true) 对数组的每一个进行判断，如果有一个为false则直接返回false,终止判断
        if (Object.entries(rules).every(item => item[1])) { // 如果返回true 表示都可以访问
          routerList = routerMap
        } else { // 删选符合条件的
          routerList = getAccessRouterList(routerMap, rules)
        }
        // 合并路由列表
        commit('CONCAT_ROUTERS', routerList)
        resolve(state.routers)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  // namespaced: true, // 使用模块命名空间 此时不会受其他外界模块的干扰
  state,
  mutations,
  actions
}
