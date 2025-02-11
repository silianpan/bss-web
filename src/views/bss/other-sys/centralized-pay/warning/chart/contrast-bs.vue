<template>
  <Column :options="options" :queryFunc="queryFunc" :queryParams="queryParams" />
</template>

<script>
// import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import Column from '_c/chart/column'
import Api from '@/api/sysPay/pay/pay.js'

export default {
  components: {
    Column
  },
  props: {
    preTitle: {
      type: String,
      default: '预算支出，决算支出与集中支付功能科目对比'
    },
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.options = Object.assign({}, this.options, {
      valueUnit: '万元',
      title: `${this.preTitle}（单位：万元）`,
      foldFields: ['totalBudgetMoney', 'totalPayMoney', 'totalFinalMoney'],
      foldFieldsRename: {
        totalBudgetMoney: '预算支出',
        totalPayMoney: '实际支出',
        totalFinalMoney: '决算支出'
      },
      groupField: 'name',
      itemField: 'time',
      fieldMap: {
        time: 'outType',
        name: 'bsName',
        value: 'outValue'
      }
    })
  },
  data() {
    return {
      options: {
        title: '',
        chartProps: {
          height: 400,
          padding: [45, 90, 150, 90]
        },
        legendProps: {
          position: 'bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12',
            rotate: -60
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
      return Api.contrastBudgetBs(this.queryParams)
    }
  }
}
</script>
