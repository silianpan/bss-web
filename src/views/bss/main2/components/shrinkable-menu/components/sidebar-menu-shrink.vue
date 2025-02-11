<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index">
        <Dropdown
          :theme="menuTheme"
          transfer
          v-if="hasChildren(item)"
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
        >
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <custom-icon :type="item.iconCls || ''" :size="iconSize" />
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="getName(child)" :key="i">
                <custom-icon :type="child.iconCls || ''" :size="iconSize" />
                <span style="padding-left:10px;">{{ showTitle(child) }}</span>
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
          <Button
            @click="changeMenu(getName(item))"
            style="width: 70px;margin-left: -5px;padding:10px 0;"
            type="text"
          >
            <custom-icon :type="item.iconCls || ''" :size="iconSize" />
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="getName(item)" :key="'d' + index">
              <custom-icon :type="item.iconCls || ''" :size="iconSize" />
              <span style="padding-left:10px;">{{ showTitle(item) }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  mixins: [mixin],
  name: 'sidebar-menu-shrink',
  props: {
    menuList: {
      type: Array
    },
    iconSize: {
      type: Number,
      default: () => {
        return 16
      }
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    menuTheme: {
      type: String,
      default: 'dark'
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit('on-change', active)
    },
    itemTitle(item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n)
      } else {
        return item.title
      }
    }
  }
}
</script>
