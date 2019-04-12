<template>
  <div class="folder-wrapper"></div>
</template>
<script>
import { getFolderList, getFileList } from '@/api/data'
export default {
  data () {
    return {
      folderList: [],
      fileList: [],
    }
  },
  mounted () {
    getFolderList().then((res) => {
      this.folderList = res
    }),
    getFileList().then((res) => {
      this.fileList = res
    })
  }
}
</script>

