# vue技术栈开发实战学习

## 从SplitPane组件谈Vue中如何"操作"DOM

1）简单两列布局

```html
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
      // 绑定更新一的方法
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

``` JavaScript
// 拖动方法
  
  // <div class="pane-trigger-con" @mousedown="handleMousedown"></div>
  // trigger元素绑定鼠标事件
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
    // 绑定更新一的方法
    // this.$emit('input', offsetPercent)
    // 绑定更新三的方法 .sync
    this.$emit('update:value', offsetPercent)
  },
  handleMouseup () {
    this.canMove = false
  }


// 鼠标拖动的提示样式
cursor: col-resize;
```

4）v-model和.sync的用法

```vue
// 通知更新值的三个方法（父子组件）
    <!-- 绑定更新一 -->
    <!-- <split-pane :value="offset" @input="handleInput"></split-pane> -->
    // 父组件写个方法
    handleInput (value) {
      this.offset = value
    }
    // 子组件
    // 绑定更新一 二的方法
    // this.$emit('input', offsetPercent)

    <!-- 绑定更新二 -->
    <!-- <split-pane v-model="offset"></split-pane> -->
    // 子组件
    // 绑定更新一 二的方法
    // this.$emit('input', offsetPercent)

    <!-- 绑定更新三 -->
    <split-pane :value.sync="offset"></split-pane>
    // 绑定更新三的方法 .sync
    this.$emit('update:value', offsetPercent)   // update后边冒号跟sync的值
```

## 渲染函数和JSX快速掌握

1）render函数

```javascript
// main.js

// import App from './App.vue'
import countTo from '_c/count-to'


new Vue({
  router,
  store,
  // render: h => h(App),
  render: h => {
    // h函数可传入三个属性
    //   第一个标签或者组件或者对象
    //   第二个可以给传入的第一个设置属性样式
    //   第三个 第一个元素中的内容  可以为字符串、数组（多个元素）
    // return h('div', {
    //   attrs: {
    //     id: 'app'
    //   },
    //   style: {
    //     color: 'red'
    //   }
    // }, 'lison')
    return h(countTo, { // 引入渲染组件
      // 添加类名 数组或者字符串或者对象形式
      // 'class': [
      //   'count-to-01',
      //   'count-to-02'
      // ],
      'class': {
        'count-to_c': true
      },
      attrs: {},
      style: {},
      // domProps: {
      //   innerHTML: 'ABS'
      // },
      props: {
        endVal: 1000
      },
      // 绑定事件(引用组件自身定义事件)
      on: {
        'on-animation-end': (val) => {
          console.log('animation end')
        }
      },
      // 绑定事件(新增加自身定义事件)
      nativeOn: {
        'click': () => {
          console.log('自定义点击事件')
        }
      },
      directives: [], // 指令
      scopedSlots: {},
      slot: '', // 插槽 默认default
      key: '',
      ref: ''
    })
  },

  // 第二个属性如果不需要可以不写  第三个为字符串或者数组
  // render: h => h('div', '123')
  render: h => h('div', [
    h('span', '111'),
    h('span', '222')
  ])
}).$mount('#app')


// 渲染列表
const handleClick = event => {
  console.log(event)
  event.stopPropagation()
}
let itemList = [{ name: 'lison' }, { name: 'marlon' }]
const getLiEleArr = (h) => {
  return itemList.map((item, index) => h('li', {
    'class': `list_item_${index}`,
    on: {
      'click': handleClick
    },
    key: `list_item_${index}`
  }, item.name))
}

render: h => h('div', [
  h('ul', {
    on: {
      'click': handleClick
    }
  }, getLiEleArr(h))
])
```

2）函数式组件

``` vue
// .../list/render-dom.js
/**
 * @description
 * 函数式组件
 * 只提供数据，不监听状态  没有实例
 * 在被引用时会被处理
 */
