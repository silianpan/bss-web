<template>
  <div>
    <!-- 图表 -->
    <Row
      :gutter="20"
      style="margin-bottom: 20px;"
      v-if=" qc.startYear && qc.endYear && qc.startYear!==qc.endYear"
    >
      <i-col :md="24" :lg="24">
        <!-- 不同年的汇总：折线图 -->
        <Summary :queryParams="queryParams1" :indicator="qc.indicator" ref="SummaryRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 不同年的税收收入：条形图 -->
        <IncomeTax :queryParams="queryParams2" :indicator="qc.indicator" ref="IncomeTaxRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 不同年的税收收入（以年为维度）：条形图 -->
        <IncomeTaxYear
          :queryParams="queryParams2"
          :indicator="qc.indicator"
          ref="IncomeTaxYearRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 不同年的非税收收入：条形图 -->
        <IncomeTaxNot :queryParams="queryParams3" :indicator="qc.indicator" ref="IncomeTaxNotRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 不同年的非税收收入（以年为维度）：条形图 -->
        <IncomeTaxNotYear
          :queryParams="queryParams3"
          :indicator="qc.indicator"
          ref="IncomeTaxNotYearRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 不同年的支出-功能分类：柱状图 -->
        <OutgoFunc :queryParams="queryParams4" :indicator="qc.indicator" ref="OutgoFuncRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 不同年的支出-经济分类：柱状图 -->
        <OutgoEcon :queryParams="queryParams5" :indicator="qc.indicator" ref="OutgoEconRef" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import YearCompareMixin from '@/views/bss/analysis/jue-suan/chart/year-compare/year-compare-mixin'
export default {
  mixins: [YearCompareMixin],

  components: {},
  data() {
    return {}
  },
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [...conditions, { field: 'only_total', value: 'true' }]
      return {
        conditions: conditions
      }
    },
    queryParams2() {
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
    queryParams3() {
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
    queryParams4() {
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
    queryParams5() {
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
