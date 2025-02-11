<!-- 本年度代表意见及反馈 -->
<template>
  <div id="npcAdviceFeedback" ref="npcAdviceFeedbackRef" style="width:100%; height: 400px;overflow: hidden;position: relative"></div>
</template>

<script>
import G2 from '@antv/g2'
import { typeToName } from '@/views/bss/budget/type-to-name'
import NpcAdvicesFeedbackService from '@/api/sys/npc/feedback'
export default {
  data() {
    return {
      chart: null,
      npcAdviceFeedbackData: [],
      nafInitDataMap: {
        making: {
          npcAdvicesCount: 0,
          npcAdvicesFeedbackCount: 0
        },
        adjustment: {
          npcAdvicesCount: 0,
          npcAdvicesFeedbackCount: 0
        },
        execution: {
          npcAdvicesCount: 0,
          npcAdvicesFeedbackCount: 0
        },
        'final-account-making': {
          npcAdvicesCount: 0,
          npcAdvicesFeedbackCount: 0
        }
      }
    }
  },
  computed: {
    nafDataCompute() {
      let tmp = { ...this.nafInitDataMap }
      this.npcAdviceFeedbackData.forEach(item => {
        tmp[item.type].npcAdvicesCount += item.npcAdvicesCount
        tmp[item.type].npcAdvicesFeedbackCount += item.npcAdvicesFeedbackCount
      })
      let ret = []
      for (const key in tmp) {
        ret.push({
          type: typeToName[key],
          npcAdvicesCount: tmp[key].npcAdvicesCount,
          npcAdvicesFeedbackCount: tmp[key].npcAdvicesFeedbackCount
        })
      }
      return ret
    }
  },
  mounted() {
    this.analysisNpcAdviceFeedbackByType()
  },
  methods: {
    analysisNpcAdviceFeedbackByType() {
      NpcAdvicesFeedbackService.analysisNpcAdviceFeedbackByType({
        areaId: this.$route.query.areaId
      }).then(res => {
        if (res.ok()) {
          this.npcAdviceFeedbackData = res.data
          this.initChart(this.nafDataCompute)
        }
      })
    },
    initChart(data) {
      let width = this.$refs.npcAdviceFeedbackRef.offsetWidth
      let height = this.$refs.npcAdviceFeedbackRef.offsetHeight
      this.chart = new G2.Chart({
        container: 'npcAdviceFeedback',
        forceFit: true,
        padding: [80, 400, 70, 100],
        width,
        height
      })
      this.chart.axis('type', {
        // label: {
        //   textStyle: {
        //     fill: '#aaaaaa'
        //   }
        // }
      })
      this.chart.axis('npcAdvicesCount', false)
      this.chart.axis('npcAdvicesFeedbackCount', false)
      this.chart.tooltip({
        crosshairs: false
      })
      this.chart.source(data)
      this.chart.legend({
        position: 'right-top',
        offsetX: 20
      })
      this.chart.scale({
        npcAdvicesCount: {
          alias: '代表意见'
        },
        npcAdvicesFeedbackCount: {
          alias: '责任单位反馈'
        }
      })
      this.chart
        .line()
        .position('type*npcAdvicesCount')
        .color('#f9906f')
        .label('npcAdvicesCount', {
          offset: 40,
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
        .tooltip('type*npcAdvicesCount', function (type, npcAdvicesCount) {
          return {
            name: '代表意见',
            value: npcAdvicesCount + '个'
          }
        })
      this.chart
        .line()
        .position('type*npcAdvicesFeedbackCount')
        .color('#519a73')
        .label('npcAdvicesFeedbackCount', {
          useHtml: true,
          htmlTemplate: (text, item) => {
            const a = item.point
            return (
              '<span class="g2-label-item"><p class="g2-label-item-value" style="color:#177cb0">' +
              a.npcAdvicesFeedbackCount +
              '</p></span>'
            )
          }
        })
        .tooltip('type*npcAdvicesFeedbackCount', function (
          type,
          npcAdvicesFeedbackCount
        ) {
          return {
            name: '责任单位反馈',
            value: npcAdvicesFeedbackCount + '个'
          }
        })
      this.chart.guide().text({
        position: ['50%', 0],
        offsetY: -60,
        content: '本年度代表意见及反馈对比',
        style: {
          fill: '#177cb0',
          fontSize: '18',
          textAlign: 'center'
        }
      })
      this.chart.render()
    }
  }
}
</script>
