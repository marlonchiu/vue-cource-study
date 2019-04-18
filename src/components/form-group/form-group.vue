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
