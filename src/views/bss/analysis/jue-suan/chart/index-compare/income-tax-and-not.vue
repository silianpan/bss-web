<!-- 税收收入和非税收入占比：饼图 -->
<template>
  <Pie
    :options="options"
    :queryFunc="queryFunc"
    :queryParams="queryParams"
    ref="pieRef"
    @pie-title-click="handleTitleClick"
    @pie-label-click="handleClick"
  />
</template>

<script>
import Pie from '_c/chart/pie'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import BudgetFinalDetail from '@/views/bss/analysis/jue-suan/detail-info/budget-final-detail'
import CommonUtil from '@/utils/CommonUtil'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import { indicatorRange } from '../index'
const valueUnit = '万元'
const titlePre = '总税收收入和总非税收入占比情况'
export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    // 指标
    indicator: {
      type: String,
      default: ''
    }
  },
  components: {
    Pie
  },
  created() {
    const tmp = indicatorRange.find(item => item.value === this.indicator) || {}
    if (tmp) {
      this.options = {
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: this.indicator
        },
        title: `${titlePre}-${tmp.name}（单位：${valueUnit}）`,
        colorList: ['#1890ff', '#37c661']
      }
    }
  },
  data() {
    return {
      options: {
        title: `${titlePre}（单位：${valueUnit}）`,
        colorList: ['#1890ff', '#37c661']
      }
    }
  },
  watch: {
    indicator(newVal, oldVal) {
      if (newVal) {
        this.$set(this.options, 'fieldMap', {
          time: 'year',
          name: 'budgetSubject',
          value: newVal
        })
        const tmp = indicatorRange.filter(item => item.value === newVal)[0]
        this.$set(
          this.options,
          'title',
          `${titlePre}-${tmp.name}（单位：${valueUnit}）`
        )
      }
    }
  },
  methods: {
    async queryFunc() {
      return AnalysisBudgetFinalService.querySumByCon(this.queryParams)
    },
    updateData() {
      this.$refs.pieRef.queryData()
    },
    handleTitleClick() {
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `详情`,
          width: 60,
          maskClosable: true,
          render: h => {
            return (
              <BudgetFinalDetail
                queryParams={qp}
                indicator={this.indicator}
                flag={'querySumByCon'}
              ></BudgetFinalDetail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      let { onlyTax, budgetSubject } = data
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      qc.pbudget_subject = budgetSubject
      if (!onlyTax) {
        qc.fundType = '收入'
      }
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `详情`,
          width: 60,
          maskClosable: true,
          render: h => {
            return (
              <BudgetFinalDetail queryParams={ qp } indicator={ this.indicator } selectedData={ data }></BudgetFinalDetail>
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
