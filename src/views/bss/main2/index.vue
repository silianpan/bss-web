<template>
  <Layout class="i-layout">
    <Sider
      v-if="hasSider"
      width="240"
      class="i-layout-sider i-layout-sider-fix"
    >
      <div class="i-layout-sider-logo"></div>
      <div class="i-layout-menu-side i-scrollbar-hide">
        <ShrinkableMenu
          :active-name="siderBarActiveMenuName"
          :open-names="openNames"
          @on-change="handleSiderMenuClick"
          :menu-list="siderMenus"
        ></ShrinkableMenu>
        <!-- <sider-bar
          :active-menu-name="siderBarActiveMenuName"
          :menus="siderMenus"
          @menu-click="handleSiderMenuClick"
        ></sider-bar>-->
      </div>
    </Sider>
    <Layout
      :class="[
        'i-layout-inside',
        hasSider ? 'i-layout-inside-fix-with-sider' : ''
      ]"
    >
      <Header
        class="i-layout-header i-layout-header-fix i-layout-header-stick"
        style="width: calc(100% - 0px);"
      >
        <div class="app-bar-content">
          <div
            class="app-bar-logo sys-logo i-layout-header-logo i-layout-header-logo-stick"
            :style="{
              background:
                'url(' +
                require(`../../../assets/styles/images/area/${areaInfo.eleRegion}/logo.png`) +
                ') no-repeat'
            }"
            @click="
              $router.push({
                name: 'bss-home'
              })
            "
          ></div>
          <div class="spacer"></div>
          <header-bar
            :active-menu-name="headerActiveMenuName"
            :menus="headerMenus"
            @menu-click="handleTopMenuClick"
          ></header-bar>
          <div
            class="i-layout-header-trigger i-layout-header-trigger-min font18"
          >
            <Avatar
              v-if="!$_.isEmpty(userInfo.avatar)"
              :src="userInfo.avatar"
            ></Avatar>
            <Avatar v-else style="background:#f56a00">U</Avatar>
            {{ userInfo.nickName }}
          </div>
        </div>
      </Header>
      <Content
        :class="[
          'i-layout-content',
          'i-layout-content-fix',
          'i-layout-content-fix-with-header',
          'i-layout-content-fix-with-footer',
          hasSider ? 'i-layout-content-fix-with-sider' : ''
        ]"
        :style="{ background: '#fff' }"
      >
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </Content>
      <Footer class="text-center i-layout-footer-fix"
        >2019-2025 &copy; XXX科技有限公司</Footer
      >
    </Layout>
  </Layout>
</template>

<script>
import ShrinkableMenu from './components/shrinkable-menu/shrinkable-menu'
import HeaderBar from './components/header-bar'
// import SiderBar from './components/sider-bar'
import { mapGetters } from 'vuex'
export default {
  components: {
    ShrinkableMenu,
    HeaderBar
    // SiderBar
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapGetters(['areaInfo']),
    // 用户基本信息
    userInfo() {
      return this.$store.state.user.userInfo
    },
    openNames() {
      return this.getOpenNamesFromTree(
        this.siderMenus,
        el => el.vueRouteName === this.siderBarActiveMenuName
      )
    },
    // header 菜单
    headerMenus() {
      return this.$store.state.menu.menus
    },
    // sider 菜单
    siderMenus() {
      return this.$store.getters.siderMenus
    },
    // header 激活菜单name
    headerActiveMenuName() {
      return this.$store.state.menu.headerActiveMenuName
    },
    // sider 激活菜单name
    siderBarActiveMenuName() {
      return this.$store.state.menu.siderBarActiveMenuName
    },
    // 是否展开sider
    hasSider() {
      return this.$store.getters.hasSider
    }
  },
  methods: {
    getOpenNamesFromTree(tree, judge) {
      if (this.$_.isEmpty(tree)) {
        return []
      }
      let target = []
      for (let i = 0; i < tree.length; i++) {
        const element = tree[i]
        if (judge(element)) {
          target.push(element.id)
          break
        }
        if (!this.$_.isEmpty(element.children)) {
          target.push(element.id)
          let cr = this.getOpenNamesFromTree(element.children, judge)
          if (!this.$_.isEmpty(cr)) {
            target = target.concat(cr)
            break
          } else {
            target.pop()
          }
        }
      }
      return target
    },
    handleTopMenuClick(menu) {
      this.$store.dispatch('headerMenuItemClick', menu)
    },

    getTargeFromTree(tree, judge) {
      if (this.$_.isEmpty(tree)) {
        return null
      }
      let target = null
      for (let i = 0; i < tree.length; i++) {
        const element = tree[i]
        if (judge(element)) {
          target = element
          break
        }
        if (!this.$_.isEmpty(element.children)) {
          let cr = this.getTargeFromTree(element.children, judge)
          if (cr) {
            target = cr
            break
          }
        }
      }
      return target
    },
    handleMenuClick(menuName) {},

    handleSiderMenuClick(menuName) {
      // 从菜单树中获取到当前菜单信息
      let targetMenu = this.getTargeFromTree(this.siderMenus, e => {
        return e.vueRouteName === menuName
      })
      this.$store.commit('setSiderActiveMenuName', targetMenu.vueRouteName)
      this.$store.dispatch('goTargetRoute', targetMenu)
    }
  }
}
</script>

<style lang="less">
@import url('./style/main.less');
</style>
