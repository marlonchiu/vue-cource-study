import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'
export const routerMap = [
  {
    path: '/home',
    name: 'home',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/home_index',
        name: 'home_index',
        meta: {
          title: '首页'
        },
        component: Home
      }
    ]
  },
  {
    path: '/count-to',
    name: 'count_to',
    meta: {
      title: 'count_to'
    },
    component: () => import('@/views/count-to.vue')
  },
  {
    path: '/menu-page',
    name: 'menu_page',
    meta: {
      title: 'menu_page'
    },
    component: () => import('@/views/menu-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split_pane',
    meta: {
      title: 'split_pane'
    },
    component: () => import('@/views/split-pane.vue')
  },
  {
    path: '/render-page',
    name: 'render_page',
    meta: {
      title: 'render_pag'
    },
    component: () => import('@/views/render-page.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: 'upload'
    },
    component: () => import('@/views/upload.vue')
  },
  {
    path: '/form',
    name: 'form',
    meta: {
      title: 'form'
    },
    component: () => import('@/views/form.vue')
  },
  {
    path: '/optimize',
    name: 'optimize',
    meta: {
      title: 'optimize'
    },
    component: () => import('@/views/optimize.vue')
  },
  {
    path: '/component',
    name: 'component',
    component: Layout,
    meta: {
      title: '组件'
    },
    children: [
      {
        path: '/card',
        name: 'card',
        meta: {
          title: '卡片'
        },
        component: () => import('@/components/card-block')
      },
      {
        path: '/table',
        name: 'table',
        meta: {
          title: '表格'
        },
        component: () => import('@/views/table.vue')
      },
      {
        path: '/folder-tree',
        name: 'folder_tree',
        meta: {
          title: '文件夹'
        },
        component: () => import('@/views/folder-tree/folder-tree.vue')
      },
      {
        path: '/params/:id',
        name: 'params',
        meta: {
          title: '参数'
        },
        component: () => import('@/components/argu.vue')
      }
    ]
  },
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
  {
    path: '/named_view',
    name: 'named_view',
    meta: {
      title: 'named_view'
    },
    components: {
      default: () => import('@/components/child.vue'),
      email: () => import('@/components/email.vue'),
      tel: () => import('@/components/tel.vue')
    }
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      title: 'main'
    },
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
    name: 'store',
    meta: {
      title: 'store'
    },
    component: () => import('@/views/store.vue')
  }
]

// 不需要权限验证的页面
export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/icon_page',
    name: 'icon_page',
    meta: {
      title: '图标'
    },
    component: () => import('@/views/icon_page.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
