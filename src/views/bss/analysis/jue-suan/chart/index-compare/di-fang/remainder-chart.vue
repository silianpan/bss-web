<!-- 不同年的支出-功能分类：柱状图 -->
<template>
  <Column
    :options="options"
    @column-label-click="handleClick"
    :queryFunc="queryFunc"
    :queryParams="queryParams"
    ref="columnRef"
  />
</template>

<script>
import Column from '_c/chart/column'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import { indicatorRange } from '@/views/bss/analysis/jue-suan/chart/index'
import BudgetFinalDetail from '@/views/bss/analysis/jue-suan/detail-info/budget-final-detail'
import CommonUtil from '@/utils/CommonUtil'
const valueUnit = '万元'
export default {
  components: {
    Column
  },
  props: {
    title: {
      type: String,
      default: () => '地方政府债务剩余情况'
    },
    queryParams: {
      type: Object,
      default: () => {}
    },
    // 指标
    indicator: {
      type: String,
      default: ''
    }
  },
  created() {
    const tmp = indicatorRange.find(item => item.value === this.indicator) || {}
    if (tmp) {
      this.options = Object.assign({}, this.options, {
        title: `${this.title}-${tmp.name}（单位：${valueUnit}）`
      })
    }
  },
  data() {
    return {
      options: {
        title: '',
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
        ]
      }
    }
  },
  watch: {
    indicator(newVal, oldVal) {
      if (newVal) {
        this.$set(this.options, 'fieldMap', {
          time: 'year',
          name: 'budgetSubject',
          value: newVal
        })
        const tmp = indicatorRange.filter(item => item.value === newVal)[0]
        this.$set(
          this.options,
          'title',
          `${this.title}-${tmp.name}（单位：${valueUnit}）`
        )
      }
    }
  },
  methods: {
    async handleClick(data) {
      let { budgetSubject } = data
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      qc.pbudgetSubject = budgetSubject
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = this.$dynamicDrawer.newInstance(
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
    },
    async queryFunc() {
      return AnalysisBudgetFinalService.queryByCon(this.queryParams)
    }
  }
}
</script>
