<template>
  <div :id="containerId"></div>
</template>

<script>
import CommonUtil from '@/utils/CommonUtil'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'

function getRectPath(points) {
  const path = []
  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    if (point) {
      const action = i === 0 ? 'M' : 'L'
      path.push([action, point.x, point.y])
    }
  }
  const first = points[0]
  path.push(['L', first.x, first.y])
  path.push(['z'])
  return path
}

function getFillAttrs(cfg) {
  const defaultAttrs = G2.Global.shape.interval
  const attrs = G2.Util.mix({}, defaultAttrs, cfg.style, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity
  })
  return attrs
}

G2.Shape.registerShape('interval', 'waterfall', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg)
    let rectPath = getRectPath(cfg.points)
    rectPath = this.parsePath(rectPath)
    const interval = container.addShape('path', {
      attrs: G2.Util.mix(attrs, {
        path: rectPath
      })
    })
    if (cfg.nextPoints) {
      let linkPath = [
        ['M', cfg.points[2].x, cfg.points[2].y],
        ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y]
      ]

      if (cfg.nextPoints[0].y === 0) {
        linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y]
      }
      linkPath = this.parsePath(linkPath)
      container.addShape('path', {
        attrs: {
          path: linkPath,
          stroke: '#8c8c8c',
          lineDash: [4, 2]
        }
      })
    }

    return interval
  }
})

export default {
  props: {
    data: Object
  },
  components: {},
  data() {
    return {
      valueUnit: '元',
      containerId: CommonUtil.uuid(),
      chart: null,
      fieldMap: {
        c5: '总计',
        d5: '企业职工基本养老保险基金',
        e5: '机关事业单位基本养老保险基金',
        f5: '职工基本医疗保险基金',
        g5: '城乡居民基本医疗保险基金',
        h5: '工伤保险基金',
        i5: '失业保险基金',
        j5: '生育保险基金'
      }
    }
  },
  beforeDestroy() {
    this.destory()
  },
  computed: {},
  mounted() {
    this.init()
  },
  watch: {
    q: 'init'
  },
  methods: {
    destory() {
      if (this.chart) {
        this.chart.destroy()
      }
    },
    async init() {
      this.destory()
      const data = [this.data]

      const dv = new DataSet().createView()
      dv.source(data)
        .transform({
          type: 'rename',
          map: {
            total: '合计',
            c5: '企业职工基本养老保险基金',
            d5: '城乡居民基本养老保险基金',
            e5: '机关事业单位基本养老保险基金',
            f5: '职工基本医疗保险基金',
            g5: '城乡居民基本医疗保险基金',
            h5: '工伤保险基金',
            i5: '失业保险基金',
            j5: '生育保险基金'
          }
        })
        .transform({
          type: 'fold',
          fields: [
            '企业职工基本养老保险基金',
            '合计',
            '城乡居民基本养老保险基金',
            '城乡居民基本医疗保险基金',
            '失业保险基金',
            '工伤保险基金',
            '机关事业单位基本养老保险基金',
            '生育保险基金',
            '职工基本医疗保险基金'
          ],
          key: 'opinion',
          value: 'value',
          retains: ['budgetProject']
        })

      const chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 500
      })

      // let _datas = dv.rows
      // for (let i = 0; i < _datas.length; i++) {
      //   const item = _datas[i]
      //   if (i > 0 && i < _datas.length - 1) {
      //     if (G2.Util.isArray(_datas[i - 1].value)) {
      //       item.value = [
      //         _datas[i - 1].value[1],
      //         item.value + _datas[i - 1].value[1]
      //       ]
      //     } else {
      //       item.value = [_datas[i - 1].value, item.value + _datas[i - 1].value]
      //     }
      //   }
      // }

      chart.source(dv)

      chart
        .interval()
        .position('opinion*value')
        .color('opinion*value', (type, value) => {
          if (type === '合计') {
            return '#8c8c8c'
          }
          let _v = 0
          if (G2.Util.isArray(value)) {
            _v = value[1] - value[0]
          } else {
            _v = value
          }
          if (_v < 0) {
            return '#e64646'
          }
          return '#1890FF'
        })
        .tooltip('opinion*value', (type, value) => {
          if (G2.Util.isArray(value)) {
            return {
              name: type,
              value: value[1] - value[0]
            }
          }

          return {
            name: type,
            value: value
          }
        })
        .shape('waterfall')
        .label('value', value => {
          if (G2.Util.isArray(value)) {
            return value[1] - value[0] + this.valueUnit
          }
          return value + this.valueUnit
        })

      chart.render()
      chart.on('label:click', ev => {
        this.$emit('label-click', ev.data)
      })

      this.chart = chart
      this.$nextTick(() => {
        this.chart.forceFit()
      })
    }
  }
}
</script>

<style scoped></style>
