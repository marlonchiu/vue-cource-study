/* 用于与业务结合的工具方法 */
import Cookies from 'js-cookie'
import clonedeep from 'clonedeep'
import { doCustomTimes, objEqual } from '@/lib/tools'

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

// 下载文件的方法(模拟表单提交)
export const downloadFile = ({ url, params }) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  for (const key in params) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}

// 判断两个路由相等
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

// 判断路由是否存在
export const routeHasExist = (tabList, routeItem) => {
  let len = tabList.length
  let res = false
  doCustomTimes(len, (index) => {
    // 如果当前遍历到项跟当前要添加的routeItem相等 则返回true
    if (routeEqual(tabList[index], routeItem)) res = true
  })
  return res
}

// 获取键值对
const getKeyValueArr = obj => {
  let arr = []
  // 取出的键值对数组先排序一下，
  // 因为如果属性值是一样的但是排序组合方式不同的话也会导致是不同的
  Object.entries(obj).sort((a, b) => {
    return a[0] - b[0]
  }).forEach(([ _key, _val ]) => {
    arr.push(_key, _val)
  })
  return arr
}

// 获取路由名称 'argu:id_111&tag_333_b_222'
export const getTabNameByRoute = route => {
  const { name, params, query } = route
  let res = name
  // 如果params存在且key的长度大于0 则拼接
  if (params && Object.keys(params).length) res += ':' + getKeyValueArr(params).join('_')
  if (query && Object.keys(query).length) res += '&' + getKeyValueArr(query).join('_')
  return res
}
