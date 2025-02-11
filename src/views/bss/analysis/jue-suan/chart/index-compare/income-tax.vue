<!-- 税收收入：条形图 -->
<template>
  <Bar :options="options" :queryFunc="queryFunc" :queryParams="queryParams" ref="barRef" @bar-title-click="handleTitleClick" @bar-label-click="handleClick" />
</template>

<script>
import Bar from '_c/chart/bar'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import BudgetFinalDetail from '@/views/bss/analysis/jue-suan/detail-info/budget-final-detail'
import { indicatorRange } from '../index'
import CommonUtil from '@/utils/CommonUtil'
const valueUnit = '万元'
const titlePre = '税收收入分布情况'
export default {
  components: {
    Bar
  },
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
  created() {
    const tmp = indicatorRange.find(item => item.value === this.indicator) || {}
    if (tmp) {
      this.options = Object.assign({}, this.options, {
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: this.indicator
        },
        title: `${titlePre}-${tmp.name}（单位：${valueUnit}）`
      })
    }
  },
  data() {
    return {
      options: {
        title: `${titlePre}-决算数（单位：${valueUnit}）`,
        chartProps: {
          height: 600,
          padding: [10, 125, 80, 120]
        },
        legendProps: {
          position: 'right'
        },
        labelProps: {
          offset: 6,
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -30
          }
        },
        itemField: 'name'
        // colorList: ['#ff786b', '#0fdd7e', '#bc9dfb', '#ff2e6a', '#7effa2', '#e57ec0', '#2c818f', '#ff7730']
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
      return AnalysisBudgetFinalService.queryByCon(this.queryParams)
    },
    updateData() {
      this.$refs.barRef.queryData()
    },
    handleTitleClick() {
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance({
        title: `详情`,
        width: 60,
        maskClosable: true,
        render: (h) => {
          return (
            <BudgetFinalDetail queryParams={ qp } indicator={ this.indicator } flag={'queryByCon'}></BudgetFinalDetail>
          )
        }
      }, this)
      drawer.show()
    },
    handleClick(data) {
      let { budgetSubject } = data
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)

      delete qc.budget_subject_level
      qc.pbudget_subject = budgetSubject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance({
        title: `详情`,
        width: 60,
        maskClosable: true,
        render: (h) => {
          return (
            <BudgetFinalDetail queryParams={ qp } indicator={ this.indicator } selectedData={ data }></BudgetFinalDetail>
          )
        }
      }, this)
      drawer.show()
    }
  }
}
</script>
