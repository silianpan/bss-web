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
import BudgetDeptSheet1 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1'
import BudgetDeptSheet2 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet2'
import BudgetDeptSheet3 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet3'
import BudgetDeptSheet4 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet4'
import BudgetDeptSheet5 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet5'
import BudgetDeptSheet6 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet6'
import BudgetDeptSheet7 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet7'
import BudgetDeptSheet8 from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet8'
export default {
  props: {
    areaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ConditionsForm,
    BudgetDeptSheet1,
    BudgetDeptSheet2,
    BudgetDeptSheet3,
    BudgetDeptSheet4,
    BudgetDeptSheet5,
    BudgetDeptSheet6,
    BudgetDeptSheet7,
    BudgetDeptSheet8
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
        { label: '表一财政拨款支出表', component: 'BudgetDeptSheet1' },
        { label: '表二一般公共预算支出表', component: 'BudgetDeptSheet2' },
        { label: '表三一般公共预算基本支出表', component: 'BudgetDeptSheet3' },
        { label: '表四一般公共预算“三公”经费支出表', component: 'BudgetDeptSheet4' },
        { label: '表五政府性基金预算支出表', component: 'BudgetDeptSheet5' },
        { label: '表六部门收支总表', component: 'BudgetDeptSheet6' },
        { label: '表七部门收入总表', component: 'BudgetDeptSheet7' },
        { label: '表八部门支出总表', component: 'BudgetDeptSheet8' }
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
        this.currentComp = 'BudgetDeptSheet1'
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
