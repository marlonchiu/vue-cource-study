<template>
  <div class="split-pane-wrapper">
    <div class="pane pane-left" :style="{width: leftOffsetPercent}"></div>
    <div></div>
    <div class="pane pane-right" :style="{left: leftOffsetPercent}"></div>
  </div>
</template>
<script>
export default {
  name: 'SplitPane',
  data () {
    return {
      leftOffset: 0.3
    }
  },
  computed: {
    leftOffsetPercent () {
      return `${this.leftOffset * 100}%`
    }
  }
}
</script>
<style lang="less">
.split-pane-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .pane {
    position: absolute;
    top: 0;
    height: 100%;
    &-left {
      // width: 30%;
      background: palevioletred;
    }
    &-right {
      right: 0;
      bottom: 0;
      // left: 30%;
      background: paleturquoise;
    }
  }
}
</style>
