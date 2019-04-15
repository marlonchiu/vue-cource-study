# vue技术栈开发实战学习

## 文件上传前后端(Node.js)实现

1）Node.js服务器

```markdown
1. 安装 redis 和 mysql 指南
    redis
        http://www.runoob.com/redis/redis-conf.html

    mysql
        https://blog.csdn.net/qq_37350706/article/details/81707862
        https://blog.csdn.net/u011182575/article/details/80821418
        http://www.runoob.com/mysql/mysql-create-database.html(补充)
        https://www.cnblogs.com/hyhl23/p/3609635.html

2. 将 fss-server 文件夹启动
    // 下载依赖包       npm install
    // 全局安装nodemon    npm install -g nodemon

    * 修改代码后，需要重新启动 Express 应用，所做的修改才能生效。若之后的每次代码修改都要重复这样的操作，势必会影响开发效率。Nodemon，它会监测项目中的所有文件，一旦发现文件有改动，Nodemon 会自动重启应用
    https://www.cnblogs.com/xiaohuochai/p/8794340.html

3. 安装Express
  npm install express -g //全局安装
  npm install express-generator -g //安装全局变量
```

2）前端文件上传、下载
3）自行控制文件上传