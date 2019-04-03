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

### mock模拟AJax响应

1）响应模拟
2）Mock用法精讲

```javascript
// 使用组件  ...mock/response/user.js
import Mock from 'mockjs'

const Random = Mock.Random
// export const getUserInfo = (options) => {
//   // console.log(options)
//   return {
//     name: 'Lison'
//   }
// }
// 使用模板
export const getUserInfo = (options) => {
  const template = {
    'str|2-5': 'lison',
    'name|3': 'lison',
    'age|+2': 23,
    'num|0-10': 2,
    'float|2-5.0-2': 4,
    'bool|1': true, // 获得truede概率是1/2
    'bool2|1-9': true, // 获得truede概率是1/10  计算概率min/(min+max)
    'obj1|2': {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: 'dd'
    },
    'obj2|1-4': {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: 'dd'
    },
    'arr1|1': ['aa', 'bb', 'cc', 'dd'], // 从属性值 array 中随机选取 1 个元素，作为最终值
    'arr2|+1': ['aa', 'bb', 'cc', 'dd'], // 从属性值 array 中顺序选取 1 个元素，作为最终值
    'arr3|2-4': [1, 2, 5], // 通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max
    'arr4|2': ['a', 'b', 'c'], // 通过重复属性值 array 生成一个新数组，重复次数为 count
    'fun': () => {
      return 'this is created by function'
    },
    'reg': /[1-9][A-z]/,
    'email': Random.email(), // => sd.sdf@oksd.com
    'email2': Mock.mock('@email'), // => sd.sdf@oksd.com
    'range': Random.range(2, 11, 2),
    'datetime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'date': Random.date('yyyy-MM-dd'),
    'time': Random.time('HH:mm:ss T'),
    'nowtime': Random.now('minute', 'yyyy-MM-dd HH:mm:ss'), // 第一个条件表示截止的单位
    'img': Random.image('400x300', '#ff0000', '#ffffff', 'png', '默认图片'), // 属性依次： 尺寸、背景颜色、文字背景颜色、图片格式、显示文字
    'img_base64': Random.dataImage(),
    'color': Random.rgb(), // Random.color() Random.rgba()
    'text': Random.cparagraph(), // c开头表示中文
    'cword': Random.cword('哈哈哈好好笑的故事你听到了吗', 3, 8), // c开头表示中文
    'cname': Random.cname(),
    'ip': Random.ip(),
    'webemail': Random.email('163.com'), // 参数代表域名
    'regin': Random.region(),
    'city': Random.city(true), // 是否显示该城市的上一级
    'zip': Random.zip(), // 邮编
    /**
     * Random.capitalize( word ) 首字母大写
     * Random.upper( str ) 全部大写
     * Random.lower( str ) 全部小写
     * Random.pick( arr ) 数组中任意抽取元素
     * Random.shuffle( arr ) 把数组顺序打乱
     *  */
    'pick': Random.pick([23, 45, 78]),
    /**
     * Random.guid()
     * Random.id()   // 18位身份证号码
     * Random.increment( step? ) // 全局的索引号
     */
    'guid': Random.guid(),
    'fruit': Random.fruit(),
    'fruit2': '@fruit' // 占位符
  }
  return Mock.mock(template)
  // let i = 3
  // let arr = []
  // while (i--) {
  //   arr.push(template)
  // }
  // return Mock.mock(arr)
}


// 定义数据接口
import Mock from 'mockjs'
import { getUserInfo } from './response/user'
const Random = Mock.Random
// 定义中间接口数据
// 使用mockjs 拦截userInfo接口
Mock.mock('http://localhost:3000/getUserInfo', 'post', getUserInfo)
Mock.setup({ // 请求响应时间
  // timeout: 500,
  timeout: '10-50'
})
// requestUrl: 要拦截的URL，字符串或正则表达式
// Mock.mock(/\/getUserInfo/, { name: 'Lison' })
// 自定义添加扩展
Random.extend({
  fruit () {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit) // this指向的是random
  }
})
// Random.fruit() // => 'peach'
export default Mock

// main.js中引入mockjs
// 只有在生产环境下使用mock
if (process.env.NODE_ENV !== 'production') require('./mock')
```

### 从数字渐变组件谈第三方JS库的使用

1）组件封装基础

```html
// countupjs，一个有趣的数字翻滚动画

// 组件中插槽的使用 多个插槽用插槽名字
    // 定义组件
        <slot name="left"></slot>
        <span :id="eleId" :class="countClass" ref="number"></span>
        <slot name="right"></slot>

    // 使用的地方
        <count-to ref="countTo" :end-val="endVal">
            <span slot="left">总金额：</span>
            <span slot="right">元</span>
        </count-to>
```

2）组件中使用id值
3）组件中获取DOM
