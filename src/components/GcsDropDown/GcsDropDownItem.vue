<template>
  <Dropdown class="gcs-drop-down" placement="right-start" transfer>
    <DropdownItem :name="JSON.stringify(data)">
        {{sliceTitle(data[menuLabelField], 7)}}
        <Icon type="ios-arrow-forward"></Icon>
    </DropdownItem>
    <DropdownMenu class="gcs-drop-down" slot="list">
      <template v-for="item in data.children">
        <DropdownItem v-if="$_.isEmpty(item.children)" :key="item.id" :name="JSON.stringify(item)">
          {{sliceTitle(item[menuLabelField], 7)}}
        </DropdownItem>
        <GcsDropDownItem v-else :key="item.id" :data="item" :menuLabelField="menuLabelField"></GcsDropDownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import GcsDropDownItem from '@/components/GcsDropDown/GcsDropDownItem'

export default {
  name: 'GcsDropDownItem',
  components: {
    GcsDropDownItem
  },
  props: {
    data: Object,
    menuLabelField: {
      type: String,
      default: () => 'label'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    sliceTitle(t, n) {
      if (t.length > n) {
        return t.slice(0, n) + '…'
      } else {
        return t
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './gcsDropDown.less';
</style>
