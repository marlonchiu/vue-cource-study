# vue技术栈开发实战学习

## 权限控制

0）说明

在开发中**需求不同的用户看到的页面不一样**，需要进行权限控制。一般来说是需要前端和后端一起配合来实现的。

1）简单权限控制

```javascript
    以 iview-admin为例，路由中meta属性中配置权限用户组 <code>access:['super_admin']<code>

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */


 // 适用于用户种类比较少的情况，最好不要超过10种角色
    /* 优点：
     *     后端只需要返回当前用户的用户组列表，其余的操作只需要前端来实现
     *     前端在路由中配置权限字段即可
     * 场景：
     *      适用于用户组权限数量较少，如果太多判断起来也是很痛苦的，access权限组标识太多
     *      适用于用户种类比较少的情况，最好不要超过10种角色
    */

// @/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router

// @/lib/util.js
/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}
```

2）页面级别

```text
//  服务端返回一个可访问的路由列表，然后过滤路由，
    动态的把可以访问的路由列表添加到路由实例上

 此种方法需要每一个组件都要设置组件名称，唯一不能重复
```

1. 路由 src/store/module/router.js

```javascript
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
```

2. 路由权限判断 src/router/index.js

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, getToken, setToken } from '@/lib/util'
import clonedeep from 'clonedeep'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // 默认值hash
  routes: routes
})

// 注册路由全局前置守卫
// const HAS_LOGINED = false
// 页面跳转之前的判断
router.beforeEach((to, from, next) => {
  to.meta && to.meta.title && setTitle(to.meta.title)

  // if (to.name !== 'login') { // 如果当前不是登录页面
  //   if (HAS_LOGINED) {
  //     next()
  //   } else {
  //     next({ name: 'login' })
  //   }
  // } else { // 如果是在登录页
  //   if (HAS_LOGINED) {
  //     next({ name: 'home' })
  //   } else {
  //     next()
  //   }
  // }
  // 根据token判定是否登录
  // const token = getToken()
  // if (token) { // 有token的判断
  //   // 判断登录是否有效
  //   console.log(token)
  //   store.dispatch('authorization', token).then(() => {
  //     if (to.name === 'login') { // 如果当前是登录页面
  //       next({ name: 'home' })
  //     } else {
  //       next()
  //     }
  //   }).catch(() => {
  //     // 登录验证token错误
  //     // 清除错误的token
  //     setToken('')
  //     next({ name: 'login' })
  //   })
  // } else {
  //   // 如果没有token
  //   if (to.name === 'login') { // 如果当前是登录页面
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // }
  // 根据token判定是否登录  然后进行路由权限验证
  const token = getToken()
  if (token) { // 有token的判断
    // 判断登录是否有效
    console.log(token)
    // 判断是否获取了路由列表
    if (!store.state.router.hasGetRules) {
      store.dispatch('authorization', token).then((rules) => {
        // 过滤列表（合并路由）
        store.dispatch('concatRoutes', rules).then(routers => {
          router.addRoutes(clonedeep(routers)) // 不建议直接修改state对象
          next({ ...to, replace: true })
        })
      }).catch(() => {
        // 登录验证token错误
        // 清除错误的token
        setToken('')
        next({ name: 'login' })
      })
    } else {
      next()
    }
  } else {
    // 如果没有token
    if (to.name === 'login') { // 如果当前是登录页面
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

// 全局守卫 导航被确认之前（表示所有的导航钩子结束），然后在所有组件内守卫和异步路由被解析之后被调用
// 导航被确认之前  --- 表示所有的导航钩子结束
router.beforeResolve((to, from, next) => {
  // 同beforeEach
  next()
})

// 页面跳转后的钩子
router.afterEach((form, to) => {
  // console.log(123)
  // 比如更改登录的状态
  // logining = false
})

/**
 * 路由导航解析完整的操作流程
 *  1.导航被触发
 *  2.在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 *  3.调用全局的前置守卫 beforeEach
 *  4.再重用的组件调用 beforeRouteUpdate
 *  5.调用路由独享的守卫 beforeEnter (如果不是重用的组件的话调用)
 *  6.解析异步路由组件
 *  7.在被激活的组件（即将进入的页面组件）中调用 beforeRouteEnter
 *  8.调用全局的解析守卫 beforeResolve
 *  9.导航被确认
 * 10.调用全局的后置守卫 afterEach
 * 11.触发页面DOM更新
 * 12.用创建好的实例调用beforeRouteEnter守卫里传给next的回调函数
 * */

export default router
```

3）组件级别
