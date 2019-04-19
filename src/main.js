import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
// 全局引入iview组件
import iview from 'iview'
import 'iview/dist/styles/iview.css'
// 使用icont-font Symbol模式
import '@/assets/font/iconfont.js'
// 使用icont-font font-class模式
import '@/assets/font/iconfont.css'
import IconFont from '_c/icon-font'
import IconSvg from '_c/icon-svg'
// 只有在生产环境下使 用mock
if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
// 全局注册组件
Vue.component('icon-font', IconFont)
Vue.component('icon-svg', IconSvg)
Vue.use(iview)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
