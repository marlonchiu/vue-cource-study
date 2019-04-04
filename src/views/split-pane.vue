<template>
  <div class="split-pane-con">
    <!-- 绑定更新一 -->
    <!-- <split-pane :value="offset" @input="handleInput"></split-pane> -->
    <!-- 绑定更新二 -->
    <!-- <split-pane v-model="offset"></split-pane> -->
    <!-- 绑定更新三 -->
    <split-pane :value.sync="offset">
      <div slot="left">left</div>
      <div slot="right">right</div>
    </split-pane>
  </div>
</template>
<script>
import SplitPane from '@/components/split-pane'
export default {
  name: 'split_pane',
  data () {
    return {
      offset: 0.8
    }
  },
  methods: {
    handleInput (value) {
      this.offset = value
    }
  },
  components: {
    SplitPane
  }
}
</script>
<style lang="less">
.split-pane-con {
  width: 400px;
  height: 200px;
  background: papayawhip;
}
</style>
