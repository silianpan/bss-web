<!-- 饼图 -->
<template>
  <Card shadow>
    <Spin v-if="loading" fix large></Spin>
    <p slot="title" class="analysis-card-title" @click="titleClick">{{ newOptions.title }}</p>
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
          height: 400
        },
        tooltipProps: {
          showTitle: false
        },
        // 图形半径
        radius: 0.7,
        // 图形颜色列表
        colorList: [],
        // 字段映射
        fieldMap: {
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
      if (res && res.ok()) {
        if (this.chart !== null) {
          const nameOp = this.newOptions.fieldMap.name
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
          }).transform({
            type: 'percent',
            field: valueOp,
            dimension: nameOp,
            as: 'percent'
          })
          this.chart.changeData(dv)
        } else {
          this.initChart(res.data)
        }
      }
      this.loading = false
    },
    initChart(data) {
      const nameOp = this.newOptions.fieldMap.name
      const valueOp = this.newOptions.fieldMap.value
      // const percentOp = this.newOptions.fieldMap.percent
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
      }).transform({
        type: 'percent',
        field: valueOp,
        dimension: nameOp,
        as: 'percent'
      })

      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        ...this.newOptions.chartProps
      })
      this.chart.source(dv)
      this.chart.coord('theta', {
        radius: this.newOptions.radius
      })
      this.chart.tooltip(this.newOptions.tooltipProps)
      this.chart
        .intervalStack()
        .position('percent')
        .color(
          nameOp,
          this.$_.isEmpty(this.newOptions.colorList)
            ? null
            : this.newOptions.colorList
        )
        .opacity(1)
        .label('percent', (val, item) => {
          // const offset = -10
          const percent = (val * 100).toFixed(2) + '%'
          return {
            // offset,
            formatter: (val, item) => {
              return (
                item.point[nameOp] +
                '\n' +
                item.point[valueOp] +
                valueUnitOp +
                '(' +
                percent +
                ')'
              )
            },
            textStyle: {
              fontSize: 14
              // fill: '#ffec3b'
            }
          }
        })
        .tooltip(`${nameOp}*${valueOp}*percent`, (name, value, percent) => {
          percent = (percent * 100).toFixed(2) + '%'
          return {
            name: name,
            value: value + valueUnitOp + '(' + percent + ')'
          }
        })
      this.chart.on('label:click', (ev) => {
        this.$emit('pie-label-click', ev.data)
      })
      this.chart.render()
      this.$nextTick(() => {
        this.chart.forceFit()
      })
    },
    titleClick() {
      this.$emit('pie-title-click')
    }
  }
}
</script>
