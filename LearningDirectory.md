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

## 路由详解（二） 进阶篇

1）路由组件传参
```
  // 布尔模式
  * 适用于动态路由中有路由参数的情况
  * 要使用的组件在props中进行接收（一般先在props中先定义默认类型）
  {
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/components/argu.vue'),
    props: true // 里边的参数会使用route.params的值
  },

  // 对象模式
  * 要使用的组件在props中进行接收（一般先在props中先定义默认类型）
  {
    path: '/about',
    name: 'about',
    alias: '/about_page', // 别名
    component: () => import('../views/About.vue'),
    props: {
      food: 'banana'
    }
  },

  // 函数模式
  * 适用于传入的属性能根据当前的路由做相应的处理逻辑，设置传入属性的属性值
  * 要使用的组件在props中进行接收（一般先在props中先定义默认类型）
  {
    path: '/',
    name: 'home',
    alias: '/home_page', // 别名
    component: Home,
    // props: route => {
    //   return {}
    // },
    props: route => ({
      food: route.query.food
    })
  },
```

2）HTML5 History模式

```
  // 路由配置
  export default new Router({
    mode: 'hash', // 默认值hash 使用#  另一个属性为 'hsitory'
    routes: routes
  })

  // history 模式需要后端配置（项目部署要使用）
  // 前端所有未匹配的页面都要指向404(放在最后  有个优先级)
  {
    path: '*',  // 匹配所有
    component: () => import('@/views/error_404.vue')
  }
```

3）导航守卫

```
应用场景说明
  * 页面跳转访问，判断用户是否登录
  * 权限控制，要先判断用户是否有访问的权限

分类：全局守卫 和 独享守卫
  
  * 全局守卫  ../router/index.js

  const router = new Router({
    mode: 'hash', // 默认值hash
    routes: routes
  })

  // 注册路由全局前置守卫
  const HAS_LOGINED = true
  // 页面跳转之前的判断
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login') { // 如果当前不是登录页面
      if (HAS_LOGINED) {
        next()
      } else {
        next({ name: 'login' })
      }
    } else { // 如果是在登录页
      if (HAS_LOGINED) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  })

  // 全局守卫 导航被确认之前（表示所有的导航钩子结束），然后在所有组件内守卫和异步路由被解析之后被调用
  // 导航被确认之前  --- 表示所有的导航钩子结束
  router.beforeResolve((to, from, next) => {
    // 同beforeEach
  })

  // 页面跳转后的钩子
  router.afterEach((form, to) => {
    // console.log(123)
    // 比如更改登录的状态
    // logining = false
  })

  export default router


  * 独享守卫
```

4）路由元信息
5）过渡效果