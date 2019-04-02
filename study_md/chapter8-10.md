# vue技术栈开发实战学习

## Ajax请求

### 解决跨域问题

```
    前端代理  proxy
    后端开启支持跨域服务  
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")  //设置允许的请求头
        res.header("Access-Control-Allow-Methods"’, "PUT,POST,GET,DELETE,OPTIONS")  // 设置允许的请求方式 

    // 在跟路由下对所有的请求开启跨域
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
        next()
    })
```


### 封装axios
   对axios进行全局的封装，增加全局的拦截器，对请求和响应的拦截进行通用的处理 
    1） 请求拦截
    2） 响应拦截

    ```JavaScript
    // 封装axios请求实例  ../lib/axios.js
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
        console.log(res)
        // 请求执行删除当前的url
        delete this.queue[url]
        // return res
        // 处理返回结果(只返回有用的值)
        const { status, data } = res
        return { status, data }
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


    // 调用封装的实例暴露方法 .../api/index.js
    // 创建一个封装后的请求实例
    import HttpRequest from '@/lib/axios'
    const axios = new HttpRequest()
    export default axios

    // 使用，接口调用
    // 开发理念： (在开发中会把所有的接口单独抽取出来，根据业务分模块的)
    // 调用获取用户信息的请求 .../api/user.js
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

    // 页面中方法使用 home.vue
    import { getUserInfo } from '@/api/user'

    handleRequestUserInfo () {
      getUserInfo({ userId: 21 }).then(res => {
        console.log('res: ', res)
      })
    }
    ```

### 请求实战
