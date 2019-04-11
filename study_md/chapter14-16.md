# vue技术栈开发实战学习

## 登录/登出以及JWT认证

1）后端代码概览

2）登录以及Token处理

```javascrpit
// 下载 md5(加密) js-cookie(操作cookie 读写)
// npm install md5 js-cookie --save
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