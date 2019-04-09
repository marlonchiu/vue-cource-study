<template>
  <div>
    <!-- <ul @click="handleClick">
      <li  @click.stop="handleClick" v-for="(item, index) in itemList" :key="`list_item_${index}`">{{item.name}}</li>
    </ul> -->
    <list :list="itemList" :render="renderFunc"></list>
  </div>
</template>
<script>
import List from '_c/list'
import { isIP } from 'net';
export default {
  name: 'render_page',
  data () {
    return {
      itemList: [
        { name: 'lison' },
        { name: 'marlon' }
      ]
    }
  },
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
  components: {
    List
  }
}
</script>
