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
      :value="option.value"
      :label="option.name"
      :key="index"
      >{{ option.name }}</Option
    >
  </Select>
</template>

<script>
import { budgetDeptSheet } from '@/views/bss/analysis/budget-dept/chart/index'
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    clearable: Boolean,
    filterable: Boolean,
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: () => ''
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
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
    // 远程搜索
    async init() {
      this.loading = true
      let selectOptions = budgetDeptSheet || []
      this.selectOptions = selectOptions
      if (
        !this.$_.isEmpty(selectOptions) &&
        selectOptions.length > this.defaultValueIndex
      ) {
        this.$emit('input', selectOptions[this.defaultValueIndex].value)
      } else {
        this.$emit('input', '')
      }
      this.loading = false
    }
  }
}
</script>
