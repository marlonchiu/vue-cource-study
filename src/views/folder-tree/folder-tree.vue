<template>
  <div class="folder-wrapper">
    <!-- <Tree :data="folderTree" :render="renderFunc"></Tree> -->
    <!-- 使用自己封装的folder-tree组件 -->
    <folder-tree :folder-list="folderList" :file-list="fileList"></folder-tree>
  </div>
</template>
<script>
import { getFolderList, getFileList } from '@/api/data'
// import { putFileInFolder, transferFolderToTree } from '@/lib/util'
// 引入 封装文件目录组件（封装上节的Tree组件）
import FolderTree from '_c/folder-tree'
export default {
  data () {
    return {
      folderList: [],
      fileList: []
      // folderTree: [],
      // 自定义渲染
      // renderFunc: (h, { root, node, data }) => {
      //   // console.log(data)
      //   return (
      //     <div class="tree-item">
      //       { data.type === 'folder' ? <icon type="ios-folder" style="margin-right: 10px;"/> : ''}
      //       { data.title }
      //     </div>
      //   )
      // }
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
      // console.log(res)
      // let data1 = putFileInFolder(res[0], res[1])
      // console.log(data1)
      // let data2 = transferFolderToTree(data1)
      // console.log(data2)
      // 第一种直接渲染方法
      // this.folderTree = transferFolderToTree(putFileInFolder(res[0], res[1]))
      // 获取数据  直接赋值
      this.folderList = res[0]
      this.fileList = res[1]
    })
  },
  components: {
    FolderTree
  }
}
</script>
<style lang="less">
.folder-wrapper{
  width: 300px;
  .tree-item{
    width: ~"calc(100% - 50px)";
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
}
</style>
