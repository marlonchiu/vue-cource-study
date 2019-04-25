<template>
  <div class="form-wrapper">
    <!-- <form-group :list="formList" :url="url"></form-group> -->
    <Button type="primary" @click="handleSubmit">提交</Button>
    <Button @click="handleReset">重置</Button>
    <form-single v-for="(item, index) in formList"
      ref="formSingle"
      :config="item"
      :value-data="valueData"
      :rule-data="ruleData"
      :error-store="errorStore"
      :key="`form_${index}`"></form-single>
  </div>
</template>
<script>
// import FormGroup from '_c/form-group'
import { sendFormData } from '@/api/data'
import clonedeep from 'clonedeep'
import FormSingle from '_c/form-single'
import formData from '@/mock/response/form-data'
export default {
  data () {
    return {
      url: '/data/formData',
      formList: formData,
      valueData: {},
      ruleData: {},
      errorStore: {},
      initValueList: {}
      // formList: [
      //   {
      //     name: 'name',
      //     type: 'i-input',
      //     value: '',
      //     label: '姓名',
      //     rule: [
      //       { required: true, message: 'Please fill in the user name', trigger: 'blur' }
      //     ]
      //   },
      //   {
      //     name: 'range',
      //     type: 'slider',
      //     value: [20, 50],
      //     range: true,
      //     label: '范围'
      //   },
      //   {
      //     name: 'sex',
      //     type: 'i-select',
      //     value: '',
      //     label: '性别',
      //     children: {
      //       type: 'i-option',
      //       list: [
      //         { value: '0', title: '男' },
      //         { value: '1', title: '女' },
      //         { value: '2', title: '保密' }
      //       ]
      //     }
      //   },
      //   {
      //     name: 'education',
      //     type: 'radio-group',
      //     value: 1,
      //     label: '学历',
      //     children: {
      //       type: 'radio',
      //       list: [
      //         { label: 1, title: '本科' },
      //         { label: 2, title: '硕士' },
      //         { label: 3, title: '博士' }
      //       ]
      //     }
      //   },
      //   {
      //     name: 'skill',
      //     type: 'checkbox-group',
      //     value: [1, 3],
      //     label: '技能',
      //     children: {
      //       type: 'checkbox',
      //       list: [
      //         { label: 1, title: 'Vue' },
      //         { label: 2, title: 'React' },
      //         { label: 3, title: 'Nodejs' }
      //       ]
      //     }
      //   },
      //   {
      //     name: 'inWork',
      //     type: 'i-switch',
      //     value: true,
      //     label: '在职'
      //   }
      // ]
    }
  },
  mounted () {
    let valueData = {}
    let ruleData = {}
    let errorStore = {}
    let initValueList = {}
    // 循环formData数据 添加value rule error
    formData.forEach(item => {
      valueData[item.name] = item.value
      ruleData[item.name] = item.rule
      errorStore[item.name] = ''
      initValueList[item.name] = item.value
    })
    this.valueData = valueData
    this.ruleData = ruleData
    this.errorStore = errorStore
    this.initValueList = initValueList
  },
  methods: {
    handleSubmit () {
      let isValid = true // 是否验证通过的标识
      // this.$refs.formSingle 获取到的是一个数组
      this.$refs.formSingle.forEach(item => {
        item.validate(valid => {
          if (!valid) isValid = false
        })
      })
      if (isValid) {
        sendFormData({
          url: this.url,
          data: this.valueData
        }).then(res => {
          console.log(res)
          this.$emit('on-submit-success', res)
        }).catch(error => {
          console.log(error)
          this.$emit('on-submit-error', error)
          for (let key in error) {
            this.errorStore[key] = error[key]
          }
        })
      } else {
        this.$Message.error('Fail!')
      }
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     // this.$Message.success('Success!')
      //     sendFormData({
      //       url: this.url,
      //       data: this.valueList
      //     }).then(res => {
      //       console.log(res)
      //       this.$emit('on-submit-success', res)
      //     }).catch(error => {
      //       console.log(error)
      //       this.$emit('on-submit-error', error)
      //       for (let key in error.response.data) {
      //         this.errorStore[key] = error.response.data[key]
      //       }
      //     })
      //   } else {
      //     this.$Message.error('Fail!')
      //   }
      // })
    },
    handleReset () {
      this.valueData = clonedeep(this.initValueList)
      // this.$refs[name].resetFields() 此方法不能用
    }
  },
  components: {
    // FormGroup,
    FormSingle
  }
}
</script>
<style lang="less">
.form-wrapper{
  padding: 20px;
}
</style>
