<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{width: leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px`}">
      <slot name="left"></slot>
    </div>
    <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{width: `${triggerWidth}px`, left: triggerLeft}"></div>
    <div class="pane pane-right" :style="{left: leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px`}">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SplitPane',
  props: {
    /**
     * @description
     * 初始偏移量
     */
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data () {
    return {
      leftOffset: 0.3,
      canMove: false, // 记录鼠标移动的标识
      initOffset: 0 // 鼠标在条上的偏移量
    }
  },
  computed: {
    leftOffsetPercent () {
      return `${this.value * 100}%`
    },
    triggerLeft () {
      // return `calc(30% - 4px)` // css3提供的计算属性
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)` // css3提供的计算属性
    }
  },
  methods: {
    changeWidth () {
      this.value += 0.02
    },
    // 鼠标按下的事件
    handleMousedown (event) {
      document.addEventListener('mousemove', this.handleMousemove) // 鼠标按下事件监听
      document.addEventListener('mouseup', this.handleMouseup) // 鼠标抬起事件监听
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMove = true
    },
    // 鼠标移动事件
    handleMousemove (event) {
      // 只有鼠标按下才可以移动
      if (!this.canMove) return
      const outerRect = this.$refs.outer.getBoundingClientRect()
      let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width
      if (offsetPercent <= this.min) offsetPercent = this.min
      if (offsetPercent >= this.max) offsetPercent = this.max
      // this.value = offsetPercent
      // 绑定更新一 二的方法
      // this.$emit('input', offsetPercent)
      // 绑定更新三的方法 .sync
      this.$emit('update:value', offsetPercent)
    },
    handleMouseup () {
      this.canMove = false
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
      user-select: none; // 取消选中的效果
      cursor: col-resize;
    }
  }
}
</style>
