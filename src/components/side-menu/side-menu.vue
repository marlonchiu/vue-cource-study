<template>
  <div class="side-menu-wrapper">
    <slot name="top"></slot>
    <!-- 展开样式展示-->
    <Menu v-show="!collapsed" width="auto" theme="dark" @on-select="handleSelect">
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
    <!-- 收缩样式展示 -->
    <div v-show="collapsed" class="drop-wrapper">
      <template v-for="item in list">
        <re-dropdown
          @on-select="handleSelect"
          icon-color="#fff"
          :show-title="false"
          v-if="item.children"
          :key="`drop_${item.name}`"
          :parent="item">
        </re-dropdown>
        <Tooltip v-else transfer placement="right" theme="dark" :content="item.title" :key="`drop_${item.name}`">
          <span class="drop-menu-span" @click="handleSelect(item.name)">
            <Icon :type="item.icon" color="#fff" size="20"/>
          </span>
        </Tooltip>
      </template>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
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
  methods: {
    handleSelect (name) {
      console.log(name)
    },
    handleIconSelect (name) {
      console.log(name)
    }
  },
  components: {
    ReSubmenu,
    ReDropdown
  }
}
</script>
<style lang="less">
.side-menu-wrapper{
  width: 100%;
  .ivu-tooltip, .drop-menu-span{
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
  }
  .drop-wrapper > .ivu-dropdown{
    display: block;
    padding: 5px 0;
    margin: 0 auto;
  }
}
</style>
