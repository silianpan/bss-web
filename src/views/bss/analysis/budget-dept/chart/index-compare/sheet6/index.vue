<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 收入总计和支出总计占比：饼图 -->
        <IncomeOutgo
          @title-click="handleIncomeOutgo1TitleClick"
          @label-click="handleIncomeOutgo1Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          :options="{title:'收入总计、支出总计占比（万元）'}"
          ref="IncomeOutgoRef"
        />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 本年收入合计、本年支出合计、上年结转、结转下年占比：饼图 -->
        <IncomeOutgo
          @title-click="handleIncomeOutgo2TitleClick"
          @label-click="handleIncomeOutgo2Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          :options="{title:'本年收入合计、本年支出合计、上年结转、结转下年占比（万元）'}"
          ref="IncomeOutgoRef2"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 本年收入合计、本年支出合计、上年结转、结转下年及明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          @title-click="handleIncomeOutgo2TitleClick"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams3"
          :options="{title:'本年收入合计、本年支出合计、上年结转、结转下年情况（万元）'}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS6Api from '@/api/sys/analysis/budget-dept-s6'
import Sheet6Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet6-detail'
import CommonUtil from '@/utils/CommonUtil'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({ field: 'subjects', value: ['收入总计', '支出总计'] })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'subjects',
        value: ['本年收入合计', '本年支出合计', '上年结转', '结转下年']
      })
      return { conditions }
    },
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'not_subjects',
        value: ['收入总计', '支出总计']
      })
      return { conditions }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS6Api.queryByCon(queryParams)
    },
    handleIncomeOutgo1TitleClick() {
      let fundType = 'all'
      let qp = {
        conditions: Object.assign([], this.queryParams1.conditions || [])
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet6Detail queryParams={qp} type={fundType}></Sheet6Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleIncomeOutgo1Click(data) {
      let { fundType } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.fundType = fundType
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet6Detail queryParams={qp} type={fundType}></Sheet6Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    handleIncomeOutgo2TitleClick() {
      let fundType = 'all'
      let qp = {
        conditions: Object.assign([], this.queryParams2.conditions || [])
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet6Detail queryParams={qp} type={fundType}></Sheet6Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleIncomeOutgo2Click(data) {
      let { fundType, psubject } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.fundType = fundType
      qc.psubject = psubject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet6Detail queryParams={qp} type={fundType}></Sheet6Detail>
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
