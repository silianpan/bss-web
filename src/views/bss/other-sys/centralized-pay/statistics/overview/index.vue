<template>
  <div style="height:100%;">
    <condition-form :area-info="areaInfo" @condition-change="conditionChange"></condition-form>
    <Alert v-if="$_.isEmpty(conForm)" show-icon type="success">点击分析按钮进行数据分析</Alert>
    <div v-else>
      <Row type="flex" :gutter="8">
        <i-col :xs="24" :sm="24" :md="16" :lg="16">
          <budget-top :queryParams="conForm"></budget-top>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <budget-hot :queryParams="conForm"></budget-hot>
        </i-col>
      </Row>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="16" :lg="16">
          <plan-top :queryParams="conForm"></plan-top>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <plan-hot :queryParams="conForm"></plan-hot>
        </i-col>
      </Row>
      <Row type="flex" :gutter="8" class="mt-8">
        <i-col :xs="24" :sm="24" :md="16" :lg="16">
          <pay-top :queryParams="conForm"></pay-top>
        </i-col>
        <i-col :xs="24" :sm="24" :md="8" :lg="8">
          <pay-hot :queryParams="conForm"></pay-hot>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import ConditionForm from './condition-form.vue'
import BudgetTop from './chart/budget-top.vue'
import BudgetHot from './chart/budget-hot.vue'
import PlanTop from './chart/plan-top.vue'
import PlanHot from './chart/plan-hot.vue'
import PayTop from './chart/pay-top.vue'
import PayHot from './chart/pay-hot.vue'

export default {
  components: {
    ConditionForm,
    BudgetTop,
    BudgetHot,
    PlanTop,
    PlanHot,
    PayTop,
    PayHot
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
    }
  }
}
</script>

<style>
</style>
