<!-- 总收入和总支出占比：饼图 -->
<template>
  <Pie
    :options="newOptions"
    @pie-title-click="handleTitleClick"
    @pie-label-click="handleLabelClick"
    :queryFunc="queryFunc"
    :queryParams="queryParams"
    ref="pieRef"
  />
</template>

<script>
import Pie from '_c/chart/pie'
export default {
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
  components: {
    Pie
  },
  data() {
    return {
      newOptions: {},
      defaultOptions: {
        title: '',
        colorList: [
          '#2593fc',
          '#38c060',
          '#27c1c1',
          '#705dc8',
          '#3b4771',
          '#f9cb34'
        ],
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
    },
    handleTitleClick() {
      this.$emit('title-click')
    },
    handleLabelClick(data) {
      this.$emit('label-click', data)
    }
  }
}
</script>
