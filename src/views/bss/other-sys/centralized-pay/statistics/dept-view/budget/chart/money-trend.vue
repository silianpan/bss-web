<!-- 不同年的汇总：折线图 -->
<template>
  <LineChart :options="options" :queryFunc="queryFunc" :queryParams="queryParams" @line-point-click="pointClick" />
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import LineChart from '_c/chart/line-chart'
import Api from '@/api/sysPay/pay/budget.js'
export default {
  components: {
    LineChart
  },
  props: {
    preTitle: {
      type: String,
      default: '单位指标资金趋势'
    },
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: {}
    }
  },
  created() {
    this.options = Object.assign({}, this.options, {
      fieldMap: {
        time: 'month',
        name: '',
        value: 'totalCheckMoney'
      },
      valueUnit: '元',
      title: `${this.preTitle}（单位：元）`,
      timeAxisProps: {
        label: {
          formatter: (text) => {
            return text + '月'
          }
        }
      },
      guideLineProps: {
        start: ['min', 0],
        end: ['max', 0],
        lineStyle: {
          stroke: '#e64646',
          lineWidth: 1,
          lineDash: [3, 3]
        }
      }
    })
  },
  methods: {
    async queryFunc() {
      return Api.moneyTrend(this.queryParams)
    },
    pointClick(data) {
      let param = { month: data.point.month }
      this.$emit('open-budget', param)
    }
  }
}
</script>

<style lang="less">
</style>
