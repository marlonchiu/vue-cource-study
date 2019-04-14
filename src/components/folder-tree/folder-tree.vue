<template>
  <Tree :data="folderTree" :render="renderFunc"></Tree>
</template>
<script>
import { putFileInFolder, transferFolderToTree } from '@/lib/util'
export default {
  name: 'FolderTree',
  data () {
    return {
      folderTree: [],
      // 自定义渲染
      renderFunc: (h, { root, node, data }) => {
        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" style="margin-right: 10px;"/> : ''}
            { data.title }
          </div>
        )
      }
    }
  },
  props: {
    folderList: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.transData()
  },
  methods: {
    transData () {
      this.folderTree = transferFolderToTree(putFileInFolder(this.folderList, this.fileList))
    }
  },
  watch: {
    folderList () {
      this.transData()
    },
    fileList () {
      this.transData()
    }
  }
}
</script>
<style lang="less">
.tree-item{
  width: ~"calc(100% - 50px)";
  display: inline-block;
  height: 30px;
  line-height: 30px;
}
</style>
