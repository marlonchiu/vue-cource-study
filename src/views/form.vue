<template>
  <div class="form-wrapper">
    <form-group :list="formList" :url="url"></form-group>
  </div>
</template>
<script>
import FormGroup from '_c/form-group'
export default {
  data () {
    return {
      url: '/data/formData',
      formList: [
        {
          name: 'name',
          type: 'i-input',
          value: '',
          label: '姓名',
          rule: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ]
        },
        {
          name: 'range',
          type: 'slider',
          value: [20, 50],
          range: true,
          label: '范围'
        },
        {
          name: 'sex',
          type: 'i-select',
          value: '',
          label: '性别',
          children: {
            type: 'i-option',
            list: [
              { value: '0', title: '男' },
              { value: '1', title: '女' },
              { value: '2', title: '保密' }
            ]
          }
        },
        {
          name: 'education',
          type: 'radio-group',
          value: 1,
          label: '学历',
          children: {
            type: 'radio',
            list: [
              { label: 1, title: '本科' },
              { label: 2, title: '硕士' },
              { label: 3, title: '博士' }
            ]
          }
        },
        {
          name: 'skill',
          type: 'checkbox-group',
          value: [1, 3],
          label: '技能',
          children: {
            type: 'checkbox',
            list: [
              { label: 1, title: 'Vue' },
              { label: 2, title: 'React' },
              { label: 3, title: 'Nodejs' }
            ]
          }
        },
        {
          name: 'inWork',
          type: 'i-switch',
          value: true,
          label: '在职'
        }
      ]
    }
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
