<template>
  <div style="height:100%;">
    <ConditionsForm :area-info="areaInfo" ref="conditions" @on-search="handleAnalysis"></ConditionsForm>
    <div style="height:100%;" v-if="!$_.isEmpty(qc)">
      <Alert show-icon type="success">
        结构分析结果
        <div slot="desc">
          {{qc.year || '-'}}年 {{qc.area}}
<!--          {{formatMakeLevel(qc.makeLevel)}} {{qc.budgetType}} 对比分析-->
          预决算对比分析
        </div>
      </Alert>
      <component :qc="qc" :conditions="conditions" :is="currentComp"></component>
    </div>
    <div v-else>
      <Alert type="success" show-icon>请点击分析按钮进行数据分析</Alert>
    </div>
  </div>
</template>

<script>
import ConditionsForm from './conditions-form'
import { budgetFinalMakeLevel } from '@/views/bss/budget/type-to-name'
import GuoYou from './chart/guo-you/chart-page.vue'
import SheHui from './chart/she-hui/chart-page.vue'
import YiBan from './chart/yi-ban/chart-page.vue'
import ZhengFu from './chart/zheng-fu/chart-page.vue'
export default {
  props: {
    areaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ConditionsForm,
    GuoYou,
    SheHui,
    YiBan,
    ZhengFu
  },
  data() {
    return {
      currentComp: 'YiBan',
      conditions: [],
      qc: {},
      compOption: {
        一般公共预算: 'YiBan',
        政府性基金预算: 'ZhengFu',
        国有资本经营预算: 'GuoYou',
        社会保险基金预算: 'SheHui'
      }
    }
  },
  methods: {
    formatMakeLevel(makeLevel) {
      return budgetFinalMakeLevel[makeLevel] || '-'
    },
    handleAnalysis() {
      let formDatas = this.$refs.conditions.getDatas()
      let { budgetType } = formDatas
      if (!budgetType || this.$_.isEmpty(budgetType)) {
        this.$Message.info('请选择级别类型')
        return
      }
      this.currentComp = this.compOption[budgetType] || 'YiBan'
      this.qc = formDatas
      this.conditions = this.$refs.conditions.getConditions()
    }
  }
}
</script>
