<template>
  <div>
    <count-to ref="countTo" :end-val="endVal" @on-animation-end="handleEnd">
      <span slot="left">总金额：</span>
      <span slot="right">元</span>
    </count-to>
    <button @click="getNumber">获取数值</button>
    <button @click="updateNumber">更新数值</button>
  </div>
</template>
<script>
import CountTo from '@/components/count-to'
export default {
  name: 'count_to',
  data () {
    return {
      endVal: 100
    }
  },
  methods: {
    getNumber () {
      this.$refs.countTo.getCount()
    },
    updateNumber () {
      this.endVal += Math.random() * 100
    },
    handleEnd (endVal) {
      console.log('endVal -->', endVal)
    }
  },
  components: {
    CountTo
  }
}
</script>
