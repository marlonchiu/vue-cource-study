<template>
  <div class="menu-box">
    <!-- <a-menu>
      <a-menu-item>1</a-menu-item>
      <a-menu-item>2</a-menu-item>
      <a-submenu>
        <div slot="title">3333</div>
        <a-menu-item>3333-11</a-menu-item>
        <a-submenu>
          <div slot="title">3333-22</div>
          <a-menu-item>3333-22-11</a-menu-item>
          <a-menu-item>3333-22-22</a-menu-item>
        </a-submenu>
      </a-submenu>
    </a-menu> -->
    <a-menu>
      <template v-for="(item, index) in list">
        <a-menu-item v-if="!item.children" :key="`meun_item_${index}`">{{ item.title }}</a-menu-item>
        <re-submenu v-else :key="`meun_item_${index}`" :parent="item" :index="index"></re-submenu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import menuComponents from '_c/menu'
import ReSubmenu from '@/views/re-submenu.vue'
const { AMenu, ASubmenu, AMenuItem } = menuComponents
export default {
  name: 'menu_page',
  data () {
    return {
      list: [
        { title: '111' },
        { title: '222' },
        { title: '333',
          children: [
            { title: '333-11' },
            { title: '333-22' },
            { title: '333-33',
              children: [
                { title: '333-33-1' },
                { title: '333-33-2',
                  children: [
                    { title: '333-33-1-01' },
                    { title: '333-33-1-02' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    // ...menuComponents
    AMenu,
    ASubmenu,
    AMenuItem,
    ReSubmenu
  }
}
</script>
<style lang="less">
.menu-box {
  width: 300px;
  height: 400px;
  background: pink;
}
</style>
