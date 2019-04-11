import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import { setTitle, getToken, setToken } from '@/lib/util'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // 默认值hash
  routes: routes
})

// 注册路由全局前置守卫
const HAS_LOGINED = true
// 页面跳转之前的判断
router.beforeEach((to, from, next) => {
  to.meta && to.meta.title && setTitle(to.meta.title)

  if (to.name !== 'login') { // 如果当前不是登录页面
    if (HAS_LOGINED) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else { // 如果是在登录页
    if (HAS_LOGINED) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
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
 *  */

export default router
