<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams4"
          :options="{title:'本年收入明细（万元）', ...option100}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams5"
          :options="{title:'本年支出明细（万元）', ...option100}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams6"
          :options="{title:'年初财政拨款结转和结余明细（万元）', ...option100}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams7"
          :options="{title:'年末财政拨款结转和结余明细（万元）', ...option100}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo1Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          :options="{title:'收入总计、支出总计占比-年初预算数（万元）', ...option1}"
          ref="IncomeOutgoRef"
        />
      </i-col>
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo2Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余占比-年初预算数（万元）', ...option2}"
          ref="IncomeOutgoRef2"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams3"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余情况-年初预算数（万元）', ...option3}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo1Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          :options="{title:'收入总计、支出总计占比-调整预算数（万元）', ...option4}"
          ref="IncomeOutgoRef"
        />
      </i-col>
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo2Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余占比-调整预算数（万元）', ...option5}"
          ref="IncomeOutgoRef2"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams3"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余情况-调整预算数（万元）', ...option6}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo1Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          :options="{title:'收入总计、支出总计占比-决算数（万元）', ...option7}"
          ref="IncomeOutgoRef"
        />
      </i-col>
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo2Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余占比-决算数（万元）', ...option8}"
          ref="IncomeOutgoRef2"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams3"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余情况-决算数（万元）', ...option9}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo1Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams1"
          :options="{title:'收入总计、支出总计占比-上年决算数（万元）', ...option10}"
          ref="IncomeOutgoRef"
        />
      </i-col>
      <i-col :md="24" :lg="12">
        <IncomeOutgo
          @label-click="handleIncomeOutgo2Click"
          :queryFunc="queryFunc"
          :queryParams="queryParams2"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余占比-上年决算数（万元）', ...option11}"
          ref="IncomeOutgoRef2"
        />
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <FaDetail
          :queryFunc="queryFunc"
          @label-click="handleIncomeOutgo2Click"
          :queryParams="queryParams3"
          :options="{title:'本年收入合计、本年支出合计、年初、年末财政拨款结转和结余情况-上年决算数（万元）', ...option12}"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/index-compare-mixin'
import AnalysisBudgetDeptFinalApi from '@/api/sys/analysis/budget-dept-final-s3'
import Sheet6Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet6-detail'
import CommonUtil from '@/utils/CommonUtil'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      option1: {
        fieldMap: {
          time: 'year',
          name: 'fundType',
          value: 'budgetBegin'
        }
      },
      option2: {
        fieldMap: {
          time: 'year',
          name: 'subject',
          value: 'budgetBegin'
        }
      },
      option3: {
        fieldMap: {
          time: 'psubject',
          name: 'subject',
          value: 'budgetBegin'
        }
      },
      option4: {
        fieldMap: {
          time: 'year',
          name: 'fundType',
          value: 'budgetAdjust'
        }
      },
      option5: {
        fieldMap: {
          time: 'year',
          name: 'subject',
          value: 'budgetAdjust'
        }
      },
      option6: {
        fieldMap: {
          time: 'psubject',
          name: 'subject',
          value: 'budgetAdjust'
        }
      },
      option7: {
        fieldMap: {
          time: 'year',
          name: 'fundType',
          value: 'budgetFinal'
        }
      },
      option8: {
        fieldMap: {
          time: 'year',
          name: 'subject',
          value: 'budgetFinal'
        }
      },
      option9: {
        fieldMap: {
          time: 'psubject',
          name: 'subject',
          value: 'budgetFinal'
        }
      },
      option10: {
        fieldMap: {
          time: 'year',
          name: 'fundType',
          value: 'budgetFinalLastYear'
        }
      },
      option11: {
        fieldMap: {
          time: 'year',
          name: 'subject',
          value: 'budgetFinalLastYear'
        }
      },
      option12: {
        fieldMap: {
          time: 'psubject',
          name: 'subject',
          value: 'budgetFinalLastYear'
        }
      },
      option100: {
        chartProps: {
          padding: [10, 130, 100, 80]
        },
        legendProps: {
          position: 'bottom-center',
          offsetY: -40
        },
        foldFields: ['budgetBegin', 'budgetAdjust', 'budgetFinal', 'budgetFinalLastYear'],
        foldFieldsRename: {
          budgetBegin: '年初预算数',
          budgetAdjust: '调整预算数',
          budgetFinal: '决算数',
          budgetFinalLastYear: '上年决算数'
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
      conditions.push({ field: 'subjects', value: ['总计'] })
      return { conditions }
    },
    queryParams2() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'subjects',
        value: ['本年收入合计', '本年支出合计', '年初财政拨款结转和结余', '年末财政拨款结转和结余']
      })
      return { conditions }
    },
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'not_subjects',
        value: ['总计']
      })
      return { conditions }
    },
    queryParams4() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '本年收入'
      })
      return { conditions }
    },
    queryParams5() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '本年支出'
      })
      return { conditions }
    },
    queryParams6() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '年初财政拨款结转和结余'
      })
      return { conditions }
    },
    queryParams7() {
      let conditions = Object.assign([], this.conditions || [])
      conditions.push({
        field: 'psubject',
        value: '年末财政拨款结转和结余'
      })
      return { conditions }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptFinalApi.queryByCon(queryParams)
    },
    async handleIncomeOutgo1Click(data) {
      let { fundType } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.fundType = fundType
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet6Detail queryParams={qp} type={fundType}></Sheet6Detail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleIncomeOutgo2Click(data) {
      let { fundType, psubject } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      qc.fundType = fundType
      qc.psubject = psubject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return (
              <Sheet6Detail queryParams={qp} type={fundType}></Sheet6Detail>
            )
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>
