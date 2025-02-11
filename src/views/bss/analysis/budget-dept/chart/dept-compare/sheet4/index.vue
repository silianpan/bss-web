<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams3" :options="options" ref="FaDetailRef" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../../index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptS4Api from '@/api/sys/analysis/budget-dept-s4'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '一般公共预算"三公"经费支出情况（万元）',
        foldFields: ['total', 'goAbroad', 'carSubtotal', 'carBuy', 'carRun', 'entertainment'],
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
          name: 'govDept',
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
    }
  }
}
</script>
