<!-- 不同年的汇总：折线图 -->
<template>
  <LineChart :options="newOptions" :queryFunc="queryFunc" :queryParams="queryParams" ref="pieRef" />
</template>

<script>
import LineChart from '_c/chart/line-chart'
export default {
  components: {
    LineChart
  },
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    queryFunc: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      newOptions: {},
      defaultOptions: {
        title: '',
        colorList: ['#2593fc', '#38c060', '#27c1c1', '#705dc8', '#3b4771', '#f9cb34'],
        fieldMap: {
          time: 'year',
          name: 'subject',
          value: 'budgetNum'
        }
      }
    }
  },
  mounted() {
    this.newOptions = { ...this.defaultOptions, ...this.options }
  },
  methods: {
    updateData() {
      this.$refs.pieRef.queryData()
    }
  }
}
</script>
