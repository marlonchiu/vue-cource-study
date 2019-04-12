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
