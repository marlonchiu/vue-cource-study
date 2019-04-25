# vue技术栈开发实战学习

## Icon组件

1）Unicode & Symbol

把生成的图标问价夹放在assets下

1.1 Unicode

```text
// 使用指南
//      https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code

第一步：拷贝项目下面生成的font-face   app.vue
@font-face {font-family: 'iconfont';
  src: url('./assets/font/iconfont.eot');
  src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/font/iconfont.woff') format('woff'),
  url('./assets/font/iconfont.ttf') format('truetype'),
  url('./assets/font/iconfont.svg#iconfont') format('svg');
}

第二步：定义使用iconfont的样式 app.vue
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

第三步：挑选相应图标并获取字体编码，应用于页面
<i class="iconfont">&#x33;</i>
```

1.2 Symbol

```text
第一步：拷贝项目下面生成的symbol代码： main.js
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
// 使用icont-font
import '@/assets/font/iconfont.js'

第二步：加入通用css代码（引入一次就行）： app.vue
<style type="text/css">
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>

第三步：挑选相应图标并获取类名，应用于页面：
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
```

2）font-class

```text
第一步：拷贝项目下面生成的fontclass代码： main.js
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css
// 使用icont-font font-class模式
import '@/assets/font/iconfont.css'

第二步：挑选相应图标并获取类名，应用于页面：
<i class="iconfont icon-xxx"></i>
```

3）封装单色和多色Icon组件

```vue
// components/icon-font
<template>
  <i :class="classes" :style="styles"></i>
</template>
<script>
export default {
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#515a6e'
    },
    size: {
      type: Number,
      default: 12
    }
  },
  computed: {
    classes () {
      return [
        'iconfont',
        `icon-${this.icon}`
      ]
    },
    styles () {
      return {
        color: this.color,
        fontSize: `${this.size}px`
      }
    }
  }
}
</script>

// 多色组件
// components/icon-svg
<template>
  <svg :class="icon" aria-hidden="true" :style="style">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: 'IconSvg',
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 20
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    },
    style () {
      return {
        fontSize: `${this.size}px`
      }
    }
  }
}
</script>
```

## 大量数据性能优化

0）select checkbox 优化

* selectOption

```vue
// npm install vue-virtual-scroll-list --save

<template>
  <div>
    <Select v-model="selectData" style="width:200px">
      <virtual-list :size="30" :remain="6">
        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </virtual-list>
    </Select>
  </div>
</template>
<script>
import { doCustomTimes } from '@/lib/tools'
import VirtualList from 'vue-virtual-scroll-list'
export default {
  data () {
    return {
      selectData: 0,
      list: []
    }
  },
  mounted () {
    let list = []
    doCustomTimes(1000, (index) => {
      list.push({
        value: index,
        label: `select_${index}`
      })
    })
    this.list = list
  },
  components: {
    VirtualList
  }
}
</script>
```

* CheckboxGroup

```vue
// 这样当大量的数据需要渲染时，页面渲染很快且操作不卡顿，无论多少条数据，渲染的只是很少的一部分
<CheckboxGroup v-model="checkedArr">
  <virtual-list :size="30" :remain="10">
    <p v-for="item in list" :key="`check${item.value}`" style="height: 30px;">
      <Checkbox :label="item.value">
          <Icon type="logo-twitter"></Icon>
          <span>{{ item.label }}</span>
      </Checkbox>
    </p>
  </virtual-list>
</CheckboxGroup>
```

* form-group

```vue
// form.vue
<template>
  <div class="form-wrapper">
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
    },
    handleReset () {
      this.valueData = clonedeep(this.initValueList)
    }
  },
  components: {
    FormSingle
  }
}
</script>

// form-single.vue

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
```

1）列表优化
2）大型表单优化
3）表格优化

```text
// 链接 https://github.com/lison16/vue-bigdata-table

当复杂对象不需要频繁的更新的话可以把这个数据进行密封
    Object.preventExtensions();   // ES5的方法
    这样的话只可以改变这个对象的属性值，但是不可以增加新的属性
    vue如果检测到某个对象被密封了，就不会进行getter setter了，从而减少性能开销
  
  this.$forceUpdate() 控制（强制）vue实例进行更新
```