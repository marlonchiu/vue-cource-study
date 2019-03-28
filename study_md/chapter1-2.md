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

  第一种：是在路由中配置
  {
    path: '/',
    name: 'home',
    alias: '/home_page', // 别名
    component: Home,
    props: route => ({
      food: route.query.food
    }),
    beforeEnter: (to, from, next) => {
      if (from.name === 'about') {
        alert('我是从about页面来的')
      } else {
        alert('我不是从about页面来的')
      }
      next() // 所有逻辑执行完必须要next()
    }
  },

  * 第二种在组件内使用
  // 在进入页面时调用 在执行完之前页面是未被渲染的
  beforeRouteEnter (to, from, next) {
    console.log(to.name)
    // 此时页面还没有渲染  没有this实例
    if (from.name === 'about') {
      alert('我是从about页面来的')
    } else {
      alert('我不是从about页面来的')
    }
    // next() // 所有逻辑执行完必须要next()
    next(vm => {
      console.log(vm)  // 如果要获取组件的实例  此种用法
    })
  },

  // 在离开页面时调用
  beforeRouteLeave (to, from, next) {
    // 此阶段 this组件对象是可以使用的
    const leave = confirm('确认离开吗？')
    if(leave) {
      next()
    } else{
      next(false)
    }
  },

  // 组件路由发生变化 组件页面复用是调用
  beforeRouteUpdate (to, from, next) {
    // 此时this是存在的  是可以使用的
    console.log(to.name)
    // next()
  }
```

  路由完整的解析流程
  ```
    /**
      * 路由导航解析完整的操作流程
      *  1.导航被触发
      *  2.在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
      *  3.调用全局的前置守卫 beforeEach
      *  4.再重用的组件调用 beforeRouteUpdate
      *  5.调用路由独享的守卫 beforeEnter (如果不是重用的组件的话调用)
      *  6.解析异步路由组件
      *  7.在被激活的组件（即将进入的页面组件）中调用 beforeRouteEnter
      *  8.调用全局的解析守卫 beforeResolve
      *  9.导航被确认
      * 10.调用全局的后置守卫 afterEach
      * 11.触发页面DOM更新
      * 12.用创建好的实例调用beforeRouteEnter守卫里传给next的回调函数
      *  */
  ```

4）路由元信息

```
// 在单个路由中配置 meta
场景  页面标题

{
  path: '/about',
  name: 'about',
  alias: '/about_page', // 别名
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  props: {
    food: 'banana'
  },

  // 配置路由元信息
  meta: {
    title: '关于'
  }
},

../@/lib/utils.js
export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

// 在index.js 中的

import { setTitle } from '@/lib/util'
// 注册路由全局前置守卫
router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
})
```

5）过渡效果

```
两种实现方式：
    1.对要增加动态的特效的页面  直接设置
    2.判断监听路由，只有满足某个判定条件时才设置

    // app.vue页面
    <!-- 增加页面跳转过渡效果 --> 
    <!-- 单个transition 给多个页面设置用transition-group-->
    <!-- 可以绑定值 -->
    <!-- <transition-group name='router'> -->  
    <transition-group :name='routerTransition'>
      <router-view key='default'/>
      <router-view key='email' name="email"/>
      <router-view key='name' name="tel"/>
    </transition-group>

    <script>
      export default {
        data() {
          return {
            routerTransition: ''
          }
        },
        watch: {
          '$route'(to) {
            to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
          }
        }
      }
    </script>


  <style lang="less">
    // 页面进入的效果
    .router-enter {
      opacity: 0;
    }
    .router-enter-active {
      transition: opacity 1s ease;
    }
    .router-enter-to {
      opacity: 1;
    }
    // 页面离开的效果
    .router-leave {
      opacity: 1;
    }
    .router-leave-active {
      transition: opacity 1s ease;
    }
    .router-leave-to {
      opacity: 0;
    }
  </style>

```