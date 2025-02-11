<!-- 占比趋势分析 -->
<template>
  <div>
    <Form ref="formInline" :model="selectInfo" inline>
      <FormItem prop="password">
        <Select v-model="selectInfo.startYear" transfer filterable placeholder="开始年" style="width:200px">
          <Option v-for="(item, index) in yearRange" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="password">
        <Select v-model="selectInfo.endYear" transfer filterable placeholder="结束年" style="width:200px">
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
    <Row :gutter="20" style="margin-bottom: 20px;" v-if="isShowSummaryChart">
      <i-col :md="24" :lg="24">
        <!-- 不同年的汇总：折线图 -->
        <Summary :queryParams="queryParams1" :indicator="selectInfo.selectIndicator" ref="SummaryRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 不同年的税收收入：条形图 -->
        <IncomeTax :queryParams="queryParams2" :indicator="selectInfo.selectIndicator" ref="IncomeTaxRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 不同年的税收收入（以年为维度）：条形图 -->
        <IncomeTaxYear :queryParams="queryParams2" :indicator="selectInfo.selectIndicator" ref="IncomeTaxYearRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <!-- 不同年的非税收收入：条形图 -->
        <IncomeTaxNot :queryParams="queryParams3" :indicator="selectInfo.selectIndicator" ref="IncomeTaxNotRef" />
      </i-col>
      <i-col :md="24" :lg="12">
        <!-- 不同年的非税收收入（以年为维度）：条形图 -->
        <IncomeTaxNotYear :queryParams="queryParams3" :indicator="selectInfo.selectIndicator" ref="IncomeTaxNotYearRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 不同年的支出-功能分类：柱状图 -->
        <OutgoFunc :queryParams="queryParams4" :indicator="selectInfo.selectIndicator" ref="OutgoFuncRef" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 不同年的支出-经济分类：柱状图 -->
        <OutgoEcon :queryParams="queryParams5" :indicator="selectInfo.selectIndicator" ref="OutgoEconRef" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import AreaService from '@/api/sys/area/index'
import GovDeptService from '@/api/sys/gov-dept/index'
import Summary from '@/views/bss/analysis/jue-suan/chart/year-compare/summary'
import IncomeTax from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax'
import IncomeTaxYear from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax-year'
import IncomeTaxNot from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax-not'
import IncomeTaxNotYear from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax-not-year'
import OutgoFunc from '@/views/bss/analysis/jue-suan/chart/year-compare/outgo-func'
import OutgoEcon from '@/views/bss/analysis/jue-suan/chart/year-compare/outgo-econ'
import { indicatorRange } from '@/views/bss/analysis/jue-suan/chart/index'
export default {
  props: {
    query: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    Summary,
    IncomeTax,
    IncomeTaxYear,
    IncomeTaxNot,
    IncomeTaxNotYear,
    OutgoFunc,
    OutgoEcon
  },
  data() {
    return {
      indicatorRange,
      isShowSummaryChart: false,
      yearRange: [],
      areaRange: [],
      deptRange: [],
      areaInfo: {},
      selectInfo: {
        startYear: '',
        endYear: '',
        selectArea: '',
        selectDept: '',
        selectIndicator: 'budgetFinalNum'
      }
    }
  },
  watch: {
    query: 'initYearTree'
  },
  computed: {
    queryParams() {
      return [
        { field: 'area', value: this.$_.isEmpty(this.selectInfo.selectArea) ? this.areaInfo.name : this.selectInfo.selectArea },
        { field: 'start_year', value: this.selectInfo.startYear },
        { field: 'end_year', value: this.selectInfo.endYear },
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
      return this.isQueryParamsEmpty ? {} : { conditions: [ ...this.queryParams, { field: 'only_total', value: 'true' }, { field: 'only_tax', value: 'true' } ] }
    },
    queryParams2() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '1' },
          { field: 'fund_type', value: '收入' },
          { field: 'pbudget_subject', value: '税收收入' }
        ]
      }
    },
    queryParams3() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '1' },
          { field: 'fund_type', value: '收入' },
          { field: 'pbudget_subject', value: '非税收入' }
        ]
      }
    },
    queryParams4() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '0' },
          { field: 'fund_type', value: '支出' }
        ]
      }
    },
    queryParams5() {
      return this.isQueryParamsEmpty ? {} : {
        conditions: [
          ...this.queryParams,
          { field: 'budget_subject_level', value: '0' },
          { field: 'fund_type', value: '支出-经济分类' }
        ]
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
      this.$refs.SummaryRef.updateData()
      this.$refs.IncomeTaxRef.updateData()
      this.$refs.IncomeTaxYearRef.updateData()
      this.$refs.IncomeTaxNotRef.updateData()
      this.$refs.IncomeTaxNotYearRef.updateData()
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
          this.selectInfo.startYear = res.data[res.data.length - 1]
          this.selectInfo.endYear = res.data[0]
          // 是否显示折线图
          if (this.yearRange.length > 1) {
            this.isShowSummaryChart = true
          } else {
            this.isShowSummaryChart = false
          }
        } else {
          this.selectInfo.startYear = ''
          this.selectInfo.endYear = ''
          // 是否显示折线图
          this.isShowSummaryChart = false
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
