/* 用于与业务结合的工具方法 */
import Cookies from 'js-cookie'
import clonedeep from 'clonedeep'

export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

/** 保存token */
export const setToken = (token, tokenName = 'token') => { // tokenName 默认值token
  Cookies.set(tokenName, token)
}

/** 获取token */
export const getToken = (tokenName = 'token') => { // tokenName 默认值token
  return Cookies.get(tokenName)
}

/** 组织文件夹和文件的结构 */
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
