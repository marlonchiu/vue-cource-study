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
  </div>
</template>
<script> 
import { mapState, mapGetters } from 'vuex'
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
    handleInput (data) {
      this.inputValue = data
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
      'appName'
    ]),
    ...mapGetters([
      'appWithVersion'
    ]),
    // ...mapState([
    //   'userName'
    // ]),
    // ...mapState({
    //   appName: state => state.appName,
    //   userName: state => state.user.userName // state.模块名.属性值
    // })
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
