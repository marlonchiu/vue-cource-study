<template>
  <div class="split-pane-con">
    <split-pane></split-pane>
  </div>
</template>
<script>
import SplitPane from '@/components/split-pane'
export default {
  // name: 'split_pane',
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
