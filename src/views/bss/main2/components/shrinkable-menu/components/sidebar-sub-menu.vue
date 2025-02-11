<template>
  <Submenu :name="getName(parentItem)">
    <template slot="title">
      <template v-if="isCollapsed">
          <Tooltip transfer :content="showTitle(parentItem)" placement="right" max-width="300">
            <custom-icon :type="parentItem.iconCls || ''" :size="iconSize" />
          </Tooltip>
        </template>
        <template v-else>
          <custom-icon :type="parentItem.iconCls || ''" :size="iconSize" />
          <span>{{ showTitle(parentItem) }}</span>
        </template>
    </template>
    <template v-for="item in children">
      <sidebar-sub-menu v-if="hasChildren(item)" :key="`menu-${item.id}`" :parent-item="item"></sidebar-sub-menu>
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
  </Submenu>
</template>

<script>
import mixin from '../mixin'
import itemMixin from '../item-mixin'
export default {
  mixins: [mixin, itemMixin],
  name: 'sidebar-sub-menu',
  props: {
    isCollapsed: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
