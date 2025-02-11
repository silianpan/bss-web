<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 总收入和总支出占比：饼图 -->
        <IncomeOutgo :queryParams="queryParams1" :indicator="qc.indicator" ref="IncomeOutgoRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 税收收入和非税收入占比：柱状 -->
        <IncomeTaxAndNot
          :queryParams="queryParams2"
          :indicator="qc.indicator"
          ref="IncomeTaxAndNotRef"
        />
      </i-col>
    </Row>
    <div style="width: 2500px">
      <!-- 税收收入：条形图 -->
      <IncomeTax :queryParams="queryParams3" :indicator="qc.indicator" ref="IncomeTaxRef" />
      <!-- 非税收入：条形图 -->
      <IncomeTaxNot :queryParams="queryParams4" :indicator="qc.indicator" ref="IncomeTaxNotRef" />
      <!-- 支出-功能分类：柱状图 -->
      <OutgoFunc :queryParams="queryParams5" :indicator="qc.indicator" ref="OutgoFuncRef" />
      <!-- 支出-经济分类：柱状图 -->
      <OutgoEcon :queryParams="queryParams6" :indicator="qc.indicator" ref="OutgoEconRef" />
    </div>
  </div>
</template>

<script>
import IndexCompareMixin from '../index-compare-mixin'
export default {
  mixins: [IndexCompareMixin],

  data() {
    return {}
  },
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({ field: 'only_total', value: 'true' })
      return {
        conditions: conditions
      }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [...conditions, { field: 'only_tax', value: 'true' }]
      return {
        conditions: conditions
      }
    },
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '1' },
        { field: 'fund_type', value: '收入' },
        { field: 'pbudget_subject', value: '税收收入' }
      ]
      return {
        conditions: conditions
      }
    },
    queryParams4() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '1' },
        { field: 'fund_type', value: '收入' },
        { field: 'pbudget_subject', value: '非税收入' }
      ]
      return {
        conditions: conditions
      }
    },
    queryParams5() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '0' },
        { field: 'fund_type', value: '支出' }
      ]
      return {
        conditions: conditions
      }
    },
    queryParams6() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '0' },
        { field: 'fund_type', value: '支出-经济分类' }
      ]
      return {
        conditions: conditions
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
</style>
