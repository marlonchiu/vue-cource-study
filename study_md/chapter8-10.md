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

### 请求实战
