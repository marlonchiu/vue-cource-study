<template>
  <div class="menu-box">
    <a-menu>
      <a-menu-item>1</a-menu-item>
      <a-menu-item>2</a-menu-item>
      <!-- 二级标题 -->
      <a-submenu>
        <div slot="title">3333</div>
        <a-menu-item>3333-1</a-menu-item>
        <a-menu-item>3333-2</a-menu-item>
      </a-submenu>
    </a-menu>
  </div>
</template>
<script>
import menuComponents from '_c/menu'
const { AMenu, ASubmenu, AMenuItem } = menuComponents
export default {
  name: 'menu_page',
  components: {
    // ...menuComponents
    AMenu,
    ASubmenu,
    AMenuItem
  }
}
</script>
<style lang="less">
.menu-box {
  width: 300px;
  height: 400px;
  background: pink;
}
</style>
