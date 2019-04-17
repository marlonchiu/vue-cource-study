<template>
  <div class="upload-page">
    <Upload
      ref="upload"
      :action="`${baseURL}/upload_file`"
      multiple
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :show-upload-list="false">
      <Button icon="ios-cloud-upload-outline">Upload Files</Button>
    </Upload>
    <Button @click="handleUpload">确认上传吧</Button>
    <Table :columns="columns" :data="fileList"></Table>
    <!-- 读取显示文本的内容 -->
    <Modal v-model="showModal">
      <div style="height: 300px; overflow: auto;">
        {{ content }}
      </div>
    </Modal>
  </div>
</template>
<script>
import { baseURL } from '@/config'
import { getFilesList, getFile, deleteFile } from '@/api/data'
import { downloadFile } from '@/lib/util'
export default {
  data () {
    return {
      baseURL,
      showModal: false,
      content: null,
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
        /**
         * @description
         *  下载
         *  显示内容  // 当文本的类型中包含text时表示可以点击显示
         */
        {
          title: '操作',
          key: 'handle',
          render: (h, { row }) => {
            return (
              <span>
                <i-button on-click={this.download.bind(this, row.key)}>下载</i-button>
                <i-button disabled={!row.file_type.includes('text')} on-click={this.showFileContent.bind(this, row.key)}>显示内容</i-button>
                <i-button on-click={this.deleteFile.bind(this, row)}>删除</i-button>
              </span>
            )
          }
        }
      ],
      fileList: []
    }
  },
  mounted () {
    this.updateFilesList()
  },
  methods: {
    updateFilesList () {
      getFilesList().then(res => {
        this.fileList = res
      })
    }, 
    handleUpload () {
      // 调用upload原生的post上传方法
      this.$refs.upload.post(this.file)
    },
    beforeUpload (file) {
      this.file = file
      return false
    },
    handleSuccess () {
      this.$Message.success('文件上传成功')
      this.updateFilesList()
      this.file = null
    },
    download (key) {
      downloadFile({
        url: `${baseURL}/get_file`,
        params: {
          key,
          type: 'download'
        }
      })
      
    },
    showFileContent (key) {
      getFile({ key, type: 'text' }).then(res => {
        // console.log(res)
        this.content = res
        this.showModal = true
      })
    },
    deleteFile (data) {
      this.$Modal.confirm({
        title: '提示',
        content: `您确定要删除文件《${data.file_name}》吗？`,
        onOk: () => {
          deleteFile(data.key).then(res => {
            // console.log(res)
            this.updateFilesList()
          })
        }
      })
    }
  }
}
</script>
