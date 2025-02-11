<template>
  <div style="height:100%;">
    <condition-form :area-info="areaInfo" @condition-change="conditionChange"></condition-form>
    <Tabs :animated="false" @on-click="handleTabClick" type="card">
      <TabPane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.component"></TabPane>
    </Tabs>
    <component :is="currentComp" :area-info="areaInfo" :con-form="conForm"></component>
  </div>
</template>

<script>
import ConditionForm from './condition-form.vue'
import BudgetChart from './budget/page.vue'
import PlanChart from './plan/page.vue'
import PayChart from './pay/page.vue'

export default {
  components: {
    ConditionForm,
    BudgetChart,
    PlanChart,
    PayChart
  },
  props: {
    areaInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentComp: null,
      conForm: {}
    }
  },
  computed: {
    tabOptions() {
      let tabOptions = [
        {
          component: 'BudgetChart',
          label: '单位指标'
        },
        {
          component: 'PlanChart',
          label: '用款计划'
        },
        {
          component: 'PayChart',
          label: '支付明细'
        }
      ]
      return tabOptions
    }
  },
  methods: {
    conditionChange(param) {
      this.conForm = param
      if (this.$_.isNil(this.currentComp)) {
        this.currentComp = 'BudgetChart'
      }
    },
    handleTabClick(name) {
      if (this.$_.isEmpty(this.conForm) || this.$_.isNil(this.conForm.dept)) {
        this.$Message.warning('请选择部门进行分析!')
        return
      }
      this.currentComp = name
    }
  }
}
</script>

<style>
</style>
