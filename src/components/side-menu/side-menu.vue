<template>
  <div class="side-menu-wrapper">
    <slot name="top"></slot>
    <Menu width="auto" theme="dark">
      <template v-for="item in list">
        <re-submenu
          v-if="item.children"
          :key="`meun_${item.name}`"
          :name="item.name"
          :parent="item">
        </re-submenu>
        <menu-item v-else :key="`meun_${item.name}`" :name="item.name">
          <Icon :type="item.icon"/>
          {{ item.title }}
        </menu-item>
      </template>
    </Menu>
    <div></div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
export default {
  name: 'SideMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ReSubmenu
  }
}
</script>
<style lang="less">
.side-menu-wrapper{
  width: 100%;
}
</style>
