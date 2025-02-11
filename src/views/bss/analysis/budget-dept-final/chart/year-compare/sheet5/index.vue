<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options1" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options2" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options3" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/year-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s5'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title: '一般公共预算财政拨款基本支出决算（合计）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'subtotal'
        }
      }
    },
    options2() {
      return {
        title: '一般公共预算财政拨款基本支出决算（人员经费）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'fundPerson'
        }
      }
    },
    options3() {
      return {
        title: '一般公共预算财政拨款基本支出决算（公用经费）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'fundPublic'
        }
      }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptFinalApi.queryByCon(queryParams)
    }
  }
}
</script>
