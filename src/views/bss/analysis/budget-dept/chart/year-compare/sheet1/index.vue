<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 本年收入、本年支出、上年结转、结转下年占比趋势：折线图 -->
        <Summary :queryFunc="queryFunc" :queryParams="queryParams1" :options="options1" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 本年收入、本年支出、上年结转、结转下年年度对比：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams2" :options="options2" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出（一般公共预算财政拨款）年度对比：折线图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams3" :options="options3" />
        <!-- <Summary :queryFunc="queryFunc" :queryParams="queryParams3" :options="options3" /> -->
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出（政府性基金预算财政拨款）年度对比：折线图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams3" :options="options4" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from './index-compare-mixin'
import AnalysisBudgetDeptS1Api from '@/api/sys/analysis/budget-dept-s1'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'subjects',
        value: ['一、本年收入', '一、本年支出', '二、上年结转', '二、结转下年']
      })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      conditions = [...conditions, { field: 'fund_type', value: '支出' }]
      return { conditions }
    },
    options1() {
      return {
        title: '本年收入、本年支出、上年结转、结转下年占比趋势（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetNum'
        }
      }
    },
    options2() {
      return {
        title: '本年收入、本年支出、上年结转、结转下年对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetNum'
        }
      }
    },
    options3() {
      return {
        title: '支出（一般公共预算财政拨款）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'faGeneral'
        }
      }
    },
    options4() {
      return {
        title: '支出（政府性基金预算财政拨款）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'faGovFund'
        }
      }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS1Api.queryByCon(queryParams)
    }
  }
}
</script>
