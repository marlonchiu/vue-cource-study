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
