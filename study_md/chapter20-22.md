# vue技术栈开发实战学习

## 文件上传前后端(Node.js)实现

1）Node.js服务器

```markdown
1. 安装 redis 和 mysql 指南
    redis
        http://www.runoob.com/redis/redis-conf.html

    mysql
        https://blog.csdn.net/qq_37350706/article/details/81707862
        https://blog.csdn.net/u011182575/article/details/80821418
        http://www.runoob.com/mysql/mysql-create-database.html(补充)
        https://www.cnblogs.com/hyhl23/p/3609635.html

2. 将 fss-server 文件夹启动
    // 下载依赖包       npm install
    // 全局安装nodemon    npm install -g nodemon

    * 修改代码后，需要重新启动 Express 应用，所做的修改才能生效。若之后的每次代码修改都要重复这样的操作，势必会影响开发效率。Nodemon，它会监测项目中的所有文件，一旦发现文件有改动，Nodemon 会自动重启应用
    https://www.cnblogs.com/xiaohuochai/p/8794340.html

3. 安装Express
  npm install express -g //全局安装
  npm install express-generator -g //安装全局变量

4. 数据库安装及Redis安装完毕后
  4.1 先建立连接
        文件 --> 新建连接 --> MySQL
        输入账号密码 （默认主机localhost 端口号3306 账号root）
  4.2 在上述连接下创建一个数据库 fss
      点击连接名称 右键 --> 新建数据库 --> 输入数据库名称 fss
  4.3 启动 fss-server项目服务
      npm run local
```

2）前端文件上传、下载

* 上传

```vue
// 上传文件需要现在本地创建一个file_storage文件夹，与 fss-server同级的
<Upload
    :action="`${baseURL}/upload_file`"
    multiple
    :before-upload="beforeUpload"
    :on-success="handleSuccess">
    <Button icon="ios-cloud-upload-outline">Upload Files</Button>
</Upload>

// 方法
beforeUpload (file) {
  this.file = file
},
handleSuccess () {
  this.$Message.success('文件上传成功')
},
```

* 下载

```JavaScript
// 封装下载的form表单提交方法 src/lib/util.js
// 下载文件的方法(模拟表单提交)
export const downloadFile = ({ url, params }) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  for (const key in params) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}

// upload.vue
import { downloadFile } from '@/lib/util'
download (key) {
  downloadFile({
  url: `${baseURL}/get_file`,
  params: {
    key,
    type: 'download'
    }
  })
}
```

* 删除

```JavaScript
// 封装删除文件方法 src/api/data.js
// 删除文件(文件上传下载用的接口)
export const deleteFile = (key) => {
  return axios.request({
    url: '/delete_file',
    method: 'delete',
    data: {
      key
    }
  })
}

// upload.vue
import { deleteFile } from '@/api/data'
deleteFile (data) {
  this.$Modal.confirm({
    title: '提示',
    content: `您确定要删除文件《${data.file_name}》吗？`,
    onOk: () => {
      deleteFile(data.key).then(res => {
        // console.log(res)
        // this.updateFilesList()
      })
    }
  })
}
```

3）自行控制文件上传

```javascript
// 选择文件后判断 beforeUpload方法中执行
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
```

## Form表单

1）基础表单

```javascript
// iview form表单基础使用 验证规则的自定义
// 自定义验证规则
const validateName = (rule, value, callback) => {
  if (value !== 'lison') {
    callback(new Error('Username Error'))
  } else {
    callback()
  }
}

export default {
  data () {
    return {
      formData: {
        name: '',
        age: 18
      },
      rules: {
        name: [
          // trigger: 'blur' 触发时机  当失去焦点时触发
          { required: true, message: 'Please fill in the user name', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      // 提交前  验证表单数据
      this.$refs.form.validate(valid => {
        if (valid) {
          sendFormData(this.formData).then(res => {
            console.log(res)
          })
        }
      })
    }
  }
}
```

2）动态组件
3）动态表单

```vue
// components/form-group
      * 动态组件
      <component :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component
            v-for="(child, i) in item.children.list"
            :is="item.children.type"
            :value="child.value"
            :label="child.label"
            :key="`${_uid}_${index}_${i}`">{{ child.title }}
          </component>
        </template>
      </component>

<template>
  <!-- Object.keys(valueList).length 用于判断有值与否 -->
  <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :rules="rules" :model="valueList">
    <FormItem v-for="(item, index) in list"
      :label="item.label"
      :key="`${_uid}_${index}`"
      label-position="left"
      :prop="item.name"
      :error="errorStore[item.name]"
       @click.native="handleFocus(item.name)">
      <!-- <Input v-if="item.type === 'input'"/> -->
      <!-- 动态组件写法 -->
      <component :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component
            v-for="(child, i) in item.children.list"
            :is="item.children.type"
            :value="child.value"
            :label="child.label"
            :key="`${_uid}_${index}_${i}`">{{ child.title }}
        </component>
        </template>
      </component>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import { sendFormData } from '@/api/data'
import clonedeep from 'clonedeep'
export default {
  name: 'FormGroup',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      initValueList: [],
      rules: {},
      valueList: {},
      errorStore: {}
    }
  },
  mounted () {
    this.setInitValue()
  },
  methods: {
    setInitValue () {
      // initValueList 用于做重置操作
      // this.initValueList = this.list.map(item => item.value)
      let rules = {}
      let valueList = {}
      let initValueList = {}
      // 错误信息
      let errorStore = {}
      this.list.forEach(item => {
        rules[item.name] = item.rule
        valueList[item.name] = item.value
        initValueList[item.name] = item.value
        errorStore[item.name] = ''
      })
      this.rules = rules
      this.valueList = valueList
      this.initValueList = initValueList
      this.errorStore = errorStore
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          sendFormData({
            url: this.url,
            data: this.valueList
          }).then(res => {
            console.log(res)
            this.$emit('on-submit-success', res)
          }).catch(error => {
            console.log(error)
            this.$emit('on-submit-error', error)
            for (let key in error.response.data) {
              this.errorStore[key] = error.response.data[key]
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset () {
      this.valueList = clonedeep(this.initValueList)
      // this.$refs[name].resetFields() 此方法不能用
    },
    handleFocus (name) {
      this.errorStore[name] = ''
    }
  },
  watch: {
    list () {
      this.setInitValue()
    }
  }
}
</script>
```
