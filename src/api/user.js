// 调用获取用户信息的请求
import axios from './index'
export const getUserInfo = ({ userId }) => {
  return axios.request({
    url: '/getUserInfo',
    method: 'post',
    data: {
      userId
    }
  })
}

export const login = ({ userName, password }) => {
  return axios.request({
    url: '/index/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

// 验证token
export const authorization = () => {
  return axios.request({
    url: '/users/authorization',
    method: 'get'
  })
}
