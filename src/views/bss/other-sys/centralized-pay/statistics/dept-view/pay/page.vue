<template>
  <div>
    <Alert v-if="$_.isEmpty(conForm)" show-icon type="success">点击分析按钮进行数据分析</Alert>
    <div v-else>
      <Row type="flex" :gutter="8">
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <bs-money :queryParams="conForm"></bs-money>
        </i-col>
        <i-col :xs="24" :sm="24" :md="16" :lg="16">
          <bsi-money :queryParams="conForm"></bsi-money>
        </i-col>
      </Row>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="24" :lg="24">
          <money-trend :queryParams="conForm" @open-pay="showPay"></money-trend>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import BsMoney from './chart/bs-money.vue'
import BsiMoney from './chart/bsi-money.vue'
import MoneyTrend from './chart/money-trend.vue'

import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import PayList from '@/views/bss/other-sys/centralized-pay/payment-detail/pay-list.vue'

export default {
  components: {
    BsMoney,
    BsiMoney,
    MoneyTrend
  },
  props: {
    areaInfo: {
      type: Object,
      default: () => {}
    },
    conForm: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    showPay(param) {
      let queryParams = {
        ...this.conForm,
        ...param
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `单位指标详情`,
          width: 1000,
          maskClosable: false,
          components: { PayList },
          render: (h) => {
            return <PayList queryParams={queryParams}></PayList>
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>

<style>
</style>
