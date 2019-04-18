<template>
  <div class="form-wrapper">
    <Form ref="form" :rules="rules" :model="formData" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input type="text" v-model="formData.name" placeholder="Username"/>
      </FormItem>
      <FormItem label="年龄" prop="age">
        <Input v-model="formData.age" placeholder="Age"/>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import FormGroup from '_c/form-group'
import { sendFormData } from '@/api/data'
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
    // handleSubmit () {
    //   // 提交前  验证表单数据
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       sendFormData(this.formData).then(res => {
    //         console.log(res)
    //       })
    //     }
    //   })
    // }
  },
  components: {
    FormGroup
  }
}
</script>
<style lang="less">
.form-wrapper{
  padding: 20px;
}
</style>
