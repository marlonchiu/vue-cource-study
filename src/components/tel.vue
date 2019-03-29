<template>
  <div>
    i am tel  12458798630
    <h3>收到消息：{{message}}</h3>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    // 事件监听
    this.$bus.$on('on-click', (message) => {
      this.message = message
    })
  }
}
</script>