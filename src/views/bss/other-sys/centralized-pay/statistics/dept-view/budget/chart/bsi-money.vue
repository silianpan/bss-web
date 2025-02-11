<template>
  <Pie ref="pieRef" :options="options" :queryFunc="queryFunc" :queryParams="queryParams"></Pie>
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import Pie from '_c/chart/pie'
import Api from '@/api/sysPay/pay/budget.js'

export default {
  components: {
    Pie
  },
  props: {
    preTitle: {
      type: String,
      default: '经济科目金额占比'
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
        name: 'bsiName',
        value: 'totalCheckMoney'
      },
      valueUnit: '元',
      title: `${this.preTitle}（单位：元）`
    }
  },
  methods: {
    async queryFunc() {
      return Api.bsiMoney(this.queryParams)
    }
  }
}
</script>

<style lang="less">
</style>
