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
