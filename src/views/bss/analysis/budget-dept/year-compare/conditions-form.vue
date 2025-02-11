<template>
  <div @keyup.enter="handleSearch">
    <Form ref="searchForm" :model="formDatas" inline :label-width="100">
      <Row type="flex" :gutter="8">
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <FormItem :label="`区县`" style="width:100%;">
            <AreaSelect
              :pid="areaInfo.id"
              v-model="formDatas.area"
              placeholder="区县"
              @on-change="handleAreaChange"
            ></AreaSelect>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <FormItem :label="`部门`" style="width:100%;">
            <Select v-model="formDatas.govDept" transfer clearable filterable placeholder="部门">
              <Option v-for="(item, index) in deptRange" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="8" :md="7" :lg="7">
          <FormItem label="对比年度" style="width:100%;">
            <BudgetDeptYearSelect
              v-model="formDatas.startYear"
              :default-value-index="1"
              placeholder="开始年"
              :conditions="yearQueryConditions"
            ></BudgetDeptYearSelect>
            <BudgetDeptYearSelect
              v-model="formDatas.endYear"
              placeholder="结束年"
              :conditions="yearQueryConditions"
            ></BudgetDeptYearSelect>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="4" :md="3" :lg="3">
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
import BudgetDeptYearSelect from '@/views/bss/analysis/components/budget-dept-year-select'
import AreaSelect from '@/views/bss/analysis/components/area-select'
import AnalysisBudgetDeptS1Api from '@/api/sys/analysis/budget-dept-s1'
export default {
  props: {
    areaInfo: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [ConditionsFormMixin],
  components: {
    BudgetDeptYearSelect,
    AreaSelect
  },
  data() {
    return {
      deptRange: []
    }
  },
  computed: {
    yearQueryConditions() {
      let param = {
        conditions: [
          { field: 'make_level', value: this.formDatas.makeLevel },
          { field: 'area_id', value: this.formDatas.areaId },
          { field: 'gov_dept', value: this.formDatas.govDept }
        ]
      }
      return param
    }
  },
  mounted() {
    this.listDepts()
  },
  methods: {
    async listDepts() {
      this.formDatas.makeLevel = 'deptLv'
      this.formDatas.areaId = this.areaInfo.id
      const params = {
        conditions: [
          { field: 'make_level', value: this.formDatas.makeLevel },
          { field: 'area_id', value: this.formDatas.areaId },
          { field: 'area_name', value: this.formDatas.area }
        ]
      }
      const ret = await AnalysisBudgetDeptS1Api.listDepts(params)
      if (ret.ok()) {
        this.deptRange = ret.data
        if (!this.$_.isEmpty(ret.data)) {
          this.$set(this.formDatas, 'govDept', ret.data[0])
        } else {
          this.$set(this.formDatas, 'govDept', '')
        }
      }
    },
    handleAreaChange(value) {
      this.$set(this.formDatas, 'govDept', '')
      // todo list 查询当前areaId下的部门
      this.listDepts()
    }
  },
  watch: {
    // 区域信息变化后调用
    areaInfo: {
      handler(newVal, oldVal) {
        this.listDepts()
      },
      deep: true
    }
  }
}
</script>
