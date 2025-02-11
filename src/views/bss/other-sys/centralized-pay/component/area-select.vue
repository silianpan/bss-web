<template>
  <Select @input="handleInput" @on-change="handleChange" :clearable="clearable" :filterable="filterable" :loading="loading" :value="value" :label="label" :label-in-value="labelInValue">
    <Option v-for="(option, index) in selectOptions" :value="option.eleRegion" :key="index">{{ option.name }}</Option>
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
    clearable: {
      type: Boolean,
      default: false
    },
    filterable: Boolean,
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: ''
    },
    placeholder: String,
    labelInValue: {
      type: Boolean,
      default: () => false
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
    handleChange(data) {
      this.$emit('on-change', data)
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
      }
      this.loading = false
    }
  }
}
</script>
