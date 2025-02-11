<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 收入总计和支出总计占比：饼图 -->
        <IncomeOutgo
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          @title-click="handleIncomeOutgo1TitleClick"
          @label-click="handleIncomeOutgo1Click"
          :options="{title:'收入总计、支出总计占比（万元）'}"
          ref="IncomeOutgoRef"
        />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 本年收入、本年支出、上年结转、结转下年占比：饼图 -->
        <IncomeOutgo
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          @title-click="handleIncomeOutgo2TitleClick"
          @label-click="handleIncomeOutgo2Click"
          :options="{title:'本年收入、本年支出、上年结转、结转下年占比（万元）'}"
          ref="IncomeOutgoRef2"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 本年收入、本年支出、上年结转、结转下年及明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          @title-click="handleIncomeOutgo3TitleClick"
          @label-click="handleIncomeOutgo3Click"
          :options="{title:'本年收入、本年支出、上年结转、结转下年情况（万元）'}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          :queryParams="queryParams4"
          @title-click="handleTitleClick4"
          @label-click="handleLabelClick4"
          :options="options4"
          ref="FaDetailRef2"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet1Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet1-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from './index-compare-mixin'
import AnalysisBudgetDeptS1Api from '@/api/sys/analysis/budget-dept-s1'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options4: {
        title: '支出明细（万元）',
        foldFields: ['budgetNum', 'faGeneral', 'faGovFund'],
        foldFieldsRename: {
          budgetNum: '合计',
          faGeneral: '一般公共预算财政拨款',
          faGovFund: '政府性基金预算财政拨款'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      }
    }
  },
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({ field: 'subjects', value: ['收入总计', '支出总计', '本年收入', '本年支出'] })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'subjects',
        value: ['一、本年收入', '一、本年支出', '二、上年结转', '二、结转下年', '本年收入', '本年支出']
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
    },
    queryParams4() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [...conditions, { field: 'fund_type', value: '支出' }]
      return { conditions }
    }
  },
  methods: {
    handleIncomeOutgo1TitleClick() {
      let qp = {
        conditions: Object.assign([], this.queryParams1.conditions)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet1Detail queryParams={qp} type={'all'}></Sheet1Detail>
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
              <Sheet1Detail queryParams={qp} type={fundType}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    handleIncomeOutgo2TitleClick() {
      let qp = {
        conditions: Object.assign([], this.queryParams2.conditions)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet1Detail queryParams={qp} type={'all'}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleIncomeOutgo2Click(data) {
      let { fundType, subject } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.fundType = fundType
      qc.psubject = subject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet1Detail queryParams={qp} type={fundType}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    handleIncomeOutgo3TitleClick() {
      let qp = {
        conditions: Object.assign([], this.queryParams3.conditions)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet1Detail queryParams={qp} type={'all'}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleIncomeOutgo3Click(data) {
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
              <Sheet1Detail queryParams={qp} type={fundType}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    handleTitleClick4() {
      let fundType = '支出'
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
              <Sheet1Detail queryParams={qp} type={fundType}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    handleLabelClick4(data) {
      let { fundType, subject } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.fundType = fundType
      qc.subject = subject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet1Detail queryParams={qp} type={fundType}></Sheet1Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS1Api.queryByCon(queryParams)
    }
  }
}
</script>
