<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="`list_item_${index}`">
        <span v-if="!render">{{item.name}}</span>
        <render-dom v-else :render-func="render" :name="item.name"></render-dom>
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
    render: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    RenderDom
  }
}
</script>
