<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算支出（合计）年度对比：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options1" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算支出（基本支出）年度对比：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options2" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算支出（项目支出）年度对比：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options3" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS2Api from '@/api/sys/analysis/budget-dept-s2'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title: '一般公共预算支出（合计）对比（万元）',
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
        title: '一般公共预算支出（基本支出）对比',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'outBase'
        }
      }
    },
    options3() {
      return {
        title: '一般公共预算支出（项目支出）对比',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'outProject'
        }
      }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS2Api.queryByCon(queryParams)
    }
  }
}
</script>
