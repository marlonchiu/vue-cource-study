import Vue from 'vue'
// import App from './App.vue'
import countTo from '_c/count-to'
import router from './router'
import store from './store'
import Bus from './lib/bus'
// 只有在生产环境下使用mock
if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus

new Vue({
  router,
  store,
  // render: h => h(App),
  render: h => {
    // h函数可传入三个属性
    //   第一个标签或者组件或者对象
    //   第二个可以给传入的第一个设置属性样式
    //   第三个 第一个元素中的内容  可以为字符串、数组（多个元素）
    // return h('div', {
    //   attrs: {
    //     id: 'app'
    //   },
    //   style: {
    //     color: 'red'
    //   }
    // }, 'lison')
    return h(countTo, { // 引入渲染组件
      // 添加类名 数组或者字符串或者对象形式
      // 'class': [
      //   'count-to-01',
      //   'count-to-02'
      // ],
      'class': {
        'count-to_c': true
      },
      attrs: {},
      style: {},
      // domProps: {
      //   innerHTML: 'ABS'
      // },
      props: {
        endVal: 1000
      },
      // 绑定事件(引用组件自身定义事件)
      on: {
        'on-animation-end': (val) => {
          console.log('animation end')
        }
      },
      // 绑定事件(新增加自身定义事件)
      nativeOn: {
        'click': () => {
          console.log('自定义点击事件')
        }
      },
      directives: [], // 指令
      scopedSlots: {},
      slot: '', // 插槽 默认default
      key: '',
      ref: ''
    })
  }
}).$mount('#app')
