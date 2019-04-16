<template>
  <div class="upload-page">
    <Upload
      :action="`${baseURL}/upload_file`"
      multiple
      :before-upload="beforeUpload"
      :on-success="handleSuccess">
      <Button icon="ios-cloud-upload-outline">Upload File</Button>
    </Upload>
  </div>
</template>
<script>
import { baseURL } from '@/config'
export default {
  data () {
    return {
      baseURL,
      file: {}
    }
  },
  methods: {
    beforeUpload (file) {
      this.file = file
    },
    handleSuccess () {
      this.$Message.success('文件上传成功')
    }
  }
}
</script>
