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
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail :queryFunc="queryFunc" :queryParams="queryParams1" :options="options7" />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/year-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s1'
export default {
  mixins: [IndexCompareMixin],
  computed: {
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    },
    options1() {
      return {
        title: '收入决算（合计）对比（万元）',
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'inTotalNum'
        }
      }
    },
    options2() {
      return {
        title: '收入决算（财政拨款收入）对比（万元）',
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'faApprIn'
        }
      }
    },
    options3() {
      return {
        title: '收入决算（上级补助收入）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'superSubsidyIn'
        }
      }
    },
    options4() {
      return {
        title: '收入决算（事业收入）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'busiIn'
        }
      }
    },
    options5() {
      return {
        title: '收入决算（经营收入）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'magIn'
        }
      }
    },
    options6() {
      return {
        title: '收入决算（附属单位上缴收入）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'unitUpIn'
        }
      }
    },
    options7() {
      return {
        title: '收入决算（其他收入）对比（万元）',
        fieldMap: {
          time: this.groupField,
          name: 'subject',
          value: 'otherIn'
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
