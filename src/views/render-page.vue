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
}
</script>
