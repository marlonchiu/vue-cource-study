<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/image/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <p>{{food}}</p>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转页面</button>
    <button @click="handleClick('replace')">替换页面</button>
    <button @click="handleRequestUserInfo">请求数据</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { getUserInfo } from '@/api/user'

export default {
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  name: 'home',
  beforeRouteEnter (to, from, next) {
    // console.log(to.name)
    // 此时页面还没有渲染  没有this实例
    // if (from.name === 'about') {
    //   alert('我是从about页面来的')
    // } else {
    //   alert('我不是从about页面来的')
    // }
    next(vm => {
      console.log(vm)
    })
  },
  // 在离开页面时调用
  beforeRouteLeave (to, from, next) {
    // const leave = confirm('确认离开吗？')
    // if(leave) {
    //   next()
    // } else{
    //   next(false)
    // }
    next()
  },
  methods: {
    handleClick (type) {
      if (type === 'back') {
        this.$router.back()
      } else if (type === 'push') {
        const name = 'mudong'
        this.$router.push({
          // name: 'named_view',
          // query: {
          //   name: '123'
          // }
          // name: 'argu',
          // params: {
          //   name: 'mudong'
          // }
          path: `/argu/${name}`
        })
      } else if (type === 'replace') {
        this.$router.replace({
          name: 'named_view'
        })
      }
      // if (type === 'back') this.$router.back()
      // else if (type === 'push') this.$router.push('/named_view')
    },
    handleRequestUserInfo () {
      getUserInfo({ userId: 21 }).then(res => {
        console.log('res: ', res)
      })
    }
  },
  components: {
    // HelloWorld
  }
}
</script>
