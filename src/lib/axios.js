import axios from 'axios'
import { baseURL } from '@/config'
// 以类的方式封装
class HttpReqest {
  // constructor (baseUrl) { // es6语法  直接可以写 baseUrl = baseURL
  //   baseUrl = baseUrl || baseURL
  constructor (baseUrl = baseURL) { // es6语法  直接可以写 baseUrl = baseURL
    this.baseUrl = baseUrl // this指的是创建的实例
    this.queue = {} // 队列
  }
  // 公共配置
  getInsideConfig () {
    const config = {
      //
    }
    return config
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    return instance(options)
  }
}

export default HttpReqest
