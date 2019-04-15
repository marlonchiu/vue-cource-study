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

```vue
<template>
  <Table :columns="insideColumns" :data="value"></Table>
</template>
<script>
import clonedeep from 'clonedeep'
export default {
  name: 'EditTableMul',
  data () {
    return {
      insideData: [],
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
      this.insideData = clonedeep(this.value)
      const insideColumns = this.columns.map(item => {
        // 编辑判断说明 -- 如果有render属性表示可编辑，如果item.editable为true则可编辑
        // columns 和 data 需同时声明，声明后将导出指定的数据，建议列数据有自定义render时，可以根据需求自定义导出内容
        if (!item.render && item.editable) {
          // 处理逻辑 JSX语法
          item.render = (h, { row, index, column }) => {
            // console.log(row, index, column)
            // 给每一行的数据对象添加一个新的字段
            const keyArr = this.insideData[index] ? this.insideData[index].editingKeyArr : []
            // 判断逻辑 存在keyArr数组，且column.key在keyArr中
            const isEditing = keyArr && keyArr.indexOf(column.key) > -1
            return (
              <div>
                { isEditing
                  ? <i-input value={row[column.key]} size="small" style="width:40px;" on-input={this.handleInput.bind(this, row, index, column)}></i-input>
                  : <span>{row[column.key]}</span> }
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
      // 判断当前行是否处于编辑状态
      let keyIndex = this.insideData[index].editingKeyArr ? this.insideData[index].editingKeyArr.indexOf(column.key) : -1
      let rowObj = this.insideData[index]
      if (keyIndex > -1) { // 保存
        // 删除key
        rowObj.editingKeyArr.splice(keyIndex, 1)
        // 替换数据
        this.insideData.splice(index, 1, rowObj)
        // 触发视图渲染
        this.$emit('input', this.insideData)
        // 把提交修改的数据返回到父组件  便于以后提交后台
        this.$emit('on-edit', { row, index, column, newVal: this.insideData[index][column.key] })
      } else { // 编辑
        rowObj.editingKeyArr = (rowObj.editingKeyArr) ? [...rowObj.editingKeyArr, column.key] : [column.key]
        // 更新对应操作处的对象（替换 触发视图的更新）
        this.insideData.splice(index, 1, rowObj)
      }
    },
    handleInput (row, index, column, newVal) {
      this.insideData[index][column.key] = newVal
    }
  },
  watch: {
    // 如果columns变化了上述渲染还需要重新执行
    columns () {
      this.initColumns()
    },
    // 如果value变化了上述渲染还需要重新执行
    value () {
      this.initColumns()
    }
  }
}
</script>

// 渲染元素绑定事件如果不用bind的方法可以使用箭头函数
<i-button size="small" on-click={() => { this.handleClick({ row, index, column }) }}>
  { isEditing ? '保存' : '编辑'}
</i-button>
```

## Tree组件实现文件目录 -- 基础实现

0）获取数据

```javascript
// src/lib/util.js
/** 把文件放入文件夹 */
export const putFileInFolder = (folderList, fileList) => {
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)
  return folderListCloned.map(folderItem => {
    const folderId = folderItem.id
    // 在遍历的时候，如果判断一个文件归属于一个文件夹了 则把这个文件剔除掉，减少遍历的开销
    let index = fileListCloned.length
    while (--index >= 0) {
      const fileItem = fileListCloned[index]
      // 倒叙遍历不影响文件的排序
      if (fileItem.folder_id === folderId) {
        const file = fileListCloned.splice(index, 1)[0] // splice返回的数组
        file.title = file.name
        // 如果有children属性  则直接放入  没有则添加属性
        if (folderItem.children) {
          folderItem.children.push(file)
        } else {
          folderItem.children = [file]
        }
      }
    }
    folderItem.type = 'folder'
    return folderItem
  })
}
```

1）Tree组件使用
2）扁平数据树状化

```javascript
/** 把文件夹转换为树状结构 */
export const transferFolderToTree = (folderList) => {
  if (!folderList.length) return []
  const folderListCloned = clonedeep(folderList)
  // 定义递归方法
  const handle = id => {
    let arr = []
    folderListCloned.forEach(folder => {
      if (folder.folder_id === id) {
        const children = handle(folder.id)
        if (folder.children) {
          folder.children = [].concat(folder.children, children)
        } else {
          folder.children = children
        }
        folder.title = folder.name
        arr.push(folder)
      }
    })
    return arr
  }
  return handle(0)
}
```

3）自定义组件结构

