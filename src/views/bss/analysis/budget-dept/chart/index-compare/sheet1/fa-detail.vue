<!-- 本年收入、本年支出、上年结转、结转下年及明细：柱状图 -->
<template>
  <Column
    :options="newOptions"
    @column-title-click="handleTitleClick"
    @column-label-click="handleLabelClick"
    :queryFunc="queryFunc"
    :queryParams="queryParams"
    ref="columnRef"
  />
</template>

<script>
import Column from '_c/chart/column'
export default {
  components: {
    Column
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
        chartProps: {
          height: 500,
          padding: [50, 120, 100, 120]
        },
        legendProps: {
          position: 'bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12',
            // fontWeight: 'bold',
            rotate: -60
          }
        },
        adjustProps: [
          {
            type: 'dodge',
            marginRatio: 1 / 32
          }
        ],
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: 'psubject',
          name: 'subject',
          value: 'budgetNum'
        }
        // colorList: ['#ff786b', '#0fdd7e', '#bc9dfb', '#ff2e6a', '#7effa2', '#e57ec0', '#2c818f', '#ff7730']
      }
    }
  },
  mounted() {
    this.newOptions = { ...this.defaultOptions, ...this.options }
  },
  methods: {
    handleTitleClick() {
      this.$emit('title-click')
    },
    handleLabelClick(data) {
      this.$emit('label-click', data)
    },
    updateData() {
      this.$refs.barRef.queryData()
    }
  }
}
</script>