export default {
  functional: true,
  props: {
    name: String,
    renderFunc: Function
  },
  render: (h, ctx) => { // 第一个h代表渲染函数  第二个ctx表示当前实例
    return ctx.props.renderFunc(h, ctx.props.name)
  }
}

// ...list/list.vue  相当于组件的用法
<render-dom v-else :render-func="render" :name="item.name"></render-dom>

import RenderDom from './render-dom.js'
components: {
  RenderDom
}


// render-page.vue
<list :list="itemList" :render="renderFunc"></list>

import List from '_c/list'
data () {
    return {
      itemList: [
        { name: 'lison' },
        { name: 'marlon' }
      ]
    }
  },
  methods: {
    renderFunc (h, name) {
      // 函数式组件用法
      return h('i', {
        style: {
          color: 'pink'
        }
      }, name)
    }
  },
  components: {
    List
  }
```

3）JSX语法

```javascript
// render-page.vue
methods: {
  handleClick (event) {
    console.log(event)
  },
  renderFunc (h, name) {
    // 函数式组件用法
    // return h('i', {
    //   style: {
    //     color: 'pink'
    //   }
    // }, name)

    // JSX语法
    return (
      <i on-click={this.handleClick} style={{color: 'red'}}>{name}</i>
    )
  }
},


// 渲染组件的用法
import CountTo from '_c/count-to'

// nativeOn-开头 原生事件  on-开头表示组件自身的事件
renderFunc (h, number) {
  return (
    <CountTo endVal={number} nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd}></CountTo>
  )
},
handleEnd () {
  console.log('end!')
}

// 使用render渲染的组件方法  vue的一些指令语法是不可以使用的
```

4）作用域插槽

```vue
// list.vue
<ul>
  <li v-for="(item, index) in list2" :key="`list_item_${index}`">
    <!-- 作用域插槽 -->
    <slot :number="item.number"></slot>
  </li>
</ul>

// render-page.vue
// countTo作为组件引入
<!-- 作用域插槽 -->
// count属性会包括传入的数据
<list :list2="itemList2">
  <count-to slot-scope="count" :end-val="count.number"></count-to>
</list>

// 可以配合具名插槽使用
// 扩展  vue文档渲染函数的内容  https://cn.vuejs.org/v2/guide/render-function.html
```

## 递归组件的使用

1）封装简单的Menu组件
2）递归组件

```vue
// menu-page.vue

<template>
  <div class="menu-box">
    <!-- <a-menu>
      <a-menu-item>1</a-menu-item>
      <a-menu-item>2</a-menu-item>
      <a-submenu>
        <div slot="title">3333</div>
        <a-menu-item>3333-11</a-menu-item>
        <a-submenu>
          <div slot="title">3333-22</div>
          <a-menu-item>3333-22-11</a-menu-item>
          <a-menu-item>3333-22-22</a-menu-item>
        </a-submenu>
      </a-submenu>
    </a-menu> -->
    <a-menu>
      <template v-for="(item, index) in list">
        <a-menu-item v-if="!item.children" :key="`meun_item_${index}`">{{ item.title }}</a-menu-item>
        <re-submenu v-else :key="`meun_item_${index}`" :parent="item" :index="index"></re-submenu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import menuComponents from '_c/menu'
import ReSubmenu from '@/views/re-submenu.vue'
const { AMenu, ASubmenu, AMenuItem } = menuComponents
export default {
  name: 'menu_page',
  data () {
    return {
      list: [
        { title: '111' },
        { title: '222' },
        { title: '333',
          children: [
            { title: '333-11' },
            { title: '333-22' },
            { title: '333-33',
              children: [
                { title: '333-33-1' },
                { title: '333-33-2',
                  children: [
                    { title: '333-33-1-01' },
                    { title: '333-33-1-02' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    // ...menuComponents
    AMenu,
    ASubmenu,
    AMenuItem,
    ReSubmenu
  }
}
</script>
<style lang="less">
.menu-box {
  width: 300px;
  height: 400px;
  background: pink;
}
</style>


// 递归组件 re-submenu.vue

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
```