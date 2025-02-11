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
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options4" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options5" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options6" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/year-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s2'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title: '支出决算（合计）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'outTotalNum'
        }
      }
    },
    options2() {
      return {
        title: '支出决算（基本支出）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'basicOut'
        }
      }
    },
    options3() {
      return {
        title: '支出决算（项目支出）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'projectOut'
        }
      }
    },
    options4() {
      return {
        title: '支出决算（上缴上级支出）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'superUpOut'
        }
      }
    },
    options5() {
      return {
        title: '支出决算（经营支出）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'magOut'
        }
      }
    },
    options6() {
      return {
        title: '支出决算（对附属单位补助支出）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'unitSubsidyOut'
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
