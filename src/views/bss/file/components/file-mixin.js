export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: () => true
    },
    checked: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    checked(value) {
      this.selected = this.checked
    }
  },
  data() {
    return {
      // 鼠标是否移动在div上
      isHover: false,
      // 是否选择
      selected: this.checked
    }
  }
}
