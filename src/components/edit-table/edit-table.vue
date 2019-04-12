<template>
  <Table :columns="insideColumns" :data="data"></Table>
</template>
<script>
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
</script>
