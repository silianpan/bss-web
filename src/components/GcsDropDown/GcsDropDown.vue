<template>
  <span @mouseenter="hover = true" @mouseleave="hover = false">
    <Dropdown trigger="custom" :visible="visible"  @on-click="returnValue" @on-clickoutside="visible = !visible">
      <a href="javascript:void(0)" :style="{ fontWeight: 'bold', color: disabled ? '#a0a0a0' : '#004276' }" @click="openItem">
        {{ $_.isNil(value) || $_.isEmpty(value) ? '请选择' : value }}
        <Icon type="ios-arrow-down" :style="{ color: disabled ? '#a0a0a0' : '#004276' }"></Icon>
      </a>
      <DropdownMenu class="gcs-drop-down" slot="list">
        <div v-if="$_.isNil(data)" style="width: 100%; text-align: center">加载中…</div>
        <div v-if="$_.isEmpty(data)" style="width: 100%; text-align: center">暂无数据</div>
        <template v-for="item in treeData">
          <DropdownItem v-if="$_.isEmpty(item.children)" :key="item.id" :name="JSON.stringify(item)">{{sliceTitle(item[menuLabelField], 7)}}</DropdownItem>
          <GcsDropDownItem v-else :key="item.id" :data="item" :menuLabelField="menuLabelField"></GcsDropDownItem>
        </template>
      </DropdownMenu>
    </Dropdown>
    <Icon v-if="showCancelBtn && !disabled" type="md-close-circle" color="#808695" @click.native="cancelSelected" style="cursor: pointer; margin-left: 5px" />
  </span>
</template>

<script>
import GcsDropDownItem from './GcsDropDownItem'

export default {
  components: {
    GcsDropDownItem
  },
  props: {
    data: {
      type: Array,
      default: () => null
    },
    value: {
      type: String,
      default: () => null
    },
    menuLabelField: {
      type: String,
      default: () => 'label'
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      visible: false,
      hover: false
    }
  },
  methods: {
    sliceTitle(t, n) {
      if (t.length > n) {
        return t.slice(0, n) + '…'
      } else {
        return t
      }
    },
    returnValue(name) {
      if (!this.disabled) {
        let obj = JSON.parse(name)
        this.visible = !this.visible
        // 通知v-modal指定的事件来更新绑定的属性值
        if (this.$_.isNil(obj.cancelFlag)) {
          this.$emit('input', obj[this.menuLabelField])
        } else {
          this.$emit('input', '')
          obj = {}
        }
        // 返回数据给父组件
        this.$emit('on-item-click', obj)
      }
    },
    openItem() {
      this.visible = this.disabled ? false : !this.visible
    },
    cancelSelected() {
      this.returnValue(JSON.stringify({ cancelFlag: true }))
    }
  },
  computed: {
    treeData() {
      let treeData = this.data
      return treeData
    },
    showCancelBtn() {
      return !this.$_.isNil(this.value) && !this.$_.isEmpty(this.value) && this.hover === true
    }
  }
}
</script>

<style lang="less" scoped>
@import './gcsDropDown.less';
</style>
