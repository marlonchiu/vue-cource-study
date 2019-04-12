# vue技术栈开发实战学习

## 可编辑表格的实现

0）获取数据

```javascript
// lib/tools.js
/* 用于与业务无关的工具方法 纯粹是工具方法  */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (i++ < times) {
    callback()
  }
}

// mock/response/data.js
import { doCustomTimes } from '@/lib/tools'
import Mock from 'mockjs'

export const getTableData = () => {
  const template = {
    name: '@name',
    'age|18-25': 0,
    email: '@email'
  }
  let arr = []
  doCustomTimes(5, () => {
    arr.push(Mock.mock(template))
  })
  return arr
}

// mock/index.js
import { getTableData } from './response/data'
// 定义中间接口数据
// 使用mockjs 拦截接口
Mock.mock(/\/getTableData/, 'get', getTableData)

// main.js 打开mock数据语句
// 只有在生产环境下使用mock
if (process.env.NODE_ENV !== 'production') require('./mock')

// table.vue页面中引入封装的方法调用
import { getTableData } from '@/api/data'
```

1）JSX进阶

```javascript
// 自定义渲染表格的方法
// edit-table.vue

export default {
  name: 'EditTable',
  data () {
    return {
      insideColumns: [], // 自定义列
      editingId: ''
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    const insideColumns = this.columns.map(item => {
      // 编辑判断说明 -- 如果有render属性表示可编辑，如果item.editable为true则可编辑
      // columns 和 data 需同时声明，声明后将导出指定的数据，建议列数据有自定义render时，可以根据需求自定义导出内容
      if (!item.render && item.editable) {
        // 处理逻辑 JSX语法
        item.render = (h, { row, index, column }) => {
          // console.log(row, index, column)
          return (
            <div>
              {row[column.key]}
              <i-button on-click={this.handleClick.bind(this, { row, index, column })}>编辑</i-button>
            </div>
          )
        }
        return item
      } else return item
    })
    this.insideColumns = insideColumns
  },
  methods: {
    handleClick ({ row, index, column }) {
      console.log({ row, index, column })
    }
  }
}
``

2）单个单元格编辑表格

```vue
// edit-table.vue
<template>
  <Table :columns="insideColumns" :data="value"></Table>
</template>
<script>
import clonedeep from 'clonedeep'
export default {
  name: 'EditTable',
  data () {
    return {
      insideColumns: [], // 自定义列
      editingId: '',
      editingContent: ''
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.initColumns()
  },
  methods: {
    initColumns () {
      const insideColumns = this.columns.map(item => {
        // 编辑判断说明 -- 如果有render属性表示可编辑，如果item.editable为true则可编辑
        // columns 和 data 需同时声明，声明后将导出指定的数据，建议列数据有自定义render时，可以根据需求自定义导出内容
        if (!item.render && item.editable) {
          // 处理逻辑 JSX语法
          item.render = (h, { row, index, column }) => {
            // console.log(row, index, column)
            const isEditing = this.editingId === `${column.key}_${index}`
            return (
              <div>
                { isEditing ? <i-input value={row[column.key]} size="small" style="width:40px;" on-input={this.handleInput}></i-input> : row[column.key] }
                <i-button size="small" on-click={this.handleClick.bind(this, { row, index, column })}>
                  { isEditing ? '保存' : '编辑'}
                </i-button>
              </div>
            )
          }
          return item
        } else return item
      })
      this.insideColumns = insideColumns
    },
    handleClick ({ row, index, column }) {
      // console.log({ row, index, column })
      if (this.editingId === `${column.key}_${index}`) { // 保存
        let tableData = clonedeep(this.value)
        tableData[index][column.key] = this.editingContent
        this.$emit('input', tableData)
        // 把提交修改的数据返回到父组件  便于以后提交后台
        this.$emit('on-edit', { row, index, column, newVal: this.editingContent })
        this.editingId = ''
        this.editingContent = ''
      } else { // 编辑
        this.editingId = `${column.key}_${index}`
      }
    },
    handleInput (newVal) {
      this.editingContent = newVal
    }
  },
  watch: {
    // 如果columns变化了上述渲染还需要重新执行
    columns () {
      this.initColumns()
    }
  }
}
</script>


// table.vue
<template>
  <div class="table-page">
    <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table>
  </div>
</template>
export default {
  methods: {
    // 接收表格编辑数据的更新
    handleEdit ({ row, index, column, newVal }) {
      console.log({ row, index, column, newVal })
    }
  }
}
```

3）多个单元格编辑表格