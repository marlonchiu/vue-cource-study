<template>
  <div>
    <a-input v-model="inputValue"></a-input>
    <!-- 两者等价的 -->
    <!-- <a-input :value="inputValue" @input="handleInput"></a-input> -->
    <p>{{ inputValue }} --> lastLetter is {{inputValueLastLetter}}</p>
    <a-show :content="inputValue"></a-show>
    <h2>appName: {{ appName }}</h2>
    <h2>版本号是 {{appWithVersion}}</h2>
    <h2>userName：{{ userName }}</h2>
    <h2>firstLetter：{{ firstLetter }}</h2>
    <button @click="handleChangeUserName">修改USERName</button>
    <p>新的用户名：{{userName}}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <P>新的版本号： {{appVersion}}</P>
    <button @click="asyncChangeAppName">异步更新appName</button>
    <hr>
    <button @click="registerModule">动态注册模块</button>
    <ul>
      <li v-for="(item, index) in todoList" :key="index">
        <p>待办事项{{index + 1}}： {{item}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
// // 使用模块命名空间  -- 开始
// import {createNamespacedHelpers} from 'vuex'
// const {mapState} = createNamespacedHelpers('user')
// // 使用模块命名空间  -- 结束
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations([
      'SET_APP_NAME'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    ...mapMutations('user', [
      'SET_USER_NAME'
    ]),
    asyncChangeAppName () {
      this.updateAppName()
      // this.$store.dispatch('updateAppName')
    },
    handleInput (data) {
      this.inputValue = data
    },
    handleChangeUserName () {
      this.SET_USER_NAME('ZHAOJIANDONG')
    },
    handleChangeAppName () {
      // this.$store.commit('SET_APP_NAME', 'newAppName')
      // this.$store.commit('SET_APP_NAME', {
      //   appName: 'newAppName'
      // })
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   appName: 'newAppName'
      // })
      this.SET_APP_NAME('newAppName')
      this.$store.commit('SET_APP_VERSION')
    },
    registerModule () {
      // store 有一个注册模块的方法registerModule  
      //    第一个属性 要注册模块的名称
      //    第二个属性 是个对象  要注册的模块属性
      // this.$store.registerModule('todo', {
      //   state: {
      //     todoList: [
      //       '吃饭',
      //       '睡觉',
      //       '打豆豆'
      //     ]
      //   }
      // })
      // 给user模块添加模块
      this.$store.registerModule(['user', 'todo'], {
        state: {
          todoList: [
            '吃饭',
            '睡觉',
            '打豆豆'
          ]
        }
      })
    }
  },
  // vuex中的数据处理引入
  computed: {
    // appName () {
    //   return this.$store.state.appName // 获取 state中值
    // },
    // appWithVersion () {
    //   return this.$store.getters.appWithVersion // 获取 getters中值
    // },
    // userName () {
    //   return this.$store.state.user.userName // 获取模块中state的值  其中user代表的是模块名
    // },
    ...mapState([
      'appName',
      'appVersion'
    ]),
    ...mapGetters([
      'appWithVersion'
    ]),
    // ...mapState([
    //   'userName'
    // ]),
    ...mapState({
      appName: state => state.appName,
      userName: state => state.user.userName, // state.模块名.属性值
      // todoList: state => state.todo && state.todo.todoList // state.模块名.属性值
      todoList: state => state.user.todo ? state.user.todo.todoList : []
    }),
    // ...mapState('user', { // 使用了模块命名空间
    //   userName: state => state.userName // state.模块名.属性值
    // }),

    ...mapState('user', [
      'userName'
    ]),
    ...mapGetters('user', [
      'firstLetter'
    ]),
    inputValueLastLetter () {
      return this.inputValue.substr(-1, 1)
    }
  },
  components: {
    AInput,
    AShow
  }
}
</script>
