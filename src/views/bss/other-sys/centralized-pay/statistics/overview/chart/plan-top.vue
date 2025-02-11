<template>
  <Column :options="options" :queryFunc="queryFunc" :queryParams="queryParams" />
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import Column from '_c/chart/column'
import Api from '@/api/sysPay/pay/plan.js'
export default {
  components: {
    Column
  },
  props: {
    preTitle: {
      type: String,
      default: '用款核批金额Top10'
    },
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.options = Object.assign({}, this.options, {
      fieldMap: {
        name: 'enName',
        value: 'totalPlanMoney',
        time: 'enName'
      },
      valueUnit: '元',
      title: `${this.preTitle}（单位：元）`
    })
  },
  data() {
    return {
      options: {
        title: '',
        chartProps: {
          height: 500,
          padding: [50, 120, 150, 120]
        },
        legendProps: {
          position: 'bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        labelSize: 26,
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // rotate: -60
          }
        },
        adjustProps: [
          {
            type: 'dodge',
            marginRatio: 1 / 32
          }
        ],
        colorList: [
          '#ff786b',
          '#0fdd7e',
          '#bc9dfb',
          '#ff2e6a',
          '#7effa2',
          '#e57ec0',
          '#2c818f',
          '#ff7730'
        ]
      }
    }
  },
  methods: {
    async queryFunc() {
      return Api.topTen(this.queryParams)
    }
  }
}
</script>

<style lang="less">
</style>
