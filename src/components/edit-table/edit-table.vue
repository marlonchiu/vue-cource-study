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
