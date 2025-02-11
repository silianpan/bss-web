<template>
  <HotWord :queryFunc="queryFunc" :queryParams="queryParams" title="热点支付（经济科目）"></HotWord>
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import HotWord from '_c/chart/hot-word'
import Api from '@/api/sysPay/pay/pay.js'
export default {
  components: {
    HotWord
  },
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async queryFunc() {
      return Api.hotBsi(this.queryParams)
    }
  }
}
</script>

<style lang="less">
</style>
