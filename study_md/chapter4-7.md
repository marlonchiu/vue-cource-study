# vue技术栈开发实战学习

## 状态管理
0）数据通信
```
// 子组件传值父组件  $emit
    子组件 $emit 发布emit 事件  事件名  this.$emit('input', value)
    父组件 v-model绑定  （等价于监听 $emit事件名）  @input="handleInput"

// 两个子组件之间传值  找到公共的父组件（一个子组件 -> 公共父组件 -> 另一个子组件）
    十分强调组件之间的关系
```

1）Bus
```
// 原理：本质上是创建一个空的vue实例，作为交互的中介
// ../lib/bus.js
    import Vue from 'vue'
    const Bus = new Vue()
    export default Bus

  ...email.vue
    button触发事件  methods
        handleClick() {
        this.$bus.$emit('on-click', 'hello')
        }
  ...tel.vue
    事件监听 mounted
    this.$bus.$on('on-click', (message)=> {
      this.message = message
    })

   本质上来说就是空的vue实例作为公共的父组件了，这样tel.vue email.vue都是该实例的子组件 

   pubsub.js 的原理就是这样

```

2) Vuex --基础--state&getter
3) Vuex --基础--mutation&action/module
4) Vuex --进阶