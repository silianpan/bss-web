<!-- 部门预算分析 -->
<template>
  <div style="padding:16px;height: 100%; overflow-y: auto;">
    <Tabs :animated="false" @on-click="handleTabClick">
      <TabPane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.component"></TabPane>
    </Tabs>
    <div>
      <component ref="com" :area-info="areaInfo" :is="currentComp"></component>
    </div>
  </div>
</template>

<script>
import Overview from './overview'
import DeptView from './dept-view'

export default {
  components: {
    Overview,
    DeptView
  },
  props: {
    areaInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentComp: 'Overview'
    }
  },
  computed: {
    tabOptions() {
      let tabOptions = [
        {
          component: 'Overview',
          label: '总揽'
        },
        {
          component: 'DeptView',
          label: '部门分析'
        }
      ]
      return tabOptions
    }
  },
  methods: {
    handleTabClick(name) {
      this.currentComp = name
    }
  }
}
</script>
