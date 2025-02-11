<!-- 不同年的汇总：折线图 -->
<template>
  <LineChart :options="options" :queryFunc="queryFunc" :queryParams="queryParams" ref="pieRef" />
</template>

<script>
import LineChart from '_c/chart/line-chart'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import { indicatorRange } from '../index'
const valueUnit = '万元'
const titlePre = '总收入和总支出年度对比趋势'
export default {
  components: {
    LineChart
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
        title: `${titlePre}-决算数（单位：${valueUnit}）`
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
    }
  }
}
</script>
