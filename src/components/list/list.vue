<template>
  <div>
    <!-- <ul>
      <li v-for="(item, index) in list" :key="`list_item_${index}`">
        <span v-if="!render">{{item.name}}</span>
        <render-dom v-else :render-func="render" :name="item.name"></render-dom>
      </li>
    </ul> -->
    <ul>
      <li @mousemove.prevent="handleMove" v-for="(item, index) in list2" :key="`list_item_${index}`">
        <!-- <span v-if="!render">{{item.number}}</span>
        <render-dom v-else :render-func="render" :number="item.number"></render-dom> -->
        <!-- 作用域插槽 -->
        <slot :number="item.number"></slot>
      </li>
    </ul>
  </div>
</template>
<script>
import RenderDom from './render-dom.js'
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
      // default: () => {
      //   return []
      // }
    },
    list2: {
      type: Array,
      default: () => []
      // default: () => {
      //   return []
      // }
    },
    render: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleMove (event) {
      console.log(event)
      // 阻止事件的默认行为
      event.preventDefault()
    }
  },
  components: {
    RenderDom
  }
}
</script>
