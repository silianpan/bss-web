<!--  -->
<template>
<div :class="classes" @mouseenter="isHover=true" @mouseleave="isHover=false">
  <div @click="handleItemClick" :class="iconClasses">
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
  props: {
    extName: {
      type: String,
      default: () => 'txt'
    },
    nameFiled: {
      type: String,
      default: () => 'fileName'
    }
  },
  components: {},
  data() {
    return {
      // 文件图标样式集合
      fileIcons: [
        'xls',
        'xlsx',
        'excel',
        'sql',
        'code',
        'pdf',
        'txt',
        'mp3',
        'jpg',
        'png',
        'ppt',
        'pptx',
        'video',
        'word',
        'white',
        'doc',
        'docx',
        'word',
        'rar',
        'zip',
        'rar',
        'exe'
      ]
    }
  },
  methods: {
    handleSelected() {
      this.selected = !this.selected
      this.$emit('on-selected', this.selected, Object.assign({}, this.data, {
        _type: 'file'
      }))
    },
    handleItemClick() {
      this.$emit('on-click', Object.assign({}, this.data, {
        _type: 'file'
      }))
    }
  },

  computed: {
    iconClasses() {
      return ['file-large-icon', this.$_.includes(this.fileIcons, this.extName) ? 'ext-' + this.extName : 'ext-code']
    },
    classes() {
      return {
        'file-item-container': true,
        'is-hover': this.isHover,
        'selected': this.selected
      }
    }
  }
}
</script>

<style scoped>

</style>
