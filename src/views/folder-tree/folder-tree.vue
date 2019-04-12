<template>
  <div class="folder-wrapper">
    <Tree :data="folderTree"></Tree>
  </div>
</template>
<script>
import { getFolderList, getFileList } from '@/api/data'
import { putFileInFolder, transferFolderToTree } from '@/lib/util'
export default {
  data () {
    return {
      folderList: [],
      fileList: [],
      folderTree: []
    }
  },
  mounted () {
    // getFolderList().then((res) => {
    //   this.folderList = res
    // }),
    // getFileList().then((res) => {
    //   this.fileList = res
    // })
    // 让两个请求同时执行
    Promise.all([getFolderList(), getFileList()]).then(res => {
      console.log(res)
      let data1 = putFileInFolder(res[0], res[1])
      console.log(data1)
      let data2 = transferFolderToTree(data1)
      console.log(data2)
      this.folderTree = transferFolderToTree(putFileInFolder(res[0], res[1]))
      // this.folderList = res[0]
      // this.fileList = res[1]
    })
  }
}
</script>
<style lang="less">
.folder-wrapper{
  width: 300px;
}
</style>
