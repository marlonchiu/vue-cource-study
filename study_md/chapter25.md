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

```text
1. tab作为一个数组传入，定义到store中，
2.第一次点击没有增加tab？
```

3.判断路由是否存在

```javaScript
// @/lib/tools.js
/* 用于与业务无关的工具方法 纯粹是工具方法  */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

// 判断两个对象属性名和值完全相等
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  // 如果两者的key存在不等的情况（arr.some()如果有任何一个不等就返回true）
  else return !keysArr1.some(key => obj1[key] !== obj2[key])
}

// @/lib/util.js
// 判断两个路由相等
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

// 判断路由是否存在
export const routeHasExist = (tabList, routeItem) => {
  let len = tabList.length
  let res = false
  doCustomTimes(len, (index) => {
    // 如果当前遍历到项跟当前要添加的routeItem相等 则返回true
    if (routeEqual(tabList[index], routeItem)) res = true
  })
  return res
}
```

4 获取tab名称

```javaScript
// @/lib/util.js
// 获取键值对
const getKeyValueArr = obj => {
  let arr = []
  // 取出的键值对数组先排序一下，
  // 因为如果属性值是一样的但是排序组合方式不同的话也会导致是不同的
  Object.entries(obj).sort((a, b) => {
    return a[0] - b[0]
  }).forEach(([ _key, _val ]) => {
    arr.push(_key, _val)
  })
  return arr
}

// 获取路由名称 'argu:id_111&tag_333_b_222'
export const getTabNameByRoute = route => {
  const { name, params, query } = route
  let res = name
  // 如果params存在且key的长度大于0 则拼接
  if (params && Object.keys(params).length) res += ':' + getKeyValueArr(params).join('_')
  if (query && Object.keys(query).length) res += '&' + getKeyValueArr(query).join('_')
  return res
}
```

5.点击tabs组件页面切换

```javascript
// tabs事件的方法  @on-click="handleClickTab"

// 抽取切割路由id字符串的公共方法
// @/lib/util.js
export const getObjBySplitStr = (id, splitStr) => {
  let splitArr = id.split(splitStr)
  let str = splitArr[splitArr.length - 1] // 切割得到的数组右边就是keyval拼接的字符串a_333_b_222
  let keyValArr = str.split('_')
  let res = {}
  let i = 0
  let len = keyValArr.length
  while (i < len) {
    res[keyValArr[i]] = keyValArr[i + 1]
    i += 2
  }
  return res
}

// 获取路由的参数 params 和 query (根据路由名称逆向组织出路由条件)
export const getRouteById = id => {
  let res = {}
  if (id.includes('&')) { // 根据字符换进行切割（判断是否有& 从知道是否有query
    res.query = getObjBySplitStr(id, '&')
    id = id.split('&')[0]
  }
  if (id.includes(':')) { // 根据字符换进行切割（判断是否有& 从知道是否有params
    res.params = getObjBySplitStr(id, ':')
    id = id.split(':')[0]
  }
  res.name = id
  return res
}

// tab点击方法
// layout.vue   引入 getRouteById 方法
handleClickTab (id) {
  let route = getRouteById(id)
  // console.log(route)
  this.$router.push(route)
}
```

6.点击tab左侧对应的导航栏高亮同时对应的父级也要打开

```javascript
// 左侧导航添加一个  :active-name="$route.name"
// 父级打开 :open-names="openNames"
// side-menu.vue
// <Menu :active-name="$route.name" :open-names="openNames">

// @/lib/util.js
// 根据当前激活的routername来判断有哪些要激活的父级 即展开的 Submenu 的 name 集合
export const getOpenArrByName = (name, routerList) => {
  let arr = []
  // 此处使用some进行遍历为了效率的原因，
  // forEach会遍历数组的所有即使已经找到后续的也会执行
  // some 则找到了后续的其他就不在进行循环遍历
  routerList.some(item => {
    if (item.name === name) {
      arr.push(item.name)
      return true
    }
    if (item.children && item.children.length) {
      let childArr = getOpenArrByName(name, item.children)
      if (childArr.length) {
        arr = arr.concat(item.name, childArr)
        return true
      }
    }
  })
  return arr
}

// 计算属性
computed: {
  ...mapState({
    routers: state => state.router.routers
  }),
  openNames () {
    return getOpenArrByName(this.$route.name, this.routers)
  }
},
watch: {
  openNames() {
    this.$nextTick(() => {
      // 手动更新展开的子目录，注意要在 $nextTick 里调用
      this.$refs.menu.updateOpened()
    })
  }
},
```

3）菜单、URL和标签联动