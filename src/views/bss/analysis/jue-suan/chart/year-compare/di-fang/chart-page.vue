<template>
  <div>
    <!-- 图表 -->

    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 不同年的收入功能分类：柱状图 -->
        <OutgoEcon
          pre-title="地方政府债务余额对比情况"
          :queryParams="queryParams1"
          :indicator="qc.indicator"
          ref="OutgoFuncRef"
        />
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
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '0' }
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
