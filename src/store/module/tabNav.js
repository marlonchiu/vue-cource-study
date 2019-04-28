// 多tab页存入的点开tab
import { routeHasExist, getRouteById, routeEqual, localSave, localRead } from '@/lib/util'
const state = {
  // tabList: []
  // tabList从本地读
  tabList: JSON.parse(localRead('tabList') || '[]')
}

const getTabListToLocal = tabList => {
  // 只保存有效的信息即可
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  UPDATE_ROUTER (state, route) {
    // 如果不存在才放入
    if (!routeHasExist(state.tabList, route) && route.name !== 'login') state.tabList.push(route)
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  },
  REMOVE_TAB (state, index) {
    state.tabList.splice(index, 1)
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  handleRemove ({ commit }, { id, $route }) {
    return new Promise((resolve) => {
      let route = getRouteById(id)
      let index = state.tabList.findIndex(item => {
        return routeEqual(route, item)
      })
      let len = state.tabList.length
      // 定义关闭后的跳转路由
      let nextRoute = {}
      if (routeEqual($route, state.tabList[index])) {
        // 如果关闭tab后边还有打开的就跳转到后边的一个
        if (index < len - 1) nextRoute = state.tabList[index + 1]
        // 如果关闭tab后边没有打开的就跳转到前边的一个
        else nextRoute = state.tabList[index - 1]
      }
      const { name, params, query } = nextRoute || { name: 'home_index' }
      commit('REMOVE_TAB', index)
      resolve({
        name, params, query
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
