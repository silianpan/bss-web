<template>
  <div :id="containerId"></div>
</template>

<script>
import CommonUtil from '@/utils/CommonUtil'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'

export default {
  props: {
    data: [Array, Object]
  },
  components: {},
  data() {
    return {
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
      let data = []
      if (this.$_.isEmpty()) {
        data = [...this.data]
      } else {
        data = [this.data]
      }
      const dv = new DataSet().createView()
      dv.source(data)
        .transform({
          type: 'map',
          callback(row) {
            row.year = `${row.year}`
            return row
          }
        })
        .transform({
          type: 'rename',
          map: {
            year: '年度',
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
            '城乡居民基本养老保险基金',
            '机关事业单位基本养老保险基金',
            '职工基本医疗保险基金',
            '城乡居民基本医疗保险基金',
            '工伤保险基金',
            '失业保险基金',
            '生育保险基金'
          ].reverse(),
          key: 'opinion',
          value: 'value',
          retains: ['年度']
        })
      const chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 500
      })
      chart.source(dv)
      chart
        .interval()
        .position('opinion*value')
        .color('年度')
        .adjust([
          {
            type: 'dodge',
            marginRatio: 1 / 32
          }
        ])
      chart.render()
      this.chart = chart
      this.$nextTick(() => {
        this.chart.forceFit()
      })
    }
  }
}
</script>

<style scoped></style>
