<template>
  <div>
    <!-- 图表 -->
    <Row type="flex" justify="center" :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 总收入和总支出占比：饼图 -->
        <IncomeOutgo :queryParams="queryParams1" :indicator="qc.indicator" />
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="24">
        <!--  -->
        <IncomeEcon :queryParams="queryParams2" :indicator="qc.indicator" />
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="24">
        <OutgoEcon :queryParams="queryParams3" :indicator="qc.indicator" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../index-compare-mixin'
export default {
  mixins: [IndexCompareMixin],
  components: {},
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
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '0' },
        { field: 'fund_type', value: '收入' }
      ]
      return {
        conditions: conditions
      }
    },
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [
        ...conditions,
        { field: 'budget_subject_level', value: '0' },
        { field: 'fund_type', value: '支出' }
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
