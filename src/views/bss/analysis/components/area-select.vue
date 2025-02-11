<template>
  <Select
    @input="handleInput"
    @on-change="handleChange"
    :clearable="clearable"
    :filterable="filterable"
    :loading="loading"
    :value="value"
    :label="label"
  >
    <Option
      v-for="(option, index) in selectOptions"
      :value="option.name"
      :label="option.name"
      :key="index"
    >{{ option.name }}</Option>
  </Select>
</template>

<script>
import AreaService from '@/api/sys/area/index'
export default {
  props: {
    // 父级区域id
    pid: String,
    value: {
      type: [String, Number, Array],
      default: ''
    },
    clearable: Boolean,
    filterable: Boolean,
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: ''
    },
    placeholder: String,
    defaultValueIndex: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      loading: false,
      selectOptions: []
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    pid: 'init'
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
    handleChange(value) {
      this.$emit('on-change', value)
    },
    // 远程搜索
    async init() {
      this.loading = true
      // 查询父级区域信息

      let rb = await AreaService.findById(this.pid || '-1')
      let pAreaInfo = {}
      if (rb.ok()) {
        pAreaInfo = rb.data || {}
      }
      rb = await AreaService.getAreaChildren(this.pid || '-1')
      if (rb.ok()) {
        if (!this.$_.isEmpty(pAreaInfo)) {
          this.selectOptions = [pAreaInfo].concat(rb.data || [])
        } else {
          this.selectOptions = rb.data || []
        }
        if (this.selectOptions.length > this.defaultValueIndex) {
          this.$emit('input', this.selectOptions[this.defaultValueIndex].name)
        }
      }
      this.loading = false
    }
  }
}
</script>
