<template>
  <li class="a-menu-item">
    <slot></slot>
  </li>
</template>
<script>
export default {
  name: 'AMenuItem'
}
</script>
<style lang="less">
.a-menu-item {
  list-style: none;
  background: rgb(118, 130, 197);
  color: #fff;
}
</style>
