<style lang="less">
@import '../styles/menu.less';
</style>
<template>
  <Menu
    ref="sideMenu"
    :active-name="activeName"
    :open-names="openNames"
    :theme="menuTheme"
    width="auto"
    accordion
    @on-select="changeMenu"
  >
    <template v-for="item in menuList">
      <sidebar-sub-menu
        :icon-size="iconSize"
        v-if="hasChildren(item)"
        :key="`menu-${item.id}`"
        :parent-item="item"
        :isCollapsed="isCollapsed"
      ></sidebar-sub-menu>
      <menu-item v-else :name="getName(item)" :key="`menu-${item.id}`">
        <template v-if="isCollapsed">
          <Tooltip transfer :content="showTitle(item)" placement="right" max-width="300">
            <custom-icon :type="item.iconCls || ''" :size="iconSize" />
          </Tooltip>
        </template>
        <template v-else>
          <custom-icon :type="item.iconCls || ''" :size="iconSize" />
          <span>{{ showTitle(item) }}</span>
        </template>
      </menu-item>
    </template>
  </Menu>
</template>

<script>
import SidebarSubMenu from './sidebar-sub-menu'
import mixin from '../mixin'
export default {
  mixins: [mixin],
  name: 'sidebar-menu',
  components: {
    SidebarSubMenu
  },
  props: {
    menuList: Array,
    activeName: String,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: 'light'
    },
    openNames: {
      type: Array
    },
    isCollapsed: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit('on-change', active)
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
      }
    })
  }
}
</script>
