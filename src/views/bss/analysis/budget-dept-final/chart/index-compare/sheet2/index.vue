<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 柱状图：支出决算 -->
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
import Sheet2Detail from '@/views/bss/analysis/budget-dept-final/detail-info/sheet2-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s2'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '支出决算（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          // height: 180,
          offsetY: -40
        },
        // foldFields: ['outTotalNum', 'basicOut', 'projectOut', 'superUpOut', 'magOut', 'unitSubsidyOut'],
        foldFields: ['outTotalNum', 'basicOut', 'projectOut'],
        foldFieldsRename: {
          outTotalNum: '本年支出合计',
          basicOut: '基本支出',
          projectOut: '项目支出'
          // superUpOut: '上缴上级支出',
          // magOut: '经营支出',
          // unitSubsidyOut: '对附属单位补助支出'
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
          title: `${govDept}-支出决算详情`,
          width: 80,
          render: h => {
            return <Sheet2Detail queryParams={qp}></Sheet2Detail>
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
