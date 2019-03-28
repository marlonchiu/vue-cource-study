<template>
  <div>
    {{name}}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      // type: [String, Number],
      type: String,
      default: 'zhaojiandong'
    }
  },
  // 组件路由发生变化 组件页面复用是调用
  beforeRouteUpdate (to, from, next) {
    // 此时this是存在的  是可以使用的
    console.log(to.name)
    // next()
  }
}
</script>
