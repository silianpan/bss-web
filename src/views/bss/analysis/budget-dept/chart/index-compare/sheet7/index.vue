<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          @title-click="handleTitleClick"
          @label-click="handleClick"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet7Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet7-detail'
// import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS7Api from '@/api/sys/analysis/budget-dept-s7'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '部门收入情况（万元）',
        foldFields: [
          'subtotal',
          'lastYear',
          'faGeneral',
          'faGovFund',
          'cause',
          'causeUnit',
          'superSubsidy',
          'subUnitTrunin',
          'other',
          'balance'
        ],
        foldFieldsRename: {
          subtotal: '合计',
          lastYear: '上年结转',
          faGeneral: '一般公共预算拨款收入',
          faGovFund: '政府性基金预算拨款收入',
          cause: '事业收入',
          causeUnit: '事业单位经营收入',
          superSubsidy: '上级补助收入',
          subUnitTrunin: '下级单位上缴收入',
          other: '其他收入',
          balance: '用事业基金弥补收支差额'
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
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS7Api.queryByCon(queryParams)
    },
    handleTitleClick() {
      let qp = {
        conditions: this.conditions
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet7Detail queryParams={qp}></Sheet7Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      let qp = {
        conditions: [
          ...this.conditions,
          { field: 'subject', value: data.subject }
        ]
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet7Detail queryParams={qp}></Sheet7Detail>
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>
