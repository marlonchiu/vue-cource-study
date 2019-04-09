<template>
  <div>
    <!-- <ul @click="handleClick">
      <li  @click.stop="handleClick" v-for="(item, index) in itemList" :key="`list_item_${index}`">{{item.name}}</li>
    </ul> -->
    <!-- <list :list="itemList" :render="renderFunc"></list> -->
    <!-- <list :list2="itemList2" :render="renderFunc"></list> -->
    <!-- 作用域插槽 -->
    <list :list2="itemList2">
      <count-to slot-scope="count" :end-val="count.number"></count-to>
    </list>
  </div>
</template>
<script>
import List from '_c/list'
// 渲染组件的用法
import CountTo from '_c/count-to'
export default {
  name: 'render_page',
  data () {
    return {
      itemList: [
        { name: 'lison' },
        { name: 'marlon' }
      ],
      itemList2: [
        { number: 100 },
        { number: 300 }
      ]
    }
  },
  methods: {
    handleClick (event) {
      console.log(event)
    },
    // renderFunc (h, name) {
    //   // 函数式组件用法
    //   // return h('i', {
    //   //   style: {
    //   //     color: 'pink'
    //   //   }
    //   // }, name)
    //   // JSX语法
    //   return (
    //     <i on-click={this.handleClick} style={{color: 'red'}}>{name}</i>
    //   )
    // }
    renderFunc (h, number) {
      return (
        <CountTo endVal={number} nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd}></CountTo>
      )
    },
    handleEnd () {
      console.log('end!')
    }
  },
  components: {
    List,
    CountTo
  }
}
</script>
