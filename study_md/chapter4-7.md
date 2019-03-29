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
    
    特殊：如果模块不开启命名空间，也是可以通过mapGetters获得相应的值的

// 如果模块不开启命名空间的话，直接也可以取得相应的属性值
    
```

3) Vuex --基础--mutation&action/module

```
const mutations = {
  // SET_APP_NAME (state, params) {
  //   state.appName = params
  // }

  // SET_APP_NAME (state, params) {
  //   state.appName = params.appName
  // }

  SET_APP_NAME (state, params) {
    state.appName = params.appName
  },
  // 新添加的属性（最上边要引入 import Vue from 'vue'）
  SET_APP_VERSION (state) { // 给state中添加属性和值
    Vue.set(state, 'appVersion', 'v2.0') // 三个参数依次 给谁添加属性  属性名 属性值
  }
}
export default mutations

对应页面（提交数据方法）
methods: {
    handleChangeAppName() {
      // this.$store.commit('SET_APP_NAME', 'newAppName')

      // this.$store.commit('SET_APP_NAME', {
      //   appName: 'newAppName'
      // })

      this.$store.commit({
        type: 'SET_APP_NAME',
        appName: 'newAppName'
      })

      // 增加版本号的属性的方法 mutations
      this.$store.commit('SET_APP_VERSION')
    }
  },

    // 正规用法
    import { mapMutations } from 'vuex'
    methods: {
      ...mapMutations([
        'SET_APP_NAME'
      ]),
      // 在模块中的用法（对于开启命名空间的模块）
      ...mapMutations('user',[
        'SET_USER_NAME'
      ]),

      handleChangeAppName() {
        this.SET_APP_NAME('newAppName')
      },
      handleChangeUserName() {
        this.SET_USER_NAME('ZHAOJIANDONG')
      },
    }, 


    ***
        加强说明： 对于vuex来说 mapGetters mapMutations 的模块中的方法都会被解析到外部全局，
            所以使用的时候是完全不需要写模块名也是可以获取值和调用方法的
            （前提：未开启命名空间，不能写 namespaced: true, // 使用模块命名空间 此时不会受其他外界模块的干扰）
        对于命名空间的用法  都可以采用的是
            // 使用模块命名空间  -- 开始
            import {createNamespacedHelpers} from 'vuex'
            const {mapState, mapGetters, mapMutations} = createNamespacedHelpers('user')
            // 使用模块命名空间  -- 结束

```

* actions 异步请求的操作
```
...store/actions.js
// 模拟下异步请求
import { getAppName } from '@/api/app.js'

const actions = {
  updateAppName ({ commit }) {
    getAppName().then((res) => {
      console.log(res)
      if (res.code === 200) {
        // const newAppName = res.info.appName
        // // 提交mutation 请求
        // commit('SET_APP_NAME', newAppName)
        const { info: { appName } } = res
        // 提交mutation 请求
        commit('SET_APP_NAME', appName)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 或者如下 ES8 好酷好酷的
  async updateAppName ({ commit }) {
    // 处理异常情况下  包在try...catch... 语句中
    try {
      // es6 解构赋值解析
      const { info: { appName } } = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (error) {
      console.log(error)
    }
  }
}

export default actions

... api/app.js
// 模拟异步接口
export const getAppName = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) {
        resolve({
          code: 200,
          info: { appName: 'SOMOOC' }
        })
      } else {
        reject(err)
      }
    }, 2000)
  })
}

... 页面操作
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapActions([
      'updateAppName' // actions中定义的方法名称
    ]),
    asyncChangeAppName () {
      this.updateAppName()
      // 或者
      this.$store.dispatch('updateAppName')
    }
  },
```

* 模块中的用法
```
模块中套模块的用法
...mapState('user/next', [  // next 表示user module中的下一级模块名（属性配置跟最外层的store一样）
    'userName'
]),


// 动态注册模块
// 页面组件触发方法
methods: {
    registerModule () {
      // store 有一个注册模块的方法registerModule  
      //    第一个属性 要注册模块的名称
      //    第二个属性 是个对象  要注册的模块属性

      //  给store注册模块
      // this.$store.registerModule('todo', {
      //   state: {
      //     todoList: [
      //       '吃饭',
      //       '睡觉',
      //       '打豆豆'
      //     ]
      //   }
      // })

      // 给user模块添加模块（给模块注册模块）
      this.$store.registerModule(['user', 'todo'], {
        state: {
          todoList2: [
            '吃饭',
            '睡觉',
            '打豆豆'
          ]
        }
      })
    }
},
computed: {
    ...mapState({
        // 新注册的模块在执行方法之前是不存在的  要先判断有没有再赋值
      // todoList: state => state.todo && state.todo.todoList // state.模块名.属性值
      todoList2: state => state.user.todo ? state.user.todo.todoList : []
    }),
}
```


4) Vuex --进阶