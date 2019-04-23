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
1）列表优化
2）大型表单优化
3）表格优化