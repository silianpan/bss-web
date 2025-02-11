<template>
  <div>
    <Alert v-if="$_.isEmpty(conForm)" show-icon type="success">点击分析按钮进行数据分析</Alert>
    <div v-else>
      <Row type="flex" :gutter="8">
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <bs-money :queryParams="conForm"></bs-money>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <pk-money :queryParams="conForm"></pk-money>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <type-status :queryParams="conForm"></type-status>
        </i-col>
      </Row>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="24" :lg="24">
          <money-trend :queryParams="conForm" @open-plan="showPlan"></money-trend>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import BsMoney from './chart/bs-money.vue'
import PkMoney from './chart/pk-money.vue'
import TypeStatus from './chart/type-status.vue'
import MoneyTrend from './chart/money-trend.vue'

import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import PlanList from '@/views/bss/other-sys/centralized-pay/payment-plan/plan-list.vue'

export default {
  components: {
    BsMoney,
    PkMoney,
    TypeStatus,
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
    showPlan(param) {
      let queryParams = {
        ...this.conForm,
        ...param
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `单位指标详情`,
          width: 1000,
          maskClosable: false,
          components: { PlanList },
          render: (h) => {
            return <PlanList queryParams={queryParams}></PlanList>
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
