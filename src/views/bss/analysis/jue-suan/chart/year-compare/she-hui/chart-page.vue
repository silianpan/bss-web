<template>
  <div style="position:relative">
    <Spin v-if="loading" fix large></Spin>
    <Row
      v-if="!data || !$_.isEmpty(data)"
      type="flex"
      justify="center"
      :gutter="20"
      style="margin-bottom: 20px;"
    >
      <i-col :md="24" :lg="24" v-for="(data, key) in data" :key="key">
        <Card style="margin-bottom:10px">
          <p slot="title" class="analysis-card-title">{{key}}</p>
          <DetailChart :data="data"></DetailChart>
        </Card>
      </i-col>
    </Row>
    <div v-else-if="!loading">
      <Card style="text-align:center">暂无数据</Card>
    </div>
  </div>
</template>

<script>
import DetailChart from './compare-detail-chart'
import AnalysisBudgetFinalSocialApi from '@/api/sys/analysis/budget-final-social'
export default {
  props: {
    conditions: Array,
    qc: Object
  },
  components: {
    DetailChart
  },
  data() {
    return {
      loading: true,
      data: []
    }
  },
  computed: {},
  mounted() {
    this.queryDatas()
  },
  watch: {
    qc: 'queryDatas'
  },
  methods: {
    convertData(data) {
      if (!data || this.$_.isEmpty(data)) {
        return {}
      }
      let rs = {}
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        let { budgetProject } = element
        if (budgetProject) {
          if (!rs[budgetProject]) {
            rs[budgetProject] = []
          }
          rs[budgetProject].push({ ...element })
        }
      }
      return rs
    },
    async queryDatas() {
      this.loading = true
      this.data = []
      let qc = {
        conditions: (this.conditions || []).concat([
          { field: 'budget_subject_level', value: '0' }
        ])
      }
      let rb = await AnalysisBudgetFinalSocialApi.queryByCon(qc)
      if (rb.ok()) {
        this.data = this.convertData(rb.data || [])
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
