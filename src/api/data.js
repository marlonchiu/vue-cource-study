import axios from './index'

export const getTableData = () => {
  return axios.request({
    url: '/getTableData',
    method: 'get'
  })
}

// 获取文件夹列表
export const getFolderList = () => {
  return axios.request({
    url: '/getFolderList',
    method: 'get'
  })
}

// 获取文件列表
export const getFileList = () => {
  return axios.request({
    url: '/getFileList',
    method: 'get'
  })
}
