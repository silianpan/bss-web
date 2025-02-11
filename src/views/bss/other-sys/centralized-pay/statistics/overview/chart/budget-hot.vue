<template>
  <HotWord :queryFunc="queryFunc" :queryParams="queryParams" title="热点指标（指标类型）"></HotWord>
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import HotWord from '_c/chart/hot-word'
import Api from '@/api/sysPay/pay/budget.js'
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
      return Api.hotBp(this.queryParams)
    }
  }
}
</script>

<style lang="less">
</style>
