<template>
  <div style="height:100%;">
    <ConditionsForm :area-info="areaInfo" ref="conditions" @on-search="handleAnalysis"></ConditionsForm>
    <div style="padding:16px;height: 100%; overflow-y: auto;">
      <Tabs :animated="false" @on-click="handleTabClick">
        <TabPane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.component"></TabPane>
      </Tabs>
      <div>
        <component :qc="qc" :conditions="conditions" :is="currentComp"></component>
      </div>
    </div>
    <Alert v-if="$_.isEmpty(qc)" show-icon type="success">点击分析按钮进行数据分析</Alert>
  </div>
</template>

<script>
import ConditionsForm from './conditions-form'
import { budgetFinalMakeLevel } from '@/views/bss/budget/type-to-name'
import BudgetDeptFinalSheet1 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet1'
import BudgetDeptFinalSheet2 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet2'
import BudgetDeptFinalSheet3 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet3'
import BudgetDeptFinalSheet4 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet4'
import BudgetDeptFinalSheet5 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet5'
import BudgetDeptFinalSheet6 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet6'
import BudgetDeptFinalSheet7 from '@/views/bss/analysis/budget-dept-final/chart/index-compare/sheet7'
export default {
  props: {
    areaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ConditionsForm,
    BudgetDeptFinalSheet1,
    BudgetDeptFinalSheet2,
    BudgetDeptFinalSheet3,
    BudgetDeptFinalSheet4,
    BudgetDeptFinalSheet5,
    BudgetDeptFinalSheet6,
    BudgetDeptFinalSheet7
  },
  data() {
    return {
      currentComp: null,
      conditions: [],
      qc: {}
    }
  },
  computed: {
    tabOptions() {
      return [
        { label: '表一收入决算表', component: 'BudgetDeptFinalSheet1' },
        { label: '表二支出决算表', component: 'BudgetDeptFinalSheet2' },
        { label: '表三财政拨款收入支出决算总表', component: 'BudgetDeptFinalSheet3' },
        { label: '表四一般公共预算财政拨款支出决算表', component: 'BudgetDeptFinalSheet4' },
        { label: '表五一般公共预算财政拨款基本支出决算表', component: 'BudgetDeptFinalSheet5' },
        { label: '表六一般公共预算相关经费支出决算表', component: 'BudgetDeptFinalSheet6' },
        { label: '表七政府性基金预算财政拨款收入支出决算表', component: 'BudgetDeptFinalSheet7' }
      ]
    }
  },
  methods: {
    formatMakeLevel(makeLevel) {
      return budgetFinalMakeLevel[makeLevel] || '-'
    },
    handleAnalysis() {
      let formDatas = this.$refs.conditions.getDatas()
      if (!formDatas.govDept || this.$_.isEmpty(formDatas.govDept)) {
        this.$Message.warning('请选择部门进行分析!')
        return
      }
      this.qc = formDatas
      this.conditions = this.$refs.conditions.getConditions()
      if (this.$_.isNil(this.currentComp)) {
        this.currentComp = 'BudgetDeptFinalSheet1'
      }
    },
    handleTabClick(name) {
      let formDatas = this.$refs.conditions.getDatas()
      if (!formDatas.govDept || this.$_.isEmpty(formDatas.govDept)) {
        this.$Message.warning('请选择部门进行分析!')
        return
      }
      this.qc = formDatas
      this.conditions = this.$refs.conditions.getConditions()
      this.currentComp = name
    }
  }
}
</script>
