<!--  -->
<template>
<div :class="classes" @mouseenter="isHover=true" @mouseleave="isHover=false">
  <div class="file-large-icon ext-dir" @click="handleDirClick">
  </div>
  <div class="file-name">
    {{data[nameFiled]}}
  </div>
  <span v-if="editable" class="check-bar" @click="handleSelected">
    <Icon class="checked" type="md-checkmark-circle" />
  </span>
</div>
</template>

<script>
import FileMixin from './file-mixin'
export default {
  mixins: [FileMixin],
  components: {},
  props: {
    nameFiled: {
      type: String,
      default: () => 'dirName'
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSelected() {
      this.selected = !this.selected
      this.$emit('on-selected', this.selected, Object.assign({}, this.data, {
        _type: 'dir'
      }))
    },
    handleDirClick() {
      this.$emit('on-click', {
        ...this.data
      })
    }
  },
  computed: {
    classes() {
      return {
        'file-item-container': true,
        'open-enable': true,
        'is-hover': this.isHover,
        'selected': this.selected
      }
    }
  }
}
</script>

<style scoped>

</style>
