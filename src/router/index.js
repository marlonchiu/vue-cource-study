import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // 默认值hash
  routes: routes
})

// 注册路由全局前置守卫
const HAS_LOGINED = true
// 页面跳转之前的判断
router.beforeEach((to, from, next) => {
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
})

// 全局守卫 导航被确认之前（表示所有的导航钩子结束），然后在所有组件内守卫和异步路由被解析之后被调用
// 导航被确认之前  --- 表示所有的导航钩子结束
router.beforeResolve((to, from, next) => {
  // 同beforeEach
})

// 页面跳转后的钩子
router.afterEach((form, to) => {
  // console.log(123)
  // 比如更改登录的状态
  // logining = false
})

export default router
