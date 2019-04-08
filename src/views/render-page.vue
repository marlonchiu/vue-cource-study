<template>
  <div>
    <ul @click="handleClick">
      <li  @click.stop="handleClick" v-for="(item, index) in itemList" :key="`list_item_${index}`">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
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
    handleClick(event) {
      console.log(event)
    }
  }
}
</script>

