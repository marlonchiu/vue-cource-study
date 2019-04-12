<template>
  <div class="table-page">
    <edit-table :columns="columns" :data="tableData"></edit-table>
  </div>
</template>
<script>
import { getTableData } from '@/api/data'
import EditTable from '_c/edit-table'
export default {
  data () {
    return {
      tableData: [],
      columns: [
        { key: 'name', title: '姓名' },
        { key: 'age', title: '年龄', editable: true },
        { key: 'email', title: '邮箱', editable: true }
      ]
    }
  },
  mounted () {
    getTableData().then((res) => {
      this.tableData = res
    })
  },
  components: {
    EditTable
  }
}
</script>
