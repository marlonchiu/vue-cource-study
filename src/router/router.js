import Home from '../views/Home.vue'
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
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
    })
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
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
