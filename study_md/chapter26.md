# vue技术栈开发实战学习

## 项目部署

* 项目配置注意点
* Jenkins配置

```text
// docker环境下安装Jenkins

// 操作流程
拉取镜像（一定要拉取最新的镜像否则会报错很多插件安装不上很麻烦的）
    docker pull jenkins/jenkins:lts
创建容器
    docker run -itd -p 8899:8080 -p 50000:50000 --name myjenkins --privileged=true  -v ~/jenkins:/var/jenkins_home jenkins/jenkins:lts
    参数说明
        -d：让容器在后台运行
        -p：将容器内部使用的网络端口映射到我们使用的主机上  将容器的8899端口映射到主机的8080端口
        --name：将容器命名为myjenkins
        -v 指的是自定义配置jenkins目录，最后的参数jenkins指的是使用的是本地的jenkins镜像
进入容器
    docker exec -it -u root 容器id /bin/bash
    *   docker exec -it -u root 1bdfa4c1f3a1 /bin/bash（我的容器）
浏览器输入网址打开
    http://192.168.99.100:8899


* docker基本指令
// 查看镜像
    docker images
    docker inspect 镜像id   可查看镜像的配置参数
// 查看所有容器
    docker ps -a
    docker inspect 容器id     可查看容器的配置参数

// 进入容器
docker exec -it -u root 容器id /bin/bash

// 删除容器
可以使用"docker rm 容器id"来删除一个终止状态的容器；  docker rm 容器id
若要删除一个运行中的容器，需要加-f参数。  docker rm -f 容器id


//查看所有的docker容器：
    docker container ls -a
//终止容器：
    docker container stop 
//启动容器：
    docker container start
//重启容器：
    docker container restart
//删除容器：
    docker container rm

// 创建jenkins账号
jenkins admin user
用户名 admin
密码 admin_123
全名 MarlonChiu  /  Administrator  真实中文名字就可以的

指南  https://www.cnblogs.com/xiaochengzi/p/6203002.html
1）选择安装插件（第一个建议安装），有安装失败的暂时先不管继续下一步创建账号，
2）进入Jenkins管理页面，由于插件安装失败，页面显示很多红色的错误
    （插件下载失败原因：因为镜像在国外下载插件过程中，某些插件下载失败或者中断会引起其他有依赖关系的插件也下载失败）
原来的路径：http://updates.jenkins-ci.org/update-center.json
替换路径：http://mirror.xmission.com/jenkins/updates/current/update-center.json

重启 restart
退出 exit
重载 reload

// 退出后需要重新打开的操作
    docker start 1bdfa4c1f3a1（容器id）
    docker exec -it -u root 1bdfa4c1f3a1 /bin/bash



// 报错处理
再次进入  docker exec -it -u root 1bdfa4c1f3a1 /bin/bash
error response from daemon: container 容器id is not running
解决  docker start 1bdfa4c1f3a1（容器id）
再次运行 docker exec -it -u root 1bdfa4c1f3a1 /bin/bash 即成功


// 不懂太懂的安装经验
docker run -itd -p 9980:8080 -p 50000:50000  --restart always -v /apps/Devops/jenkins:/var/jenkins_home --name jenkins  jenkins/jenkins:lts

// 指导博客
    【docker】【CI/CD】2.docker启动jenkins环境+安装必要的插件   https://www.cnblogs.com/sxdcgaq8080/p/10489369.html
    【Devops】【Jenkins】Jenkins插件安装失败处理方法  https://www.cnblogs.com/sxdcgaq8080/p/10489326.html
    jenkins插件地址  http://updates.jenkins-ci.org/download/plugins/

    补充
    持续集成-Jenkins常用插件安装  https://www.cnblogs.com/zhanglianghhh/archive/2018/10/11/9770529.html
```

* Nginx配置

* 自动化部署测试

```text
* 学习指导 jenkins+docker+github实现项目自动部署(上)  https://www.jianshu.com/p/d36a4a08ee55

* github授权，关联项目
    06ea6d87334cea5fb5d7b7b290bcb8bdb542230f

* 视频教程构建指令
    name=vue-cource-study
    npm install
    npm run build
    rm -rf node_modules
    rm -rf $name
    mv dist $name
    tar jcvf $name.tar.bz2 $name
    scp $name.tar.bz2 $name root@10.0.192.93:/usr/local/product
    ssh root@10.0.192.93  "rm -rf /usr/local/product/vue-cource-study; cd /usr/local/product; tar -xvf $name.tar.bz2"
```