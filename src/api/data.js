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

// 获取文件列表(文件上传下载用的接口)
export const getFilesList = () => {
  return axios.request({
    url: '/get_file_list',
    method: 'get',
    params: {
      userId: 1
    }
  })
}

// 获取文件信息(文件上传下载用的接口)
export const getFile = ({ key, type }) => {
  return axios.request({
    url: '/get_file',
    method: 'post',
    data: {
      key,
      type
    }
  })
}
