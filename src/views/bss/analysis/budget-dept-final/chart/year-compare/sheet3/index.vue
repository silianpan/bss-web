<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <Summary :queryFunc="queryFunc" :queryParams="queryParams1" :options="options1" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams2" :options="options2" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <Summary :queryFunc="queryFunc" :queryParams="queryParams1" :options="options3" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams2" :options="options4" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <Summary :queryFunc="queryFunc" :queryParams="queryParams1" :options="options5" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams2" :options="options6" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <Summary :queryFunc="queryFunc" :queryParams="queryParams1" :options="options7" />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams2" :options="options8" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/year-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s3'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'subjects',
        value: ['本年收入合计', '本年支出合计', '年初财政拨款结转和结余', '年末财政拨款结转和结余']
      })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（年初预算数）占比趋势（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetBegin'
        }
      }
    },
    options2() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（年初预算数）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetBegin'
        }
      }
    },
    options3() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（调整预算数）占比趋势（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetAdjust'
        }
      }
    },
    options4() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（调整预算数）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetAdjust'
        }
      }
    },
    options5() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（决算数）占比趋势（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetFinal'
        }
      }
    },
    options6() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（决算数）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetFinal'
        }
      }
    },
    options7() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（上年决算数）占比趋势（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetFinalLastYear'
        }
      }
    },
    options8() {
      return {
        title:
          '本年收入、本年支出、年初、年末财政拨款结转和结余（上年决算数）对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'budgetFinalLastYear'
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
