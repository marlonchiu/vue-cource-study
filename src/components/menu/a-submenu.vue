/**
 * 收缩的二级菜单
 */
<template>
  <ul class="a-submenu">
    <!-- 显示标题 -->
    <div class="a-submenu-title" @click="toggleShowChild">
      <slot name="title"></slot>
      <span class="shrink-icon" :style="{ transform: `rotateZ(${showChild ? 0 : 180}deg)`}">^</span>
    </div>
    <div v-show="showChild" class="a-submenu-child-box">
      <slot></slot>
    </div>
  </ul>
</template>
<script>
export default {
  name: 'ASubmenu',
  data () {
    return {
      showChild: false
    }
  },
  methods: {
    toggleShowChild () {
      this.showChild = !this.showChild
    }
  }
}
</script>
<style lang="less">
.a-submenu{
  &-title{
    position: relative;
    background: red;
    color: #fff;
    cursor: pointer;
    .shrink-icon{
      position: absolute;
      top: 0px;
      right: 10px;
    }
  }
  &-child-box{
    overflow: hidden;
    padding-left: 20px;
  }
}
</style>