```vue
<template>
  <div class="folder-wrapper">
    <Tree :data="folderTree" :render="renderFunc"></Tree>
  </div>
</template>
<script>
import { getFolderList, getFileList } from '@/api/data'
import { putFileInFolder, transferFolderToTree } from '@/lib/util'
export default {
  data () {
    return {
      folderList: [],
      fileList: [],
      folderTree: [],
      // 自定义渲染
      renderFunc: (h, { root, node, data }) => {
        // console.log(data)
        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" style="margin-right: 10px;"/> : ''}
            { data.title }
          </div>
        )
      }
    }
  },
  mounted () {
    // 让两个请求同时执行
    Promise.all([getFolderList(), getFileList()]).then(res => {
      this.folderTree = transferFolderToTree(putFileInFolder(res[0], res[1]))
    })
  }
}
</script>
<style lang="less">
.folder-wrapper{
  width: 300px;
  .tree-item{
    width: ~"calc(100% - 50px)";
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
}
</style>

```

## Tree组件实现文件目录--高级实现

1）封装文件目录组件（封装上节的Tree组件）

```vue
// ...src/components/folder-tree

<template>
  <Tree :data="folderTree" :render="renderFunc"></Tree>
</template>
<script>
import { putFileInFolder, transferFolderToTree } from '@/lib/util'
export default {
  name: 'FolderTree',
  data () {
    return {
      folderTree: [],
      // 自定义渲染
      renderFunc: (h, { root, node, data }) => {
        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" style="margin-right: 10px;"/> : ''}
            { data.title }
          </div>
        )
      }
    }
  },
  props: {
    folderList: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.transData()
  },
  methods: {
    transData () {
      this.folderTree = transferFolderToTree(putFileInFolder(this.folderList, this.fileList))
    }
  },
  watch: {
    folderList () {
      this.transData()
    },
    fileList () {
      this.transData()
    }
  }
}
</script>
<style lang="less">
.tree-item{
  width: ~"calc(100% - 50px)";
  display: inline-block;
  height: 30px;
  line-height: 30px;
  & > .ivu-dropdown{
    float: right;
  }
}
</style>
```

2）操作目录

```vue
<template>
  <Tree :data="folderTree" :render="renderFunc"></Tree>
</template>
<script>
import { putFileInFolder, transferFolderToTree, expandSpecifiedFolder } from '@/lib/util'
import clonedeep from 'clonedeep'
export default {
  name: 'FolderTree',
  data () {
    return {
      folderTree: [],
      currentRenamingId: '',
      currentRenamingContent: '',
      // 自定义渲染
      renderFunc: (h, { root, node, data }) => {
        // 判断显示的类型
        const dropList = data.type === 'folder' ? this.folderDrop : this.fileDrop
        const dropdownRender = dropList.map(item => {
          return (<dropdownItem name={item.name}>{ item.title }</dropdownItem>)
        })
        const isRenaming = this.currentRenamingId === `${data.type || 'file'}_${data.id}`
        return (
          <div class="tree-item">
            { data.type === 'folder' ? <icon type="ios-folder" style="margin-right: 10px;"/> : ''}
            {
              isRenaming
                ? <span>
                  <i-input size="small" value={data.title} on-input={this.handleInput} class="tree-rename-input"></i-input>
                  <i-button size="small" type="text" on-click={this.handleSaveRename.bind(this, data)}>
                    <icon type="md-checkmark"/>
                  </i-button>
                  <i-button size="small" type="text">
                    <icon type="md-close"/>
                  </i-button>
                </span>
                : <span>{ data.title }</span>
            }
            {
              dropList && !isRenaming ? <dropdown placement="right-start" on-on-click={this.handleDropdownClick.bind(this, data)}>
                <i-button size="small" type="text" class="tree-item-button">
                  <icon type="md-more" size={12}/>
                </i-button>
                <dropdownMenu slot="list">
                  { dropdownRender }
                </dropdownMenu>
              </dropdown> : ''
            }
          </div>
        )
      }
    }
  },
  props: {
    folderList: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    },
    // 定义下拉条目
    folderDrop: Array,
    fileDrop: Array
  },
  mounted () {
    this.transData()
  },
  methods: {
    transData () {
      this.folderTree = transferFolderToTree(putFileInFolder(this.folderList, this.fileList))
    },
    isFolder (type) {
      return type === 'folder'
    },
    handleDelete (data) {
      const isFolder = this.isFolder(data.type)
      let updateListName = isFolder ? 'folderList' : 'fileList'
      let list = isFolder ? clonedeep(this.folderList) : clonedeep(this.fileList)
      // 过滤掉要删除的  得到最新的数组
      list = list.filter(item => item.id !== data.id)
      // 只需要区更新 folderList 或者 fileList
      this.$emit(`update:${updateListName}`, list)
    },
    handleDropdownClick (data, name) {
      // console.log(data, name)
      const folderId = data.folder_id
      if (name === 'rename') {
        this.currentRenamingId = `${data.type || 'file'}_${data.id}`
      } else if (name === 'delete') {
        this.$Modal.confirm({
          title: '提示',
          content: `您确定要删除${this.isFolder(data.type) ? '文件夹' : '文件'}《${data.title}》吗？`,
          onOk: () => {
            this.handleDelete(data)
            this.$nextTick(() => {
              expandSpecifiedFolder(this.folderTree, folderId)
            })
          }
        })
      }
    },
    handleInput (value) {
      this.currentRenamingContent = value
    },
    updateList (list, id) {
      let i = -1
      let len = list.length
      while (++i < len) {
        let item = list[i]
        if (item.id === id) {
          // 此处只修改name值即可  因为采取了监听操作，当folderList/fileList变化会重新执行 this.transData()
          // 调用this.transData()方法后在我们封装的util中  会把name值赋值给title的
          item.name = this.currentRenamingContent
          list.splice(i, 1, item)
          break
        }
      }
      return list
    },
    handleSaveRename (data) {
      const id = data.id
      const type = data.type
      if (type === 'folder') {
        const list = this.updateList(clonedeep(this.folderList), id)
        this.$emit('update:folderList', list)
      } else {
        const list = this.updateList(clonedeep(this.fileList), id)
        this.$emit('update:fileList', list)
      }
      this.currentRenamingId = ''
      this.currentRenamingContent = ''
    }
  },
  watch: {
    folderList () {
      this.transData()
    },
    fileList () {
      this.transData()
    }
  }
}
</script>
<style lang="less">
.tree-item{
  width: ~"calc(100% - 50px)";
  display: inline-block;
  height: 30px;
  line-height: 30px;
  & > .ivu-dropdown{
    float: right;
  }
  ul.ivu-dropdown-menu{
    padding-left: 0;
  }
  li.ivu-dropdown-item{
    margin: 0;
    padding: 7px 16px;
  }
  .tree-rename-input{
    width: ~"calc(100% - 80px)";
  }
}
</style>


// 增加展开的方法文件夹的方法
// 展开指定的文件夹
export const expandSpecifiedFolder = (folderTree, id) => {
  return folderTree.map(item => {
    if (item.type === 'folder') { // 展开的是文件夹
      if (item.id === id) {
        item.expand = true
      } else {
        if (item.children && item.children.length) {
          item.children = expandSpecifiedFolder(item.children, id)
          if (item.children.some(child => { // 如果展开的子级有一个为true 则它的父级也为true
            return child.expand === true
          })) {
            item.expand = true
          } else {
            item.expand = false
          }
        }
      }
    }
    return item
  })
}
```

