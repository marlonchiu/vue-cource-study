# vue技术栈开发实战学习

## 登录/登出以及JWT认证

1）后端代码概览

2）登录以及Token处理

```javascript
// 下载 md5(加密) js-cookie(操作cookie 读写)
// npm install md5 js-cookie --save

// src/lib/util.js
import Cookies from 'js-cookie'

/** 保存token */
export const setToken = (token, tokenName = 'token') => { // tokenName 默认值token
  Cookies.set(tokenName, token)
}

/** 获取token */
export const getToken = (tokenName = 'token') => { // tokenName 默认值token
  return Cookies.get(tokenName)
}

// 操作用户登录的信息都放在了 src/store/module/user.js 中 状态管理

// 登陆后在路由跳转之前判断登录 src/router/index.js

import { getToken, setToken } from '@/lib/util'
// 页面跳转之前的判断
router.beforeEach((to, from, next) => {
  // 根据token判定是否登录
  const token = getToken()
  if (token) { // 有token的判断
    // 判断登录是否有效
    console.log(token)
    store.dispatch('authorization', token).then(() => {
      if (to.name === 'login') { // 如果当前是登录页面
        next({ name: 'home' })
      } else {
        next()
      }
    }).catch(() => {
      // 登录验证token错误
      // 清除错误的token
      setToken('')
      next({ name: 'login' })
    })
  } else {
    // 如果没有token
    if (to.name === 'login') { // 如果当前是登录页面
      next()
    } else {
      next({ name: 'home' })
    }
  }
})
```

3）Token过期处理

```txt
// 每次调用authorization方法都会返回新的token
// 每次请求获取到新的token 再次保存
setToken(res.data.token)

每次发送请求都是重新设置了token的有效期的，
但连续两次请求超过设置的时长时候则表示请求过期，需要重新登录验证
```

4）退出登录

```javascript
// 只需要清除token即可，但是还是在module/user.js中进行的操作
// 直接写一个 actions方法
logout () {
  setToken('')
}
```

5）补充说明

```txt
此种登录验证只适用于对于安全性较低的项目中，token是不可以完全暴露在外部的
如果系统对于安全性较高，是不能够通过js获取token存放到cookies中的，
不能通过判断cookies中的token来验证用户是否登录

安全的方式：服务器段开启http-only，设置http-only为true，
通过服务端把token设置到cookies中，无法通过js来读取修改cookies的，
从而避免跨站脚本攻击
```

## 响应式布局

1）vue-cli3.0中使用iview
2）布局组件的使用

```vue
// 自定义样式（计算属性）
<Icon :class="triggerClasses" type="md-menu" size="32"></Icon>

export default {
  computed: {
    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    }
  }
}

// 设置样式
<style lang="less">
.trigger-icon{
  cursor: pointer;
  transition: transform .3s ease;
  &.rotate{
    transform: rotateZ(-90deg);
    transition: transform .3s ease;
  }
}
</style>
```

3）格栅组件实现响应式布局
