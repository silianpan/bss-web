<template>
  <div @keyup.enter="handleSearch">
    <Form ref="searchForm" :model="formDatas" inline :label-width="100">
      <Row type="flex" :gutter="8">
        <i-col :sm="6">
          <FormItem label="编制级别" style="width:100%;">
            <BudgetMakeLevelSelect v-model="formDatas.makeLevel" placeholder="编制级别"></BudgetMakeLevelSelect>
          </FormItem>
        </i-col>
        <i-col :sm="6">
          <FormItem :label-width="20" label="-" style="width:100%;">
            <JueSuanBudgetTypeSelect
              :make-level="formDatas.makeLevel"
              v-model="formDatas.budgetType"
              placeholder="级别类型"
            ></JueSuanBudgetTypeSelect>
          </FormItem>
        </i-col>
        <i-col :sm="6" v-if="formDatas.budgetType!=='社会保险基金预算'">
          <FormItem label="对比指标" style="width:100%;">
            <JueSuanIndicatorRangeSelect v-model="formDatas.indicator" placeholder="分析指标"></JueSuanIndicatorRangeSelect>
          </FormItem>
        </i-col>
      </Row>

      <Row type="flex" :gutter="8">
        <i-col :sm="6">
          <FormItem label="对比年度" style="width:100%;">
            <JueSuanYearsSelect
              :default-value-index="2"
              v-model="formDatas.startYear"
              placeholder="对比年度"
              :conditions="yearQueryConditions"
            ></JueSuanYearsSelect>
          </FormItem>
        </i-col>
        <i-col :sm="6">
          <FormItem :label-width="20" label="-" style="width:100%;">
            <JueSuanYearsSelect
              v-model="formDatas.endYear"
              placeholder="对比年度"
              :conditions="yearQueryConditions"
            ></JueSuanYearsSelect>
          </FormItem>
        </i-col>
        <i-col :sm="6">
          <FormItem :label-width="60" :label="`区县`" style="width:100%;">
            <AreaSelect :pid="areaInfo.id" v-model="formDatas.area" placeholder="区县"></AreaSelect>
          </FormItem>
        </i-col>
        <i-col :sm="6">
          <div style="text-align:right">
            <Button @click="handleSearch" type="primary">分析</Button>
          </div>
        </i-col>
      </Row>
    </Form>
  </div>
</template>
<script>
import ConditionsFormMixin from '@/mixins/conditions-form'
import JueSuanYearsSelect from '@/views/bss/analysis/components/jue-suan-years-select'
import AreaSelect from '@/views/bss/analysis/components/area-select'
import BudgetMakeLevelSelect from '@/views/bss/analysis/components/budget-make-level-select'
import JueSuanBudgetTypeSelect from '@/views/bss/analysis/components/jue-suan-budget-type-select'
import JueSuanIndicatorRangeSelect from '@/views/bss/analysis/components/jue-suan-indicator-range-select'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    areaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [ConditionsFormMixin],
  components: {
    JueSuanYearsSelect,
    BudgetMakeLevelSelect,
    JueSuanBudgetTypeSelect,
    AreaSelect,
    JueSuanIndicatorRangeSelect
  },
  data() {
    return {}
  },
  created() {
    this.formDatas = Object.assign({}, this.data)
  },
  computed: {
    yearQueryConditions() {
      let param = {
        conditions: [
          { field: 'make_level', value: this.formDatas.makeLevel },
          { field: 'area_id', value: this.formDatas.areaId },
          { field: 'gov_dept', value: this.formDatas.deptId }
        ]
      }
      return param
    }
  },
  mounted() {},
  methods: {
    getDatas() {
      let _d = Object.assign({}, this.formDatas)
      if (_d.budgetType === '社会保险基金预算') {
        delete _d.indicator
      }
      return _d
    }
  }
}
</script>

<style scoped>
</style>
