<template>
  <div class="upload-page">
    <Upload
      :action="`${baseURL}/upload_file`"
      multiple
      :before-upload="beforeUpload"
      :on-success="handleSuccess">
      <Button icon="ios-cloud-upload-outline">Upload Files</Button>
    </Upload>
    <Table :columns="columns" :data="fileList"></Table>
  </div>
</template>
<script>
import { baseURL } from '@/config'
import { getFilesList, getFile } from '@/api/data'
import { downloadFile } from '@/lib/util'
export default {
  data () {
    return {
      baseURL,
      file: {},
      columns: [
        { title: '文件key', key: 'key' },
        { title: '文件名', key: 'file_name' },
        { title: '文件类型', key: 'file_type' },
        { title: '文件大小', key: 'file_size' },
        { title: '上传时间', key: 'createdAt' },
        {
          title: '存储有效期',
          key: 'storage_time',
          render: (h, { row }) => {
            return (
              <span>{ row.storage_time ? row.storage_time : '永久' }</span>
            )
          }
        },
        {
          title: '操作',
          key: 'handle',
          render: (h, { row }) => {
            return (
              <span>
                <i-button on-click={this.download.bind(this, row.key)}>下载</i-button>
              </span>
            )
          }
          // render: (h, { row }) => {
          //   return (
          //     <span>
          //       <i-button on-click={this.download.bind(this, row.key)}>下载</i-button>
          //       <i-button disabled={!row.file_type.includes('text')} on-click={this.showFileContent.bind(this, row.key)}>显示内容</i-button>
          //       <i-button on-click={this.deleteFile.bind(this, row.key)}>删除</i-button>
          //     </span>
          //   )
          // }
        }
      ],
      fileList: []
    }
  },
  mounted () {
    getFilesList().then(res => {
      // console.log(res)
      this.fileList = res
    })
  },
  methods: {
    beforeUpload (file) {
      this.file = file
    },
    handleSuccess () {
      this.$Message.success('文件上传成功')
    },
    download (key) {
      downloadFile({
        url: `${baseURL}/get_file`,
        params: {
          key,
          type: 'download'
        }
      })
      // getFile({ key, type: 'download' }).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>
