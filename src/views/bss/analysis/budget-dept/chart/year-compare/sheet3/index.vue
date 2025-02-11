<template>
  <div>
    <!-- 图表 -->
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算基本支出（合计）年度对比（万元）柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options1" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算基本支出（人员经费）年度对比（万元）：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options2" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算基本支出（公用经费）年度对比（万元）：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options3" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 一般公共预算基本支出（对个人和家庭补助）年度对比（万元）：柱状图 -->
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options4" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS3Api from '@/api/sys/analysis/budget-dept-s3'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title: '一般公共预算基本支出（合计）对比（万元）',
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
        title: '一般公共预算基本支出（人员经费）对比（万元）',
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
        title: '一般公共预算基本支出（公用经费）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'fundPublic'
        }
      }
    },
    options4() {
      return {
        title: '一般公共预算基本支出（对个人和家庭补助）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'fundSubsidy'
        }
      }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS3Api.queryByCon(queryParams)
    }
  }
}
</script>
