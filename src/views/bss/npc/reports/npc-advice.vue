<!-- 本年度代表意见Top10 -->
<template>
  <div id="npcAdvice" ref="npcAdviceRef" style="width:100%; height: 400px;overflow: hidden;position: relative"></div>
</template>

<script>
import G2 from '@antv/g2'
import NpcAdvicesService from '@/api/sys/npc/advices'
export default {
  data() {
    return {
      chart: null,
      npcAdviceData: []
    }
  },
  computed: {
    info() {
      let tmp = ''
      for (let i = 0; i < this.npcAdviceData.length; i++) {
        tmp += '<p>' + (i + 1) + '. ' + this.npcAdviceData[i].deptName + '</p>'
      }
      return tmp
    }
  },
  mounted() {
    this.analysisNpcAdviceByDeptTop10()
  },
  methods: {
    analysisNpcAdviceByDeptTop10() {
      NpcAdvicesService.analysisNpcAdviceByDeptTop10({
        areaId: this.$route.query.areaId
      }).then(res => {
        if (res.ok()) {
          this.npcAdviceData = res.data
          this.initChart(res.data)
        }
      })
    },
    initChart(data) {
      let width = this.$refs.npcAdviceRef.offsetWidth
      let height = this.$refs.npcAdviceRef.offsetHeight
      this.chart = new G2.Chart({
        container: 'npcAdvice',
        forceFit: true,
        padding: [80, 400, 70, 100],
        width,
        height
      })
      this.chart.source(data)
      this.chart.axis('npcAdvicesCount', false)
      this.chart.axis('deptName', {
        // label: {
        //   textStyle: {
        //     fill: '#aaaaaa'
        //   }
        // },
        // tickLine: {
        //   alignWithLabel: false,
        //   length: 0
        // }
      })
      this.chart.tooltip({
        showTitle: false
        // itemTpl: `<li data-index={index}>
        //     <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
        //     {name}：{value}
        //   </li>`
      })
      this.chart.legend({
        position: 'right-center'
        // offsetX: 20,
        // offsetY: 40
      })

      this.chart
        .interval()
        .position('deptName*npcAdvicesCount')
        .opacity(1)
        .color('deptName', [
          '#7bcfa6',
          '#4c8dae',
          '#d9b611',
          '#f9906f',
          '#88ada6',
          '#d2f0f4',
          '#3d3b4f',
          '#519a73',
          '#eacd76'
        ])
        .label('npcAdvicesCount', {
          useHtml: true,
          htmlTemplate: (text, item) => {
            const a = item.point
            return (
              '<span class="g2-label-item"><p class="g2-label-item-value" style="color:#177cb0">' +
              a.npcAdvicesCount +
              '</p></span>'
            )
          }
        })
        .tooltip('deptName*npcAdvicesCount', function (
          deptName,
          npcAdvicesCount
        ) {
          return {
            name: deptName,
            value: npcAdvicesCount + '个'
          }
        })
      this.chart.guide().text({
        position: ['50%', 0],
        offsetY: -60,
        content: '本年度代表意见Top10',
        style: {
          fill: '#177cb0',
          fontSize: '18',
          textAlign: 'center'
        }
      })
      this.chart.guide().html({
        position: ['88%', '20%'],
        offsetX: 300,
        html:
          '<div class="g2-guide-html" style="color:#177cb0">' +
          this.info +
          '</div>'
      })
      this.chart.render()
    }
  }
}
</script>
