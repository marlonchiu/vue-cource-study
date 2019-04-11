<template>
  <div class="login-page">
    <div class="login-item">
      <p>用户名：</p>
      <input type="text" v-model="userName">
    </div>
    <div class="login-item">
      <p>密密码：</p>
      <input type="password" v-model="password">
    </div>
    <div class="login-item">
      <button @click="handleSubmit">点击登录</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      userName: 'marlonchiu',
      password: '123'
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit () {
      // 登录请求
      this.login({
        userName: this.userName,
        password: this.password
      }).then(() => {
        console.log('success!!!')
        this.$router.push({
          name: 'home'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less">
.login-page{
  & *{
    padding: 0;
    margin: 0;
  }
  .login-item{
    height: 32px;
    display: flex;
    align-items: center;
  }
}
</style>
