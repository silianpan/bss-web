<!-- 不同年的支出-经济分类：柱状图 -->
<template>
  <Column :options="options" :queryFunc="queryFunc" :queryParams="queryParams" ref="columnRef" />
</template>

<script>
import Column from '_c/chart/column'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import { indicatorRange } from '../index'
const valueUnit = '万元'
const titlePre = '支出（经济分类）年度对比情况'
export default {
  components: {
    Column
  },
  props: {
    preTitle: {
      type: String,
      default: '支出（经济分类）年度对比情况'
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
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: this.indicator
        },
        title: `${this.preTitle}-${tmp.name}（单位：${valueUnit}）`
      })
    }
  },
  data() {
    return {
      options: {
        title: '',
        chartProps: {
          height: 500,
          padding: [50, 120, 120, 120]
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
    }
  }
}
</script>
