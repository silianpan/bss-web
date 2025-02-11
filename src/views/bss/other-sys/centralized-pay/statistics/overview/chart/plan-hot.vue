<template>
  <HotWord :queryFunc="queryFunc" :queryParams="queryParams" title="热点计划(功能科目)"></HotWord>
</template>

<script>
import '@/views/bss/other-sys/centralized-pay/statistics/chart.less'
import HotWord from '_c/chart/hot-word'
import Api from '@/api/sysPay/pay/plan.js'
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
      return Api.hotBs(this.queryParams)
    }
  }
}
</script>

<style lang="less">
</style>
