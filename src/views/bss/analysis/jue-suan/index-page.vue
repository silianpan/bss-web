<template>
  <div style="padding:16px;height: 100%; overflow-y: auto;">
    <Tabs :animated="false" @on-click="handleTabClick">
      <TabPane
        v-for="(item, index) in tabOptions"
        :key="index"
        :label="item.label"
        :name="item.component"
      ></TabPane>
    </Tabs>
    <div>
      <component ref="com" :area-info="areaInfo" :is="currentComp"></component>
    </div>
  </div>
</template>

<script>
// 结构分析
import IndexCompare from './index-compare'
import YearCompare from './year-compare'
import AllCompare from '@/views/bss/analysis/jue-suan/all-compare'
import AreaService from '@/api/sys/area/index'
// 占比趋势分析
export default {
  components: {
    IndexCompare,
    YearCompare,
    AllCompare
  },
  data() {
    return {
      currentComp: 'IndexCompare',
      areaInfo: {}
    }
  },
  computed: {
    tabOptions() {
      let tabOptions = [
        {
          component: 'IndexCompare',
          label: '结构分析'
        },
        {
          component: 'YearCompare',
          label: '占比趋势分析'
        },
        {
          component: 'AllCompare',
          label: '预决算对比分析'
        }
      ]
      return tabOptions
    }
  },
  mounted() {
    this.initAreaInfo()
  },
  methods: {
    async initAreaInfo() {
      if (this.$route.query && this.$route.query.areaId) {
        let res = await AreaService.findById(this.$route.query.areaId)
        if (res.ok()) {
          this.areaInfo = res.data || {}
        }
      }
    },
    handleTabClick(name) {
      this.currentComp = name
    }
  }
}
</script>

<style scoped>
</style>
