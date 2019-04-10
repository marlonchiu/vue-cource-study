import axios from 'axios'
import { baseURL } from '@/config'
// 以类的方式封装
class HttpRequest {
  // constructor (baseUrl) { // es6语法  直接可以写 baseUrl = baseURL
  //   baseUrl = baseUrl || baseURL
  constructor (baseUrl = baseURL) { // es6语法  直接可以写 baseUrl = baseURL
    this.baseUrl = baseUrl // this指的是创建的实例
    this.queue = {} // 队列（由于保存请求路径的队列）
  }
  // 公共配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    }
    return config
  }

  // 定义拦截器，对全局的请求和响应进行拦截（对实例添加拦截器）
  interceptors (instance, url) {
    // 请求的拦截器
    instance.interceptors.request.use(config => {
      // 此处对每一个请求进行控制（比如对请求增加loading）
      // 添加全局的loading...  iview Spin.show()
      // console.log(config)  // 请求的参数
      // 通过队列把请求圧入栈中  如果队列有请求的话是不加载loading
      if (!Object.keys(this.queue).length) { // 如果队列中没有请求，则加载loading
        // Spin.show()
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应的拦截器
    instance.interceptors.response.use(res => {
      // console.log(res)
      // 请求执行删除当前的url
      delete this.queue[url]
      // return res
      // 处理返回结果(只返回有用的值)
      // const { status, data } = res
      // return { status, data }
      const { data } = res
      return data
    }, error => {
      delete this.queue[url]
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options) // 两个对象的属性合并，遇到相同后边会覆盖全局配置
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
