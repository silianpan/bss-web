<!--  -->
<template>
<Menu ref="menu"  width="auto" :active-name="activeMenuName">
  <template v-for="(item, index) in menus">
    <MenuItem @click.native="handleMenuClick(item)" :name="item.code" :key="index">
    <custom-icon :type="item.iconCls"></custom-icon>
    {{item.title}}
    </MenuItem>
  </template>
</Menu>
</template>

<script>
export default {
  props: {

    activeMenuName: {
      type: String,
      default: ''
    },

    menus: {
      type: Array,
      default: () => []
    }
  },
  components: {},

  watch: {
    activeMenuName() {
      this.refreshActName()
    },
    menus: {
      handler(value) {
        this.refreshActName()
      },
      deep: true
    }
  },
  data() {
    return {}
  },
  methods: {
    refreshActName() {
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName()
      })
    },
    handleMenuClick(menu) {
      this.$emit('menu-click', menu)
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
