<template>
  <Select
    @input="handleInput"
    :clearable="clearable"
    :filterable="filterable"
    :loading="loading"
    :value="value"
    :label="label"
  >
    <Option
      v-for="(option, index) in selectOptions"
      :value="option"
      :label="option"
      :key="index"
      >{{ option }}</Option
    >
  </Select>
</template>

<script>
import AnalysisBudgetDeptS1Api from '@/api/sys/analysis/budget-dept-s1'
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: () => ''
    },
    clearable: Boolean,
    filterable: Boolean,
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: () => ''
    },
    placeholder: String,
    // 查询条件
    conditions: Object,
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
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
    // 远程搜索
    async init() {
      this.loading = true
      let rb = await AnalysisBudgetDeptS1Api.listYears(this.conditions || {})
      if (rb.ok()) {
        this.selectOptions = rb.data || []
        if (
          this.selectOptions &&
          this.selectOptions.length > this.defaultValueIndex
        ) {
          this.$emit('input', this.selectOptions[this.defaultValueIndex])
          // this.$forceUpdate()
        } else {
          this.$emit('input', this.selectOptions && this.selectOptions.length > 0 ? this.selectOptions[0] : '')
        }
      }
      this.loading = false
    }
  },
  watch: {
    conditions(value) {
      if (value) {
        this.init()
      }
    }
  }
}
</script>
