/**拆分成为递归组件 */
<template>
  <Dropdown placement="right-start" @on-click="handleClick">
    <span class="drop-menu-span" :style="titleStyle">
      <Icon :type="parent.icon" :color="iconColor" size="20"/>
      <span v-if="showTitle">{{ parent.title }}</span>
    </span>
    <DropdownMenu slot="list">
      <template v-for="item in parent.children">
        <re-dropdown
          v-if="item.children"
          :key="`drop_${item.name}`"
          :parent="item">
        </re-dropdown>
        <DropdownItem v-else :key="`drop_${item.name}`" :name="item.name">
          <Icon :type="item.icon" size="20"/>
          {{ item.title }}
        </DropdownItem>
      </template>
  </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  name: 'ReDropdown',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    iconColor: {
      type: String,
      default: '#515a6e'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick (name) {
      // if (!this.showTitle) { // 如果不判断的话会触发两次的点击（第三级点击）
      //   console.log(name)
      // }   
      // 将两个操作统一一下
      if (!this.showTitle) this.$emit('on-select', name) 
    }
  },
  computed: {
    titleStyle () {
      return {
        textAlign: this.showTitle ? 'left' : 'center',
        paddingLeft: this.showTitle ? '16px' : '0'
      }
    }
  }
}
</script>
