# vue技术栈开发实战学习

## Vue技术栈开发实战-多Tab页开发

0）操作需求简介

```text
iview-admin 后台管理系统
```

1）根据路由列表生成菜单

```JavaScript
// 使用mockjs进行路由的拦截验证
 /*
  * 1.1 修改router.js的配置
  * 1.2 在mock/response/user.js中配置路由拦截(通过true fasle控制)
  */
export const authorization = () => {
  return {
    code: 200,
    data: {
      token: 'xxx',
      rules: {
        page: {
          home: true,
          home_index: true,
          about: true,
          argu: true,
          count_to: true,
          menu_page: true,
          upload: true,
          form: false,
          folder_tree: true,
          table_page: true,
          params: true,
          component: true,
          render_page: true,
          split_pane: true,
          parent: true,
          child: true,
          named_view: true,
          store: true,
          main: true
        },
        component: {
          edit_button: true,
          publish_button: false
        }
      }
    },
    mes: ''
  }
}

// layout.vue 获取导航menuList列表
computed: {
    ...mapState({
      routers: state => state.router.routers.filter(item => {
        // 登录和404页面过滤掉不显示到layout左侧导航栏
        return item.path !== '*' && item.name !== 'login'
      })
    })
}
// 返回的值 routers 直接给 list赋值过去
// 修改 re-submenu 中的显示 （原来都是用title来显示出来的）
/*
 * re-submenu  Line6 和 Line17
 * side-menu   Line15
 * */

// 修改左侧导航栏的样式
.sider-outer{ // 定义导航栏的样式 超出隐藏滚动
    height: 100%;
    overflow: hidden;
    .ivu-layout-sider-children{
      margin-right: -20px; // 隐藏掉y方向滚动条
      overflow-y: scroll;
      overflow-x: hidden;
    }
}
```

2）多标签实现
3）菜单、URL和标签联动