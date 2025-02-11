
<template>
  <div class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu
      v-if="!shrink"
      :menu-theme="theme"
      :active-name="activeName"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
      :isCollapsed="isCollapsed"
    ></sidebar-menu>
    <sidebar-menu-shrink
      v-else
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
import sidebarMenu from './components/sidebar-menu.vue'
import sidebarMenuShrink from './components/sidebar-menu-shrink.vue'
import _ from 'lodash'
export default {
  name: 'shrinkable-menu',
  components: {
    sidebarMenu,
    sidebarMenuShrink
  },
  props: {
    activeName: String,
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'light',
      validator(val) {
        return _.includes(['dark', 'light'], val)
      }
    },
    openNames: {
      type: Array
    },
    isCollapsed: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    bgColor() {
      return this.theme === 'dark' ? '#495060' : '#fff'
    },
    shrinkIconColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  methods: {
    async handleChange(name) {
      this.$emit('on-change', name)
    }
  }
}
</script>
<style lang="less">
@import './styles/menu.less';
</style>
