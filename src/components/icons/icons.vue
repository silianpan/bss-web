<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    // 图标类型 iview 自带图标 ivu-icon , iconfont 图标 type:'iconfont icon-name'
    type: {
      type: String,
      required: true,
      default: 'ivu-icon'
    },
    color: {
      type: String
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    classes() {
      return [`${this.type}`]
    },
    styles() {
      return {
        fontSize: `${this.size}px`,
        color: this.color
      }
    }
  }
}
</script>

<style></style>
