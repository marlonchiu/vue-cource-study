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
2）单个单元格编辑表格
3）多个单元格编辑表格