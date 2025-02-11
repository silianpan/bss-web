<template>
    <div :class="[prefixCls]">
        <div
            :class="classes"
            @click="handleClick"
            @drop.prevent="onDrop"
            @paste="handlePaste"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false">
            <input
                ref="input"
                type="file"
                :class="[prefixCls + '-input']"
                @change="handleChange"
                :multiple="multiple"
                :accept="accept">
            <slot></slot>
        </div>
        <slot name="tip"></slot>
    </div>
</template>
<script>
const prefixCls = 'ivu-upload'

export default {
  name: 'custom-upload',
  props: {

    // 所在目录
    dir: {
      type: Object
    },
    // 文件是否支持多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 是否打开文件上传modal
    openModal: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    },
    // 是点击选择 还是拖拽
    type: {
      type: String,
      // validator (value) {
      //   return oneOf(value, ['select', 'drag'])
      // },
      default: 'select'
    },
    // 支持格式化
    format: {
      type: Array,
      default () {
        return []
      }
    },
    // 请求地址
    action: {
      type: String
    },
    //
    accept: {
      type: String
    },
    // 支持的虽大
    maxSize: {
      type: Number
    },
    beforeUpload: Function,
    onExceededSize: {
      type: Function,
      default () {
        return {}
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return {}
      }
    },
    paste: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      dragOver: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-select`]: this.type === 'select',
          [`${prefixCls}-drag`]: this.type === 'drag',
          [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
        }
      ]
    },
    itemDisabled () {
      let state = this.disabled
      if (!state && this.FormInstance) state = this.FormInstance.disabled
      return state
    }

  },
  inject: {
    FormInstance: {
      default: ''
    }
  },
  methods: {
    handleClick () {
      if (this.itemDisabled) return
      this.$refs.input.click()
    },
    handleChange (e) {
      const files = e.target.files
      if (!files) {
        return
      }
      this.uploadFiles(files)
      this.$refs.input.value = null
    },
    onDrop (e) {
      this.dragOver = false
      if (this.itemDisabled) return
      this.uploadFiles(e.dataTransfer.files)
    },
    handlePaste (e) {
      if (this.itemDisabled) return
      if (this.paste) {
        this.uploadFiles(e.clipboardData.files)
      }
    },
    uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) postFiles = postFiles.slice(0, 1)
      if (postFiles.length === 0) return
      this.$emit('after-change')
      postFiles.forEach(file => {
        this.upload(file)
      })
    },
    upload (file) {
      if (!this.beforeUpload) {
        return this.post(file)
      }
      const before = this.beforeUpload(file)
      if (before && before.then) {
        before.then(processedFile => {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            this.post(processedFile)
          } else {
            this.post(file)
          }
        }, () => {
          // this.$emit('cancel', file);
        })
      } else if (before !== false) {
        this.post(file)
      } else {
        // this.$emit('cancel', file);
      }
    },
    post (file) {
      // check format
      if (this.format.length) {
        const _fileFormat = file.name.split('.').pop().toLocaleLowerCase()
        const checked = this.format.some(item => item.toLocaleLowerCase() === _fileFormat)
        if (!checked) {
          // 检查格式是否支持
          this.onFormatError(file, this.fileList)
          return false
        }
      }
      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList)
          return false
        }
      }
      // 开始上传
      this.handlePushToQueue(file)
    },
    handlePushToQueue (file) {
      let dir = this.dir
      let data = this.data
      let action = this.action
      if (!this.$_.isEmpty(action)) {
        // 获取 文件上传详细 窗口 如果不存在则动态创建 modal
        this.openUploadFilesModal()
        this.$store.dispatch('prepareUploadFile', { file, dir, data, action })
      }
    },
    openUploadFilesModal() {
      
    }
  },
  watch: {
  }
}
</script>
