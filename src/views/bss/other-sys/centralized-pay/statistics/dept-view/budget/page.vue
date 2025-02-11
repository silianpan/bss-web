<template>
  <div>
    <Alert v-if="$_.isEmpty(conForm)" show-icon type="success">点击分析按钮进行数据分析</Alert>
    <div v-else>
      <Row type="flex" :gutter="8">
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <bp-money :queryParams="conForm"></bp-money>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <bs-money :queryParams="conForm"></bs-money>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <type-status :queryParams="conForm"></type-status>
        </i-col>
      </Row>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="24" :lg="24">
          <money-trend :queryParams="conForm" @open-budget="showBudget"></money-trend>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import BpMoney from './chart/bp-money.vue'
import BsMoney from './chart/bs-money.vue'
import TypeStatus from './chart/type-status.vue'
import MoneyTrend from './chart/money-trend.vue'

import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import BudgetList from '@/views/bss/other-sys/centralized-pay/unit-indicators/budget-list.vue'

export default {
  components: {
    BpMoney,
    BsMoney,
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
    showBudget(param) {
      let queryParams = {
        ...this.conForm,
        ...param
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `单位指标详情`,
          width: 1000,
          maskClosable: false,
          components: { BudgetList },
          render: (h) => {
            return <BudgetList queryParams={queryParams}></BudgetList>
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
