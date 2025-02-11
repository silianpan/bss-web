<!-- 结构分析 -->
<template>
  <div>
    <Form ref="formInline" :model="selectInfo" inline>
      <FormItem prop="password">
        <Select v-model="selectInfo.selectYear" transfer filterable placeholder="年度" style="width:200px">
          <Option v-for="(item, index) in yearRange" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="user">
        <span>{{ areaInfo.name }}</span>
      </FormItem>
      <FormItem>
        <Select v-model="selectInfo.selectArea" transfer clearable filterable placeholder="区县" style="width:300px">
          <Option v-for="item in areaRange" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <!-- 判断是否存在部门 -->
      <FormItem v-if="query.level === 'deptLv'">
        <Select v-model="selectInfo.selectDept" transfer clearable filterable placeholder="部门" style="width:300px">
          <Option v-for="item in deptRange" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Select v-model="selectInfo.selectIndicator" transfer clearable filterable placeholder="指标" style="width:200px">
          <Option v-for="item in indicatorRange" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem>
        <Button type="primary" @click="queryOkClick">确定</Button>
      </FormItem> -->
    </Form>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 总收入和总支出占比：饼图 -->
        <IncomeOutgo :queryParams="queryParams1" :indicator="selectInfo.selectIndicator" ref="IncomeOutgoRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 税收收入和非税收入占比：饼图 -->
        <IncomeTaxAndNot :queryParams="queryParams2" :indicator="selectInfo.selectIndicator" ref="IncomeTaxAndNotRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 税收收入：条形图 -->
        <IncomeTax :queryParams="queryParams3" :indicator="selectInfo.selectIndicator" ref="IncomeTaxRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 非税收入：条形图 -->
        <IncomeTaxNot :queryParams="queryParams4" :indicator="selectInfo.selectIndicator" ref="IncomeTaxNotRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出-功能分类：柱状图 -->
        <OutgoFunc :queryParams="queryParams5" :indicator="selectInfo.selectIndicator" ref="OutgoFuncRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出-经济分类：柱状图 -->
        <OutgoEcon :queryParams="queryParams6" :indicator="selectInfo.selectIndicator" ref="OutgoEconRef" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import AreaService from '@/api/sys/area/index'
import GovDeptService from '@/api/sys/gov-dept/index'
import IncomeOutgo from '@/views/bss/analysis/jue-suan/chart/index-compare/income-outgo'
import IncomeTaxAndNot from '@/views/bss/analysis/jue-suan/chart/index-compare/income-tax-and-not'
import IncomeTax from '@/views/bss/analysis/jue-suan/chart/index-compare/income-tax'
import IncomeTaxNot from '@/views/bss/analysis/jue-suan/chart/index-compare/income-tax-not'
import OutgoFunc from '@/views/bss/analysis/jue-suan/chart/index-compare/outgo-func'
import OutgoEcon from '@/views/bss/analysis/jue-suan/chart/index-compare/outgo-econ'
import { indicatorRange } from '@/views/bss/analysis/jue-suan/chart/index'
export default {
  components: {
    IncomeOutgo,
    IncomeTaxAndNot,
    IncomeTax,
    IncomeTaxNot,
    OutgoFunc,
    OutgoEcon
  },
  props: {
    query: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    query: 'initYearTree'
  },
  computed: {
    queryParams() {
      return [
        { field: 'area', value: this.$_.isEmpty(this.selectInfo.selectArea) ? this.areaInfo.name : this.selectInfo.selectArea },
        { field: 'year', value: this.selectInfo.selectYear },
        { field: 'make_level', value: this.query.level },
        { field: 'gov_dept', value: this.selectInfo.selectDept }
      ]
    },
    isQueryParamsEmpty() {
      for (const item of this.queryParams) {
        if (item.value === undefined || item.value === null) {
          return true
        }
      }
      return false
    },
    queryParams1() {
      return this.isQueryParamsEmpty ? {} : { conditions: [ ...this.queryParams, { field: 'only_total', value: 'true' } ] }
    },
    queryParams2() {
      return this.isQueryParamsEmpty ? {} : { conditions: [ ...this.queryParams, { field: 'only_tax', value: 'true' } ] }
    },
    queryParams3() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '1' },
          { field: 'fund_type', value: '收入' },
          { field: 'pbudget_subject', value: '税收收入' }
        ]
      }
    },
    queryParams4() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '1' },
          { field: 'fund_type', value: '收入' },
          { field: 'pbudget_subject', value: '非税收入' }
        ]
      }
    },
    queryParams5() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '0' },
          { field: 'fund_type', value: '支出' }
        ]
      }
    },
    queryParams6() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '0' },
          { field: 'fund_type', value: '支出-经济分类' }
        ]
      }
    }
  },
  data() {
    return {
      indicatorRange,
      yearRange: [],
      areaRange: [],
      deptRange: [],
      areaInfo: {},
      selectInfo: {
        selectYear: '',
        selectArea: '',
        selectDept: '',
        selectIndicator: 'budgetFinalNum'
      }
    }
  },
  mounted() {
    this.initYearTree()
    this.initAreaTree()
    this.initDeptTree()
  },
  methods: {
    queryOkClick() {
      this.$refs.IncomeOutgoRef.updateData()
      this.$refs.IncomeTaxAndNotRef.updateData()
      this.$refs.IncomeTaxRef.updateData()
      this.$refs.IncomeTaxNotRef.updateData()
      this.$refs.OutgoFuncRef.updateData()
      this.$refs.OutgoEconRef.updateData()
    },
    async initYearTree() {
      let param = {
        conditions: [
          { field: 'make_level', value: this.query.level },
          { field: 'area_id', value: this.query.areaId },
          { field: 'gov_dept', value: this.selectInfo.selectDept }
        ]
      }
      let res = await AnalysisBudgetFinalService.listYears(param)
      if (res.ok()) {
        this.yearRange = res.data
        if (!this.$_.isEmpty(res.data)) {
          this.selectInfo.selectYear = res.data[0]
        } else {
          this.selectInfo.selectYear = ''
        }
      }
    },
    async initAreaInfo() {
      let res = await AreaService.findById(this.query.areaId)
      if (res.ok()) {
        this.areaInfo = res.data
      }
    },
    async initAreaTree() {
      await this.initAreaInfo()
      let res = await AreaService.getAreaChildren(this.query.areaId)
      if (res.ok()) {
        this.areaRange = res.data
      }
    },
    async initDeptTree(areaId) {
      if (this.$_.isNil(areaId)) {
        areaId = this.query.areaId
      }
      let res = await GovDeptService.getTopDeptByArea(areaId)
      if (res.ok()) {
        let govDept = []
        if (!this.$_.isEmpty(res.data)) {
          res.data.forEach(pDept => {
            govDept.push({
              name: pDept.name
            })
            if (!this.$_.isEmpty(pDept.children)) {
              pDept.children.forEach(chDept => {
                govDept.push({
                  name: chDept.name
                })
              })
            }
          })
        }
        this.deptRange = govDept
      }
    }
  }
}
</script>
