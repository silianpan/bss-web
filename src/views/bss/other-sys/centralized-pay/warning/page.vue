<template>
  <div style="padding:16px;height: 100%; overflow-y: auto;">
    <condition-form :area-info="areaInfo" @condition-change="conditionChange"></condition-form>
    <Alert v-if="$_.isEmpty(conForm)" show-icon type="success">点击分析按钮进行数据分析</Alert>
    <div v-else>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="18" :lg="18">
          <ContrastBs :queryParams="conForm"></ContrastBs>
        </i-col>
        <i-col :xs="24" :sm="24" :md="6" :lg="6">
          <PercentBs :queryParams="conForm" @open-pay="showPay"></PercentBs>
        </i-col>
      </Row>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="18" :lg="18">
          <ContrastBsi :queryParams="conForm"></ContrastBsi>
        </i-col>
        <i-col :xs="24" :sm="24" :md="6" :lg="6">
          <PercentBsi :queryParams="conForm" @open-pay="showPay"></PercentBsi>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import ConditionForm from './condition-form.vue'
import ContrastBs from './chart/contrast-bs.vue'
import ContrastBsi from './chart/contrast-bsi.vue'
import PercentBs from './chart/percent-bs.vue'
import PercentBsi from './chart/percent-bsi.vue'

import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import PayList from '@/views/bss/other-sys/centralized-pay/payment-detail/pay-list.vue'

export default {
  components: {
    ConditionForm,
    ContrastBs,
    ContrastBsi,
    PercentBs,
    PercentBsi
  },
  props: {
    areaInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      conForm: {}
    }
  },
  methods: {
    conditionChange(param) {
      this.conForm = param
    },
    showPay(param) {
      let queryParams = {
        ...this.conForm,
        ...param
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `支付明细详情`,
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
