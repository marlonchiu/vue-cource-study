/**拆分成为递归组件 */
<template>
  <Submenu :name="parent.name">
    <template slot="title">
      <Icon :type="parent.icon"/>
      {{ parent.meta.title }}
    </template>
    <template v-for="item in parent.children">
      <re-submenu
        v-if="item.children"
        :key="`meun_${item.name}`"
        :name="item.name"
        :parent="item">
      </re-submenu>
      <menu-item v-else :key="`meun_${item.name}`" :name="item.name">
        <Icon :type="item.icon"/>
        {{ item.meta.title }}
      </menu-item>
    </template>
  </Submenu>
</template>
<script>
export default {
  name: 'ReSubmenu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
