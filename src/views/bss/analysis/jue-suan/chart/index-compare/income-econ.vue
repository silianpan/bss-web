<!-- 支出-经济分类：柱状图 -->
<template>
  <Column :options="options" :queryFunc="queryFunc" :queryParams="queryParams" ref="columnRef" @column-title-click="handleTitleClick" @column-label-click="handleClick" />
</template>

<script>
import Column from '_c/chart/column'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import CommonUtil from '@/utils/CommonUtil'
import BudgetFinalDetail from '@/views/bss/analysis/jue-suan/detail-info/budget-final-detail'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import { indicatorRange } from '../index'
const valueUnit = '万元'
const titlePre = '收入（经济分类）分布情况'
export default {
  components: {
    Column
  },
  props: {
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
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: this.indicator
        },
        title: `${titlePre}-${tmp.name}（单位：${valueUnit}）`
      })
    }
  },
  data() {
    return {
      options: {
        title: `${titlePre}-决算数（单位：${valueUnit}）`,
        chartProps: {
          height: 500,
          padding: [50, 120, 100, 120]
        },
        legendProps: {
          offsetY: -1,
          position: 'top'
        },
        labelProps: {
          // useHtml: true,
          // htmlTemplate: function htmlTemplate(text, item) {
          //   return (
          //     '<span class="g2-label-item"><p class="g2-label-item-value">' +
          //     item.point.budgetFinalNum +
          //     '</p></span>'
          //   )
          // }
          offset: 10,
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -30
          }
        },
        itemField: 'name',
        colorList: [
          '#ff786b',
          '#0fdd7e',
          '#bc9dfb',
          '#ff2e6a',
          '#7effa2',
          '#e57ec0',
          '#2c818f',
          '#ff7730'
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
          `${titlePre}-${tmp.name}（单位：${valueUnit}）`
        )
      }
    }
  },
  methods: {
    async queryFunc() {
      return AnalysisBudgetFinalService.queryByCon(this.queryParams)
    },
    updateData() {
      this.$refs.barRef.queryData()
    },
    handleTitleClick() {
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }
      let drawer = DynamicDrawerUtil.newInstance({
        title: `详情`,
        width: 60,
        maskClosable: true,
        render: (h) => {
          return (
            <BudgetFinalDetail queryParams={ qp } indicator={ this.indicator } flag={'queryByCon'}></BudgetFinalDetail>
          )
        }
      }, this)
      drawer.show()
    },
    handleClick(data) {
      let { budgetSubject } = data
      let qc = CommonUtil.convertToQc(this.queryParams.conditions)
      delete qc.budget_subject_level
      qc.pbudget_subject = budgetSubject
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
                indicator={this.indicator}
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
