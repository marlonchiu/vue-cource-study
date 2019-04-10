/** 递归组件 */
<template>
  <a-submenu>
    <div slot="title">{{ parent.title }}</div>
    <template v-for="(item, i) in parent.children">
      <a-menu-item v-if="!item.children" :key="`meun_item_${index}_${i}`">{{ item.title }}</a-menu-item>
      <!-- 如果存在子节点 循环调用自己 -->
      <re-submenu v-else :key="`meun_item_${index}_${i}`" :parent="item" :index="i"></re-submenu>
    </template>
  </a-submenu>
</template>
<script>
import menuComponents from '_c/menu'
const { ASubmenu, AMenuItem } = menuComponents
export default {
  name: 'ReSubmenu', // 必须要有name值  才可以在当前循环调用
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    ASubmenu,
    AMenuItem
  }
}
</script>
