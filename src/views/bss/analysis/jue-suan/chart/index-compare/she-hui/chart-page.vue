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
      <i-col :md="24" :lg="24" v-for="(row, index) in data" :key="index">
        <Card>
          <p
            slot="title"
            class="analysis-card-title"
            @click="handleLabelClick(row)"
          >{{row.budgetProject}}</p>
          <DetailChart @label-click="handleLabelClick" :data="row"></DetailChart>
        </Card>
      </i-col>
    </Row>
    <div v-else-if="!loading">
      <Card style="text-align:center">暂无数据</Card>
    </div>
  </div>
</template>

<script>
import DetailChart from './detail-chart'
import AnalysisBudgetFinalSocialApi from '@/api/sys/analysis/budget-final-social'
import CommonUtil from '@/utils/CommonUtil'
import BudgetSocialDetail from '@/views/bss/analysis/jue-suan/detail-info/budget-social-detail'

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
    async queryDatas() {
      this.loading = true
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'budget_project_level',
        value: '0'
      })
      let qc = {
        conditions: conditions
      }
      let rb = await AnalysisBudgetFinalSocialApi.findAll(qc)
      if (rb.ok()) {
        this.data = rb.data || []
      }
      this.loading = false
    },

    async handleLabelClick(data) {
      // let { budgetSubject, onlyTotal } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.pbudget_subject = data.budgetProject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          maskClosable: true,
          render: h => {
            return (
              <BudgetSocialDetail
                queryParams={qp}
                selectedData={data}
              ></BudgetSocialDetail>
            )
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>

<style scoped>
</style>
