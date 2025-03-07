<!-- 折线图 -->
<template>
  <Card shadow>
    <p slot="title" class="analysis-card-title" @click="titleClick">{{ newOptions.title }}</p>
    <Spin v-if="loading" fix large></Spin>
    <div :id="containerId" />
  </Card>
</template>

<script>
import CommonUtil from '@/utils/CommonUtil'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  props: {
    // 查询方法
    queryFunc: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    // 查询参数
    queryParams: {
      type: Object,
      default: () => {}
    },
    // 选项
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      chart: null,
      containerId: '',
      defaultOptions: {
        // 标题
        title: '',
        // chart本身属性：width,height等
        chartProps: {
          height: 500,
          padding: [20, 120, 100, 120]
        },
        legendProps: null,
        adjustProps: null,
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -60
          }
        },
        timeAxisProps: {},
        tooltipProps: {
          crosshairs: {
            type: 'line'
          }
        },
        // 辅助线配置
        guideLineProps: null,
        // 图形颜色列表
        colorList: [],
        // 组合字段（分组字段）
        groupField: 'time',
        // 条目字段（明细字段、图例字段）
        itemField: 'name',
        // 字段映射
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: 'budgetFinalNum'
        },
        // 值单位
        valueUnit: '万元'
      },
      newOptions: {}
    }
  },
  created() {
    this.containerId = `container${CommonUtil.uuid()}`
  },
  mounted() {
    this.newOptions = { ...this.defaultOptions, ...this.options }
    this.queryData()
  },
  beforeDestroy() {
    if (this.chart !== null) {
      this.chart.destroy()
      this.chart = null
    }
  },
  watch: {
    // 监听查询参数
    queryParams: {
      handler(newVal, oldVal) {
        this.queryData()
      },
      deep: true
    },
    options: {
      handler(newVal, oldVal) {
        if (this.chart !== null) {
          this.chart.destroy()
          this.chart = null
        }
        this.newOptions = { ...this.defaultOptions, ...this.options }
        this.queryData()
      },
      deep: true
    }
  },
  methods: {
    async queryData() {
      if (this.$_.isEmpty(this.queryParams)) {
        return
      }
      this.loading = true
      const res = await this.queryFunc(this.queryParams)
      try {
        if (res && res.ok()) {
          if (this.chart !== null) {
            const valueOp = this.newOptions.fieldMap.value
            const ds = new DataSet()
            const dv = ds.createView().source(res.data)
            dv.transform({
              type: 'map',
              callback(row) {
                if (
                  row[valueOp] === null ||
                  row[valueOp] === undefined ||
                  isNaN(row[valueOp])
                ) {
                  row[valueOp] = 0
                }
                return row
              }
            })
            this.chart.changeData(dv)
          } else {
            this.initChart(res.data)
          }
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    initChart(data) {
      const timeOp = this.newOptions.fieldMap.time
      const valueOp = this.newOptions.fieldMap.value
      const valueUnitOp = this.newOptions.valueUnit

      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'map',
        callback(row) {
          if (
            row[valueOp] === null ||
            row[valueOp] === undefined ||
            isNaN(row[valueOp])
          ) {
            row[valueOp] = 0
          }
          return row
        }
      })

      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        ...this.newOptions.chartProps
      })
      this.chart.source(dv, {
        [timeOp]: {
          // 自定义刻度间距
          tickInterval: 1
        }
      })
      this.chart.axis(valueOp, {
        line: {
          lineWidth: 2,
          lineDash: [3, 3]
        },
        label: {
          formatter: (val) => {
            return val + valueUnitOp
          }
        }
      })
      this.chart.axis(timeOp, this.newOptions.timeAxisProps)
      this.chart.legend(this.newOptions.legendProps)
      this.chart.tooltip(this.newOptions.tooltipProps)

      this.chart.guide().line(this.newOptions.guideLineProps)

      this.chart
        .line()
        .position(
          `${this.newOptions.fieldMap[this.newOptions.groupField]}*${valueOp}`
        )
        .color(
          this.newOptions.fieldMap[this.newOptions.itemField],
          this.$_.isEmpty(this.newOptions.colorList)
            ? null
            : this.newOptions.colorList
        )
        .tooltip(
          `${this.newOptions.fieldMap[this.newOptions.itemField]}*${valueOp}`,
          (name, value) => {
            return {
              name: name,
              value: value + valueUnitOp
            }
          }
        )
      this.chart
        .point()
        .position(
          `${this.newOptions.fieldMap[this.newOptions.groupField]}*${valueOp}`
        )
        .color(
          this.newOptions.fieldMap[this.newOptions.itemField],
          this.$_.isEmpty(this.newOptions.colorList)
            ? null
            : this.newOptions.colorList
        )
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
        .label(valueOp, this.newOptions.labelProps)
        .tooltip(
          `${this.newOptions.fieldMap[this.newOptions.itemField]}*${valueOp}`,
          (name, value) => {
            return {
              name: name,
              value: value + valueUnitOp
            }
          }
        )
      this.chart.on('point:click', (ev) => {
        this.$emit('line-point-click', ev.data)
      })
      this.chart.render()
    },
    titleClick() {
      this.$emit('line-title-click')
    }
  }
}
</script>
