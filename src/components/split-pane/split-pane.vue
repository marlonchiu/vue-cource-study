<template>
  <div class="split-pane-wrapper">
    <div class="pane pane-left" :style="{width: leftOffsetPercent}">
      <button @click="changeWidth">改变宽度</button>
    </div>
    <div class="pane-trigger-con" :style="{width: `${triggerWidth}px`, left: triggerLeft}"></div>
    <div class="pane pane-right" :style="{left: leftOffsetPercent}"></div>
  </div>
</template>
<script>
export default {
  name: 'SplitPane',
  props: {
    triggerWidth: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      leftOffset: 0.3
    }
  },
  computed: {
    leftOffsetPercent () {
      return `${this.leftOffset * 100}%`
    },
    triggerLeft () {
      // return `calc(30% - 4px)` // css3提供的计算属性
      return `calc(${this.leftOffset * 100}% - ${this.triggerWidth / 2}px)` // css3提供的计算属性
    }
  },
  methods: {
    changeWidth () {
      this.leftOffset += 0.02
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
    &-trigger-con {
      // width: 8px;
      height: 100%;
      position: absolute;
      top: 0;
      background: red;
      z-index: 10;
    }
  }
}
</style>
