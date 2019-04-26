<template>
  <div class="table-page">
    <!-- <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table> -->
    <edit-table-mul :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table-mul>
    <Button type="primary" @click="turnTo">打开参数页面</Button>
  </div>
</template>
<script>
import { getTableData } from '@/api/data'
// import EditTable from '_c/edit-table'
import EditTableMul from '_c/edit-table-mul'
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
  methods: {
    handleEdit ({ row, index, column, newVal }) {
      console.log({ row, index, column, newVal })
    },
    turnTo () {
      // (Math.random() * 100).toFixed(0) 取整
      let id = 'params' + Math.round(Math.random() * 100)
      this.$router.push({
        name: 'params',
        params: {
          id
        }
      })
    }
  },
  components: {
    // EditTable,
    EditTableMul
  }
}
</script>
