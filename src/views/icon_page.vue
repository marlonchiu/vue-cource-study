<template>
  <div>
    <Icon type="md-menu" :size="50" color="pink"/>
    <br>
    <!-- Unicode图标 -->
    <span>Unicode图标：</span>
    <i class="iconfont" style="color: green;">&#xe748;</i>
    <i class="iconfont">&#xe741;</i>
    <br>
    <!-- Symbol图标 -->
    <span>Symbol图标：</span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-wode"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-yaopin"></use>
    </svg>
    <br>
    <!-- font-class图标 -->
    <span>font-class图标：</span>
    <i class="iconfont icon-shouye"></i>
    <i class="iconfont icon-anquan"></i>
    <Icon custom="iconfont icon-anquan" color="pink"/>
    <br>
    <!-- 单色图标组件 -->
    <span>单色图标组件图标：</span>
    <icon-font icon="lishi" :size="24" color="blue"></icon-font>
    <br>
    <!-- 多色图标组件 -->
    <span>多色图标组件图标：</span>
    <icon-svg icon="wode" :size="24"></icon-svg>
  </div>
</template>
<script>
export default {
  name: 'icon_page'
}
</script>
