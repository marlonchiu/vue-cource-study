<template>
  <div>
    <!-- {{ id }} -->
    {{ $route.params.id}}
  </div>
</template>

<script>
export default {
  props: {
    id: {
      // type: [String, Number],
      type: String,
      default: 'marlon'
    }
  },
  // 组件路由发生变化 组件页面复用是调用
  beforeRouteUpdate (to, from, next) {
    // 此时this是存在的  是可以使用的
    console.log(to.name, from.name)
    next()
  }
}
</script>
