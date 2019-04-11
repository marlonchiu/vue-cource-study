<template>
  <div>
    <slot name="top"></slot>
    <Menu>
      <template v-for="item in list">
        <Submenu v-if="item.children" :key="`meun_${item.name}`" :name="item.name"></Submenu>
        <menu-item v-else :key="`meun_${item.name}`" :name="item.name">{{ item.title }}</menu-item>
      </template>
    </Menu>
    <div>4444</div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
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
  }
}
</script>
