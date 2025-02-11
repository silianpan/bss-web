<!-- 总收入和总支出占比：饼图 -->
<template>
  <Column
    :options="options"
    :queryFunc="queryFunc"
    :queryParams="queryParams"
    ref="pieRef"
    @column-title-click="handleTitleClick"
    @column-label-click="handleClick"
  />
</template>

<script>
import Column from '_c/chart/column'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import BudgetFinalDetail from '@/views/bss/analysis/jue-suan/detail-info/budget-final-detail'
import CommonUtil from '@/utils/CommonUtil'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'

const valueUnit = '万元'
const titlePre = '总收入和总支出占比情况'
export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Column
  },
  data() {
    return {
      options: {
        title: `${titlePre}（单位：${valueUnit}）`,
        chartProps: {
          height: 500,
          padding: [50, 120, 100, 120]
        },
        legendProps: {
          position: 'bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12',
            // fontWeight: 'bold',
            rotate: -60
          }
        },
        adjustProps: [
          {
            type: 'dodge',
            marginRatio: 1 / 32
          }
        ],
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: 'type',
          name: 'name',
          value: 'num'
        }
      }
    }
  },
  methods: {
    async queryFunc() {
      const res = await AnalysisBudgetFinalService.querySumByCon(this.queryParams)
      let inOutList = []
      res.data.forEach(item => {
        inOutList = inOutList.concat([
          {
            type: item.budgetSubject,
            num: item.budgetNum || 0,
            name: '预算数'
          },
          {
            type: item.budgetSubject,
            num: item.budgetAdjustNum || 0,
            name: '预算调整数'
          },
          {
            type: item.budgetSubject,
            num: item.budgetFinalNum || 0,
            name: '决算数'
          }
        ])
      })
      return new Promise(resolve => resolve({
        data: inOutList,
        ok: () => true
      }))
    },
    updateData() {
      this.$refs.pieRef.queryData()
    },
    handleTitleClick() {
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `详情`,
          width: 60,
          maskClosable: true,
          render: h => {
            return (
              <BudgetFinalDetail
                queryParams={qp}
                flag={'querySumByCon'}
              ></BudgetFinalDetail>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      let { type: budgetSubject } = data
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      qc.budget_subject_level = '0'
      if (budgetSubject === '总支出') {
        qc.fundType = '支出'
      } else if (budgetSubject === '总收入') {
        qc.fundType = '收入'
      } else {
        qc.pbudget_subject = budgetSubject
      }
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `详情`,
          width: 60,
          maskClosable: true,
          render: h => {
            return (
              <BudgetFinalDetail
                queryParams={qp}
                selectedData={data}
              ></BudgetFinalDetail>
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
