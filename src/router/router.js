import Home from '../views/Home.vue'
export default [
  {
    path: '/',
    name: 'home',
    alias: '/home_page', // 别名
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    alias: '/about_page', // 别名
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/argu/:name',
    name: 'argu',
    components: {
      default: () => import('@/components/argu.vue')
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
  }
]
