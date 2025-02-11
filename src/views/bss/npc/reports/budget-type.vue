<!-- 预算类型汇总 -->
<template>
  <div id="budgetType" ref="budgetTypeRef" style="width:100%; height: 400px;overflow: hidden;position: relative"></div>
</template>

<script>
import G2 from '@antv/g2'
import GovBudgetService from '@/api/sys/budget/gov-budget'
import { typeToName } from '@/views/bss/budget/type-to-name'
export default {
  data() {
    return {
      chart: null,
      typeData: [],
      typeInitDataMap: {
        making: 0,
        adjustment: 0,
        execution: 0,
        'final-account-making': 0
      }
    }
  },
  computed: {
    typeDataMapCompute() {
      let tmp = { ...this.typeInitDataMap }
      this.typeData.forEach(item => {
        tmp[item.type] += item.budgetCount
      })
      return tmp
    },
    typeDataCompute() {
      let ret = []
      for (const key in this.typeDataMapCompute) {
        ret.push({
          type: typeToName[key],
          budgetCount: this.typeDataMapCompute[key]
        })
      }
      return ret
    },
    info() {
      let tmp = ''
      for (let key in this.typeDataMapCompute) {
        tmp +=
          '<p>' +
          typeToName[key] +
          '报告 ' +
          this.typeDataMapCompute[key] +
          '个</p>'
      }
      return tmp
    }
  },
  mounted() {
    this.analysisBudgetCountByType()
  },
  methods: {
    analysisBudgetCountByType() {
      GovBudgetService.analysisBudgetCountByType({
        areaId: this.$route.query.areaId
      }).then(res => {
        if (res.ok()) {
          this.typeData = res.data
          this.initChart(this.typeDataCompute)
        }
      })
    },
    // updateChartData() {
    //   if (!this._.isNil(this.chart)) {
    //     GovBudgetService.analysisBudgetCountByType().then(res => {
    //       this.chart.changeData(res.data)
    //     })
    //   }
    // },
    initChart(data) {
      let width = this.$refs.budgetTypeRef.offsetWidth
      let height = this.$refs.budgetTypeRef.offsetHeight
      this.chart = new G2.Chart({
        container: 'budgetType',
        forceFit: true,
        padding: [50, 200, 0, 100],
        width,
        height
      })
      this.chart.source(data)
      this.chart.legend({
        position: 'left-top',
        offsetX: 200,
        offsetY: 20,
        textStyle: {
          // fill: '#000',
          // fontSize: 16
        }
      })
      this.chart.coord('theta', {
        radius: 0.75
      })
      this.chart.tooltip({
        showTitle: false,
        itemTpl: `<li data-index={index}>
            <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
            {name}：{value}
          </li>`
        // 'g2-tooltip': {
        //   color: '#fff',
        //   backgroundColor: 'rgba(0, 0, 0, 0.8)',
        //   boxShadow: '0px 0px 2px #000'
        // }
      })

      this.chart
        .intervalStack()
        .position('budgetCount')
        .opacity(1)
        .color('type', ['#7bcfa6', '#4c8dae', '#d9b611', '#f9906f'])
        .label('budgetCount', {
          formatter: function formatter(val, item) {
            return item.point.type + ': ' + val + '个'
          },
          textStyle: {
            fontSize: 14
            // color: '#000'
          }
        })
        .tooltip('type*budgetCount', function (type, budgetCount) {
          return {
            name: type,
            value: budgetCount
          }
        })
      // .style({
      //   lineWidth: 1,
      //   stroke: '#fff'
      // })
      this.chart.guide().text({
        position: ['50%', 0],
        offsetY: -20,
        content: '本年度预决算类型汇总',
        style: {
          fill: '#177cb0',
          fontSize: '18',
          textAlign: 'center'
        }
      })
      this.chart.guide().html({
        position: ['85%', '20%'],
        offsetX: 50,
        html:
          '<div class="g2-guide-html" style="color:#177cb0"><p>本年度已提交：</p>' +
          this.info +
          '</div>'
      })
      this.chart.render()
    }
  }
}
</script>
