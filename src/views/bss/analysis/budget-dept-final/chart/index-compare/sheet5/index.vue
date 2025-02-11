<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
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
import Sheet5Detail from '@/views/bss/analysis/budget-dept-final/detail-info/sheet5-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s5'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '一般公共预算财政拨款基本支出决算（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['subtotal', 'fundPerson', 'fundPublic'],
        foldFieldsRename: {
          subtotal: '合计',
          fundPerson: '人员经费',
          fundPublic: '公用经费'
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
          title: `${govDept}-一般公共预算财政拨款基本支出详情`,
          width: 80,
          render: h => {
            return <Sheet5Detail queryParams={qp}></Sheet5Detail>
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
