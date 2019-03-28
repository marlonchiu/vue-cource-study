# vue技术栈开发实战学习

## 使用VUE-CLI 3.0 创建项目

1）使用Vue UI创建管理、项目
2）项目结构目录整理
3）初始文件添加
4）基本配置讲解
5）跨域配置

## 路由详解（一） 基础篇

1） router-link 和 router-view 组件
2） 路由配置
    a. 动态路由
    b. 嵌套路由
    c. 命名路由

        ``` javascript
            // 路由的地方配置上名字
            {
                path: '/about',
                name: 'about',   // 路由命名
                alias: '/about_page', // 别名
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            }

            <!-- <router-link to="/about">About</router-link> -->
            // 等价于
            <router-link :to="{name: 'about'}">About</router-link>
        ```

    d. 命名视图

        ``` javascript
            // 路由的地方配置上名字
            {
                path: '/named_view',
                components: {
                    default: () => import('@/components/child.vue'),
                    email: () => import('@/components/email.vue'),
                    tel: () => import('@/components/tel.vue')
                }
            }

            // 在App.vue 页面（学习了）
            <router-view/>
            <router-view name="email"/>
            <router-view name="tel"/>

            /* 当然email tel组件也是可以作为单个组件小模块引入到child中的，更常规的用法*/
        ```

3) JS 操作路由（编程式导航）

``` vue
<template>
  <div class="home">
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转页面</button>
    <button @click="handleClick('replace')">替换页面</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    handleClick(type) {
      if (type === 'back') {
        this.$router.back()
      } else if (type === 'push') {
        const name = 'mudong'
        this.$router.push({
          // name: 'named_view',
          // query: {
          //   name: '123'
          // }
          
          // name: 'argu',
          // params: {
          //   name: 'mudong'
          // }
          path: `/argu/${name}`
        })
      } else if (type === 'replace') {
        this.$router.replace({
          name: 'named_view'
        })
      }
      // if (type === 'back') this.$router.back()
      // else if (type === 'push') this.$router.push('/named_view')
    }
  },
  components: {
    HelloWorld
  }
}
</script>
```

4）重定向和别名

```
    // 重定向的几种写法
    {
        path: '/main',
        // redirect: '/',
        redirect: {
            name: 'home'
        },
        redirect: to => {
            console.log(to)   // 在此重定向中做判断跳转
        },

        // redirect: to => {
        //   // console.log(to)
        //   // return {
        //   //   name: 'home'
        //   // }
        //   return '/'
        // },
        // ES6简写
        redirect: to => '/'
    }
```
