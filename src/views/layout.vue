<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider breakpoint="sm" :default-collapsed="true" collapsible hide-trigger v-model="collapsed">
        <side-menu :collapsed="collapsed" :list="menuList"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" size="32"></Icon>
        </Header>
        <Content class="content-wrapper">
          <Card shadow class="page-card">
            <router-view></router-view>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SideMenu from '_c/side-menu'
export default {
  name: 'layout',
  data () {
    return {
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
    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    }
  },
  methods: {
    handleCollapsed () {
      this.collapsed = !this.collapsed
    }
  },
  components: {
    SideMenu
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
  .content-wrapper{
    padding: 10px;
    .page-card{
      // css3的计算属性 100vh表示页面高度的100% header默认高度64px 上下间距20px
      min-height: ~"calc(100vh - 20px - 64px)";
    }
  }
}
</style>
