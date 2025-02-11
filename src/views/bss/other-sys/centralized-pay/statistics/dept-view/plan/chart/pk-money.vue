<template>
  <Pie ref="pieRef" :options="options" :queryFunc="queryFunc" :queryParams="queryParams"></Pie>
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import Pie from '_c/chart/pie'
import Api from '@/api/sysPay/pay/plan.js'

export default {
  components: {
    Pie
  },
  props: {
    preTitle: {
      type: String,
      default: '支付方式金额占比'
    },
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.options = {
      fieldMap: {
        time: '',
        name: 'pkName',
        value: 'totalPlanMoney'
      },
      valueUnit: '元',
      title: `${this.preTitle}（单位：元）`,
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
  },
  methods: {
    async queryFunc() {
      return Api.pkMoney(this.queryParams)
    }
  }
}
</script>

<style lang="less">
</style>
