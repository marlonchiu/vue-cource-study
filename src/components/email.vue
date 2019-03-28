<template>
  <div>
    i am email  jiandong@163.com
    <button @click="handleClick">点击一下</button>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$bus)
  },
  methods: {
    handleClick() {
      this.$bus.$emit('on-click', 'hello')
    }
  }
}
</script>

