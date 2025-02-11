<!-- 不同年的非税收收入（以年为维度）：条形图 -->
<template>
  <Bar :options="options" :queryFunc="queryFunc" :queryParams="queryParams" ref="barRef" />
</template>

<script>
import Bar from '_c/chart/bar'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import { indicatorRange } from '../index'
const valueUnit = '万元'
const titlePre = '非税收入年度总项对比情况'
export default {
  components: {
    Bar
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
          height: 800,
          padding: [10, 140, 80, 60]
        },
        legendProps: {
          position: 'right-bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        adjustProps: [
          {
            type: 'dodge',
            marginRatio: 0.3
          }
        ],
        labelProps: {
          offset: 10,
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -30
          }
        },
        groupField: 'time',
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
    }
  }
}
</script>
