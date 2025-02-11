<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick(3)"
          @label-click="handleClick3"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick(1)"
          @label-click="handleClick1"
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          :options="options1"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick(2)"
          @label-click="handleClick2"
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          :options="options2"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          @title-click="handleTitleClick(3)"
          @label-click="handleClick4"
          :queryFunc="queryFunc"
          :queryParams="queryParams4"
          :options="options4"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet6Detail from '@/views/bss/analysis/budget-dept-final/detail-info/sheet6-detail'
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s6'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '一般公共预算相关经费支出决算（元）',
        foldFields: ['budgetFinal', 'budgetFinalLastYear'],
        foldFieldsRename: {
          budgetFinal: '决算数',
          budgetFinalLastYear: '上一年决算数'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      },
      options1: {
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -30
        },
        title: '一般公共预算相关经费支出决算-“三公”经费支出（元）',
        foldFields: ['budgetFinal', 'budgetFinalLastYear'],
        foldFieldsRename: {
          budgetFinal: '决算数',
          budgetFinalLastYear: '上一年决算数'
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
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center'
        },
        title: '一般公共预算相关经费支出决算-机关运行经费（元）',
        foldFields: ['budgetFinal', 'budgetFinalLastYear'],
        foldFieldsRename: {
          budgetFinal: '决算数',
          budgetFinalLastYear: '上一年决算数'
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
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -50
        },
        title: '一般公共预算相关经费支出决算-国有资产占用情况（元）',
        foldFields: ['budgetFinal', 'budgetFinalLastYear'],
        foldFieldsRename: {
          budgetFinal: '决算数',
          budgetFinalLastYear: '上一年决算数'
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
    queryParams1() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '一、“三公”经费支出（元）'
      })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '二、机关运行经费'
      })
      return { conditions }
    },
    queryParams4() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '三、国有资产占用情况'
      })
      return { conditions }
    },
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'eq_psubject',
        value: 'true'
      })
      return { conditions }
    }
  },
  methods: {
    handleTitleClick(flag) {
      let qp = {}
      if (flag === 1) {
        qp.conditions = Object.assign([], this.queryParams1.conditions)
      } else if (flag === 2) {
        qp.conditions = Object.assign([], this.queryParams2.conditions)
      } else if (flag === 3) {
        qp.conditions = Object.assign([], this.queryParams3.conditions)
      } else {
        qp.conditions = Object.assign([], this.queryParams4.conditions)
      }
      this.handleClick(qp)
    },
    handleClick3(data) {
      let qp = {
        conditions: [
          ...Object.assign([], this.queryParams3.conditions),
          { field: 'subject', value: data.subject }
        ]
      }
      this.handleClick(qp)
    },
    handleClick1(data) {
      let qp = {
        conditions: [
          ...Object.assign([], this.queryParams1.conditions),
          { field: 'subject', value: data.subject }
        ]
      }
      this.handleClick(qp)
    },
    handleClick2(data) {
      let qp = {
        conditions: [
          ...Object.assign([], this.queryParams2.conditions),
          { field: 'subject', value: data.subject }
        ]
      }
      this.handleClick(qp)
    },
    handleClick4(data) {
      let qp = {
        conditions: [
          ...Object.assign([], this.queryParams4.conditions),
          { field: 'subject', value: data.subject }
        ]
      }
      this.handleClick(qp)
    },
    handleClick(qp) {
      let govDept = qp.conditions.filter(item => item.field === 'govDept')[0].value
      let year = qp.conditions.filter(item => item.field === 'year')[0].value
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `${govDept}-一般公共预算相关经费支出详情`,
          width: 80,
          render: h => {
            return <Sheet6Detail queryParams={qp} year={year}></Sheet6Detail>
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
