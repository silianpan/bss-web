<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick('all')"
          @label-click="handleLabelClickAll"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options1"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick('begin')"
          @label-click="handleLabelClickBegin"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options2"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick('in')"
          @label-click="handleLabelClickIn"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options3"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick('out')"
          @label-click="handleLabelClickOut"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options4"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick('end')"
          @label-click="handleLabelClickEnd"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options5"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet4Detail from '@/views/bss/analysis/budget-dept-final/detail-info/sheet4-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s4'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options1: {
        title: '一般公共预算财政拨款支出决算（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['budgetBegin', 'budgetIn', 'budgetOut', 'budgetEnd'],
        foldFieldsRename: {
          budgetBegin: '年初结转和结余',
          budgetIn: '本年收入',
          budgetOut: '本年支出',
          budgetEnd: '年末结转和结余'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      },
      options2: {
        title: '一般公共预算财政拨款支出决算-年初结转和结余（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['budgetBegin', 'budgetBeginBase', 'budgetBeginProject'],
        foldFieldsRename: {
          budgetBegin: '合计',
          budgetBeginBase: '基本支出结转和结余',
          budgetBeginProject: '项目支出结转和结余'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      },
      options3: {
        title: '一般公共预算财政拨款支出决算-本年收入（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['budgetIn', 'budgetInBase', 'budgetInProject'],
        foldFieldsRename: {
          budgetIn: '合计',
          budgetInBase: '基本支出',
          budgetInProject: '项目支出'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      },
      options4: {
        title: '一般公共预算财政拨款支出决算-本年支出（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['budgetOut', 'budgetOutBase', 'budgetOutProject'],
        foldFieldsRename: {
          budgetOut: '合计',
          budgetOutBase: '基本支出',
          budgetOutProject: '项目支出'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      },
      options5: {
        title: '一般公共预算财政拨款支出决算-年末结转和结余（万元）',
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['budgetEnd', 'budgetEndBase', 'budgetEndProject'],
        foldFieldsRename: {
          budgetEnd: '合计',
          budgetEndBase: '基本支出结转和结余',
          budgetEndProject: '项目支出结转和结余'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      }
    }
  },
  computed: {
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    }
  },
  methods: {
    handleTitleClick(flag) {
      let qc = CommonUtil.convertToQc(this.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      this.handleClick(qp, flag)
    },
    handleLabelClickAll(data) {
      this.handleLabelClick(data, 'all')
    },
    handleLabelClickBegin(data) {
      this.handleLabelClick(data, 'begin')
    },
    handleLabelClickIn(data) {
      this.handleLabelClick(data, 'in')
    },
    handleLabelClickOut(data) {
      this.handleLabelClick(data, 'out')
    },
    handleLabelClickEnd(data) {
      this.handleLabelClick(data, 'end')
    },
    handleLabelClick(data, flag) {
      let qc = CommonUtil.convertToQc(this.conditions)
      let qp = {
        conditions: [
          ...CommonUtil.convertToC(qc),
          { field: 'subject', value: data.subject }
        ]
      }
      this.handleClick(qp, flag)
    },
    handleClick(qp, flag) {
      let govDept = qp.conditions.filter(item => item.field === 'govDept')[0].value
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `${govDept}-一般公共预算财政拨款支出详情`,
          width: 80,
          render: h => {
            return <Sheet4Detail queryParams={qp} flag={flag}></Sheet4Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptFinalApi.queryByCon(queryParams)
    }
  }
}
</script>
