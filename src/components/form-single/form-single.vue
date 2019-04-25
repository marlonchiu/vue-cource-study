<template>
  <Form ref="form" v-if="config" :label-width="100" :rules="ruleData" :model="valueData">
    <FormItem
      :label="config.label"
      :key="`${_uid}`"
      label-position="left"
      :prop="config.name"
      :error="errorStore[config.name]"
       @click.native="handleFocus(config.name)">
      <!-- 动态组件写法 -->
      <component :is="config.type" :range="config.range" v-model="valueData[config.name]">
        <template v-if="config.children">
          <component
            v-for="(child, i) in config.children.list"
            :is="config.children.type"
            :value="child.value"
            :label="child.label"
            :key="`${_uid}_${i}`">{{ child.title }}
        </component>
        </template>
      </component>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'FormSingle',
  props: {
    config: Object,
    valueData: {
      type: Object,
      default: () => ({})
    },
    ruleData: {
      type: Object,
      default: () => ({})
    },
    errorStore: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleFocus (name) {
      this.errorStore[name] = ''
    },
    validate (callback) {
      this.$refs.form.validate((valid) => {
        callback(valid)
      })
    }
  }
}
</script>
