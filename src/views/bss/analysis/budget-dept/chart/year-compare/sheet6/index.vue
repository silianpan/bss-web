<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 本年收入合计、本年支出合计、上年结转、结转下年占比趋势（万元）：折线图 -->
        <Summary :queryFunc="queryFunc" :queryParams="queryParams1" :options="options1" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 本年收入合计、本年支出合计、上年结转、结转下年年度对比（万元）：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams2" :options="options2" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS6Api from '@/api/sys/analysis/budget-dept-s6'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'subjects',
        value: ['本年收入合计', '本年支出合计', '上年结转', '结转下年', '收入总计', '支出总计']
      })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title: '本年收入合计、本年支出合计、上年结转、结转下年占比趋势（万元）',
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
        title: '本年收入合计、本年支出合计、上年结转、结转下年对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetNum'
        }
      }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS6Api.queryByCon(queryParams)
    }
  }
}
</script>
