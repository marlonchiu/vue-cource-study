# vue技术栈开发实战学习

## 状态管理
0）数据通信
```
// 子组件传值父组件  $emit
    子组件 $emit 发布emit 事件  事件名  this.$emit('input', value)
    父组件 v-model绑定  （等价于监听 $emit事件名）  @input="handleInput"

// 两个子组件之间传值  找到公共的父组件（一个子组件 -> 公共父组件 -> 另一个子组件）
    十分强调组件之间的关系
```

1）Bus
```
// 原理：本质上是创建一个空的vue实例，作为交互的中介
// ../lib/bus.js
    import Vue from 'vue'
    const Bus = new Vue()
    export default Bus

  ...email.vue
    button触发事件  methods
        handleClick() {
        this.$bus.$emit('on-click', 'hello')
        }
  ...tel.vue
    事件监听 mounted
    this.$bus.$on('on-click', (message)=> {
      this.message = message
    })

   本质上来说就是空的vue实例作为公共的父组件了，这样tel.vue email.vue都是该实例的子组件 

   pubsub.js 的原理就是这样

```

2) Vuex --基础--state&getter

```
// 获取state 的多种方法
    1. 已知用法
     import {mapState} from 'vuex'

    // vuex中的数据处理引入
    computed: {
        // 方法一
        appName () {
          return this.$store.state.appName // 获取 state中值
        },
        userName () {
          return this.$store.state.user.userName // 获取模块中state的值  其中user代表的是模块名
        },

        // 方法二
        ...mapState({
          appName: state => state.appName,
          userName: state => state.user.userName // state.模块名.属性值
        }),

        // 方法三
        ...mapState([
          'appName',
        ]),
        ...mapState('user', [
          'userName'
        ]),

        <!--
         需要在user.js 中使用
         namespaced: true, // 使用模块命名空间 此时不会受其他外界模块的干扰
         -->
        ...mapState('user', { // 使用了模块命名空间
          userName: state => state.userName // state.模块名.属性值
        })
    },

    2.扩展方法
    使用模块命名空间
    // 使用模块命名空间  -- 开始
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('user')
    // 使用模块命名空间  -- 结束
    computed: {
      ...mapState([
        'userName'  // 也可以直接获取值
      ])
    }

// getter值的获取 -- 相当于计算属性
    基本的用法跟state一样
    ...mapGetters([
      'appWithVersion'
    ]),
    ...mapGetters('user', [
      'firstLetter'
    ]),
    
```

3) Vuex --基础--mutation&action/module
4) Vuex --进阶