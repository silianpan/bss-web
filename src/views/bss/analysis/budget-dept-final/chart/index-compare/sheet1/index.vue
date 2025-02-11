<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 柱状图：收入决算 -->
        <FaDetail
          @title-click="handleTitleClick"
          @label-click="handleLabelClick"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet1Detail from '@/views/bss/analysis/budget-dept-final/detail-info/sheet1-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s1'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '收入决算（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          // height: 180,
          offsetY: -40
        },
        // foldFields: ['inTotalNum', 'faApprIn', 'superSubsidyIn', 'busiIn', 'magIn', 'unitUpIn', 'otherIn'],
        foldFields: ['inTotalNum', 'faApprIn'],
        foldFieldsRename: {
          inTotalNum: '本年收入合计',
          faApprIn: '财政拨款收入'
          // superSubsidyIn: '上级补助收入',
          // busiIn: '事业收入',
          // magIn: '经营收入',
          // unitUpIn: '附属单位上缴收入',
          // otherIn: '其他收入'
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
    handleTitleClick() {
      let qc = CommonUtil.convertToQc(this.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      this.handleClick(qp)
    },
    handleLabelClick(data) {
      let qc = CommonUtil.convertToQc(this.conditions)
      let qp = {
        conditions: [
          ...CommonUtil.convertToC(qc),
          { field: 'subject', value: data.subject }
        ]
      }
      this.handleClick(qp)
    },
    handleClick(qp) {
      let govDept = qp.conditions.filter(item => item.field === 'govDept')[0].value
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `${govDept}-收入决算详情`,
          width: 80,
          render: h => {
            return <Sheet1Detail queryParams={qp}></Sheet1Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptFinalApi.queryByCon(queryParams)
    }
  }
}
</script>
