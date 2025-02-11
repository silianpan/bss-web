<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          @title-click="handleTitleClick"
          @label-click="handleClick"
          :queryParams="queryParams3"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet4Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet4-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS4Api from '@/api/sys/analysis/budget-dept-s4'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '一般公共预算"三公"经费支出情况（万元）',
        foldFields: [
          'total',
          'goAbroad',
          'carSubtotal',
          'carBuy',
          'carRun',
          'entertainment'
        ],
        foldFieldsRename: {
          total: '合计',
          goAbroad: '因公出国(境)费',
          carSubtotal: '公务用车购置及运行费小计',
          carBuy: '公务用车购置费',
          carRun: '公务用车运行费',
          entertainment: '公务接待费'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'yearBudget',
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
      return AnalysisBudgetDeptS4Api.queryByCon(queryParams)
    },
    handleTitleClick() {
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet4Detail queryParams={this.queryParams3}></Sheet4Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      let { yearBudget } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.yearBudget = yearBudget
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }

      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet4Detail queryParams={qp}></Sheet4Detail>
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>
