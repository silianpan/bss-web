<template>
  <Card shadow>
    <p slot="title" class="analysis-card-title">{{ title }}</p>
    <div style="height: 507px">
      <Spin v-if="loading" fix large></Spin>
      <div v-if="emptyData" class="no-data">暂无数据</div>
      <div v-else :id="containerId" style="position: relative; width: 100%"></div>
    </div>
  </Card>
</template>

<script>
import CommonUtil from '@/utils/CommonUtil'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
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
    }
  },
  data() {
    return {
      loading: false,
      containerId: '',
      chart: null,
      emptyData: false
    }
  },
  created() {
    this.containerId = `container${CommonUtil.uuid()}`
  },
  mounted() {
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
        if (res.ok()) {
          this.emptyData = this.$_.isEmpty(res.data)
          if (!this.emptyData) {
            this.$nextTick(() => {
              if (this.chart !== null) {
                this.updateData(res.data)
              } else {
                this.initChart(res.data)
              }
            })
          } else {
            if (this.chart !== null) {
              this.chart.destroy()
              this.chart = null
            }
          }
        }
      } catch (error) {
        console.error(error)
        this.loading = false
      }
      this.loading = false
    },
    initChart(data) {
      const self = this
      // 给point注册一个词云的shape
      G2.Shape.registerShape('point', 'cloud', {
        drawShape: function drawShape(cfg, container) {
          var attrs = self.getTextAttrs(cfg)
          return container.addShape('text', {
            attrs: self.$_.assign(attrs, {
              x: cfg.x,
              y: cfg.y
            })
          })
        }
      })

      var dv = new DataSet.View().source(data)
      var range = dv.range('wordCount')
      var min = range[0]
      var max = range[1]
      dv.transform({
        type: 'tag-cloud',
        fields: ['word', 'wordCount'],
        // size: [window.innerWidth, window.innerHeight],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate: function rotate() {
          var random = ~~(Math.random() * 4) % 4
          if (random === 2) {
            random = 0
          }
          return random * 90 // 0, 90, 270
        },
        fontSize: function fontSize(d) {
          if (d.wordCount) {
            return ((d.wordCount - min) / (max - min)) * (80 - 24) + 24
          }
          return 0
        }
      })
      this.chart = new G2.Chart({
        container: this.containerId,
        height: 500,
        forceFit: true,
        padding: 0
      })
      this.chart.source(dv, {
        x: {
          nice: false
        },
        y: {
          nice: false
        }
      })
      this.chart.legend(false)
      this.chart.axis(false)
      this.chart.scale({
        word: {
          alias: '类型'
        },
        wordCount: {
          alias: '数量'
        }
      })
      this.chart.tooltip({
        showTitle: false,
        itemTpl: `<li data-index={index}>
            <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
            {name}：{value}
          </li>`,
        'g2-tooltip': {
          boxShadow: '0px 0px 2px #000'
        }
      })
      this.chart.coord().reflect()
      this.chart
        .point()
        .position('x*y')
        .color('x')
        .shape('cloud')
        .tooltip('word*wordCount')
      this.chart.render()
    },
    getTextAttrs(cfg) {
      return this.$_.assign({}, cfg.style, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic'
      })
    },
    updateData(data) {
      var dv = new DataSet.View().source(data)
      var range = dv.range('wordCount')
      var min = range[0]
      var max = range[1]
      dv.transform({
        type: 'tag-cloud',
        fields: ['word', 'wordCount'],
        // size: [window.innerWidth, window.innerHeight],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate: function rotate() {
          var random = ~~(Math.random() * 4) % 4
          if (random === 2) {
            random = 0
          }
          return random * 90 // 0, 90, 270
        },
        fontSize: function fontSize(d) {
          if (d.wordCount) {
            return ((d.wordCount - min) / (max - min)) * (80 - 24) + 24
          }
          return 0
        }
      })
      this.chart.changeData(dv)
    }
  }
}
</script>

<style lang="less" scoped>
.no-data {
  margin: 0 auto;
  width: 200px;
  height: 507px;
  line-height: 507px;
  color: grey;
  font-family: '微软雅黑';
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
}
</style>
