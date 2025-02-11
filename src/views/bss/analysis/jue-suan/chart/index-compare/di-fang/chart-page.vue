<template>
  <div>
    <!-- 图表 -->
    <Row type="flex" justify="center" :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <RemainderChart :queryParams="queryParams1" :indicator="qc.indicator" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '@/views/bss/analysis/jue-suan/chart/index-compare/index-compare-mixin'
import RemainderChart from './remainder-chart'
export default {
  mixins: [IndexCompareMixin],
  components: {
    RemainderChart
  },
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
