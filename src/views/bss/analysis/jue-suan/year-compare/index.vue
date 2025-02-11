<template>
  <div style="height:100%;">
    <ConditionsForm :data="qc" :area-info="areaInfo" ref="conditions" @on-search="handleAnalysis"></ConditionsForm>
    <div style="height:100%;" v-if="!$_.isEmpty(qc)">
      <Alert show-icon type="success">结构分析结果</Alert>
      <component :qc="qc" :conditions="conditions" :is="currentComp"></component>
    </div>
    <div v-else>
      <Alert type="success" show-icon>请点击分析按钮进行数据分析</Alert>
    </div>
  </div>
</template>

<script>
import ConditionsForm from './conditions-form'
import DiFang from '@/views/bss/analysis/jue-suan/chart/year-compare/di-fang/chart-page.vue'
import GuoYou from '@/views/bss/analysis/jue-suan/chart/year-compare/guo-you/chart-page.vue'
import SheHui from '@/views/bss/analysis/jue-suan/chart/year-compare/she-hui/chart-page.vue'
import YiBan from '@/views/bss/analysis/jue-suan/chart/year-compare/yi-ban/chart-page.vue'
import ZhengFu from '@/views/bss/analysis/jue-suan/chart/year-compare/zheng-fu/chart-page.vue'
export default {
  props: {
    areaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ConditionsForm,
    DiFang,
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
        社会保险基金预算: 'SheHui',
        地方政府债务: 'DiFang'
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
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

<style scoped>
</style>