3）多个属性v-modle替代方案

```vue
<folder-tree
  :folder-list.sync="folderList"
  :file-list.sync="fileList">
</folder-tree>

// 多个属性的v-modle 使用 .sync来实现
// 对应更新数据  
this.$emit(`update:${updateListName}`, list)
```

4）增加钩子函数

``` javascript
// 再删除的操作中增加钩子函数  后台返回成功了再在视图上显示更新
// ...src/views/folder-tree.vue

// 视图template
// <folder-tree :beforeDelete="beforeDelete"></folder-tree>
  methods: {
    beforeDelete () {
      // 调用删除接口  只有后台数据也删除了在视图上文件夹或文件才显示删除的效果
      // 模拟删除的操作
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // let error = null
          let error = new Error('error')
          if (!error) {
            resolve()
          } else {
            reject(error)
          }
        }, 2000)
      })
    }
  },

// ...src/components/folder-tree.vue
// props中要先接收一下 beforeDelete 函数  判断是否有无钩子函数还决定视图的更新
methods: {
    isFolder (type) {
      return type === 'folder'
    },
    handleDelete (data) {
      const isFolder = this.isFolder(data.type)
      const folderId = data.folder_id
      let updateListName = isFolder ? 'folderList' : 'fileList'
      let list = isFolder ? clonedeep(this.folderList) : clonedeep(this.fileList)
      // 过滤掉要删除的  得到最新的数组
      list = list.filter(item => item.id !== data.id)
      // 只需要区更新 folderList 或者 fileList
      this.$emit(`update:${updateListName}`, list)
      this.$nextTick(() => {
        expandSpecifiedFolder(this.folderTree, folderId)
      })
    },
    handleDropdownClick (data, name) {
      if (name === 'rename') {
        // this.currentRenamingId = `${data.type || 'file'}_${data.id}`
      } else if (name === 'delete') {
        this.$Modal.confirm({
          title: '提示',
          content: `您确定要删除${this.isFolder(data.type) ? '文件夹' : '文件'}《${data.title}》吗？`,
          onOk: () => {
            // 判断有无删除的钩子函数
            this.beforeDelete ? this.beforeDelete().then(() => {
              this.handleDelete(data)
            }).catch(() => {
              this.$Message.error('删除失败')
            }) : this.handleDelete(data)
          }
        })
      }
    },
  },
```
