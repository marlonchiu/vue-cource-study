import Home from '../views/Home.vue'
export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/count-to',
    name: 'count_to',
    component: () => import('@/views/count-to.vue')
  },
  {
    path: '/menu-page',
    name: 'menu_page',
    component: () => import('@/views/menu-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split_pane',
    component: () => import('@/views/split-pane.vue')
  },
  {
    path: '/render-page',
    name: 'render_page',
    component: () => import('@/views/render-page.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/layout',
        component: () => import('@/components/card-block')
      }
    ]
  },
  {
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/components/argu.vue')
  },
  {
    path: '/',
    name: 'home',
    alias: '/home_page', // 别名
    component: Home,
    // props: route => {
    //   return { }
    // },
    props: route => ({
      food: route.query.food
    }),
    beforeEnter: (to, from, next) => {
      // if (from.name === 'about') {
      //   alert('我是从about页面来的')
      // } else {
      //   alert('我不是从about页面来的')
      // }
      next() // 所有逻辑执行完必须要next()
    }
  },
  {
    path: '/about',
    name: 'about',
    alias: '/about_page', // 别名
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    props: {
      food: 'banana'
    },
    // 配置路由元信息
    meta: {
      title: '关于'
    }
  },
  {
    path: '/named_view',
    name: 'named_view',
    components: {
      default: () => import('@/components/child.vue'),
      email: () => import('@/components/email.vue'),
      tel: () => import('@/components/tel.vue')
    }
  },
  {
    path: '/main',
    // redirect: '/',
    // redirect: {
    //   name: 'home'
    // }
    // redirect: to => {
    //   // console.log(to)
    //   // return {
    //   //   name: 'home'
    //   // }
    //   return '/'
    // }
    // ES6简写
    redirect: to => '/'
  },
  {
    path: '/store',
    component: () => import('@/views/store.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
