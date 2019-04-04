# vue技术栈开发实战学习

## 从SplitPane组件谈Vue中如何"操作"DOM

1）简单两列布局

```html
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
```

2）如何让两个div改变宽度

```html

// 计算值
data () {
    return {
      leftOffset: 0.3  // 偏移量
    }
},
// 改变一个值，可以动态改变两列的宽度
computed: {
    leftOffsetPercent () {
        return `${this.leftOffset * 100}%`
    }
},

// 页面使用计算值
<div class="split-pane-wrapper">
    <div class="pane pane-left" :style="{width: leftOffsetPercent}"></div>
    <div class="pane pane-right" :style="{left: leftOffsetPercent}"></div>
</div>

// 总结：
  计算得到的值  左边栏作为宽度，右边的栏作为左偏移量
```
3）鼠标拖动效果
4）v-model和.sync的用法