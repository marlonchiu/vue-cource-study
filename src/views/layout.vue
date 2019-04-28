<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider breakpoint="sm" :default-collapsed="false" collapsible hide-trigger v-model="collapsed" :width="200" class="sider-outer">
        <side-menu :collapsed="collapsed" :list="routers"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" size="32"></Icon>
        </Header>
        <Content class="content-wrapper">
          <div>
            <Tabs @on-click="handleClickTab" type="card" :animated="false" :value="getTabNameByRoute($route)">
              <TabPane :label="item.meta.title" :name="getTabNameByRoute(item)"
              v-for="(item, index) in tabList" :key="`tabNav${index}`"></TabPane>
            </Tabs>
          </div>
          <div class="view-box">
            <Card shadow class="page-card">
              <router-view></router-view>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SideMenu from '_c/side-menu'
import { mapState, mapMutations } from 'vuex'
import { getTabNameByRoute, getRouteById } from '@/lib/util'
export default {
  name: 'layout',
  data () {
    return {
      getTabNameByRoute,
      collapsed: false,
      menuList: [
        {
          title: '1111',
          name: '导航一',
          icon: 'md-aperture'
        },
        {
          title: '2222',
          name: '导航二',
          icon: 'md-aperture'
        },
        {
          title: '3333',
          name: '导航三',
          icon: 'md-aperture',
          children: [
            {
              title: '3333-111',
              name: '导航三一',
              icon: 'md-aperture'
            },
            {
              title: '3333-222',
              name: '导航三二',
              icon: 'md-aperture',
              children: [
                {
                  title: '3333-222-11',
                  name: '导航三二一',
                  icon: 'md-aperture'
                },
                {
                  title: '3333-222-22',
                  name: '导航三二二',
                  icon: 'md-aperture'
                }
              ]
            },
            {
              title: '3333-333',
              name: '导航三三',
              icon: 'md-aperture'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      tabList: state => state.tabNav.tabList,
      routers: state => state.router.routers.filter(item => {
        // 登录和404页面过滤掉不显示到layout左侧导航栏
        return item.path !== '*' && item.name !== 'login'
      })
    }),
    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ]),
    handleCollapsed () {
      this.collapsed = !this.collapsed
    },
    handleClickTab (id) {
      let route = getRouteById(id)
      // console.log(route)
      this.$router.push(route)
    }
  },
  components: {
    SideMenu
  },
  watch: {
    '$route' (newRoute) {
      // console.log(newRoute)
      this.UPDATE_ROUTER(newRoute)
    }
  }
}
</script>
<style lang="less">
.layout-wrapper, .layout-outer {
  height: 100%;
  .header-wrapper{
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 24px;
    .trigger-icon{
      cursor: pointer;
      transition: transform .3s ease;
      &.rotate{
        transform: rotateZ(-90deg);
        transition: transform .3s ease;
      }
    }
  }
  .sider-outer{ // 定义导航栏的样式 超出隐藏滚动
    height: 100%;
    overflow: hidden;
    .ivu-layout-sider-children{
      margin-right: -20px; // 隐藏掉y方向滚动条
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .content-wrapper{
    padding: 0px; // 10px
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
    .view-box{
      padding: 0
    }
    .page-card{
      // css3的计算属性 100vh表示页面高度的100% header默认高度64px 上下间距20px
      min-height: ~"calc(100vh - 20px - 64px)";
    }
  }
}
</style>
