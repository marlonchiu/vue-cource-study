# vue技术栈开发实战学习

## 项目部署

* 项目配置注意点
* Jenkins配置

```text
// docker环境下安装Jenkins
E:\DockerStudy

docker run -itd -p 9090:8080 -p 50000:50000 --name jenkins --privileged=true  -v /home/jenkins:/var/jenkins_home jenkins:latest

+ docker run -itd -p 8899:8080 -p 50000:50000 --name jenkins --privileged=true  -v ~/jenkins:/var/jenkins_home jenkins

docker run -u root --rm --name jenkinsci -d -p 8080:8080 -p 50000:50000 -v E:\jenkins\jkdata:/var/jenkins_home jenkinsci/blueocean
docker ps -a

mkdir -p /jenkins_home && chown -R 1000:1000 /home/docker/jenkins
docker run -it -d --restart always --name hjenkins -p 2453:8080 -p 50000:50000 -v /jenkins_home:/var/jenkins_home jenkins


docker run -u root --rm -d -p 8080:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkinsci/blueocean

docker exec -it jenkins-blueocean bash




docker pull jenkins/jenkins

为了方便安装插件，因此将jenkins_home目录映射出来
docker run -p 8080:8080 -p 50000:50000 -v /home/docker/jenkins:/var/jenkins_home jenkins

报错：
touch: cannot touch ‘/var/jenkins_home/copy_reference_file.log’: Permission denied
Can not write to /var/jenkins_home/copy_reference_file.log. Wrong volume permissions?

需要修改下目录权限, 因为当映射本地数据卷时，/home/docker/jenkins目录的拥有者为root用户，而容器中jenkins user的uid为1000
chown -R 1000:1000 /home/docker/jenkins

查看所有容器
docker ps -a

docker exec -it jenkins-blueocean bash

docker run -d -p 8080:8080 -v $PWD/jenkins:/var/jenkins_home -t jenkins

把/var/jenkins_home映射到 'jenkins/'目录下。

// 进入容器
docker exec -it -u root 容器id /bin/bash

jenkins admin user
用户名 admin
密码 admin_123
全名 Administrator
```

* Nginx配置
