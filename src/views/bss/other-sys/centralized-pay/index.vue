<template>
  <div class="wrapperMain">
    <div class="containerWrapper">
      <div class="leftWrapper">
        <div class="mainWrapper i-scrollbar-hide">
          <div style="width: 100%" v-for="item in tabsOption" :key="item.id">
            <div class="tab-item" :class="{ 'active-tab' : curComp === item.name }" @click="tabClick(item.name)">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="rightWrapper">
        <Spin fix v-if="spinFlag" size="large"></Spin>
        <component v-else :is="curComp" :area-info="areaInfo" @back="changeComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import AreaApi from '@/api/sys/area'
import './index.less'
import Statistics from './statistics/page.vue'
import Warning from './warning/page.vue'
import UnitIndicators from './unit-indicators/page.vue'
import PaymentPlan from './payment-plan/page.vue'
import PaymentDetail from './payment-detail/page.vue'

export default {
  components: {
    Statistics,
    Warning,
    UnitIndicators,
    PaymentPlan,
    PaymentDetail
  },
  data() {
    return {
      spinFlag: true,
      areaInfo: {},
      curComp: 'Statistics',
      tabsOption: [
        {
          label: '统计分析',
          name: 'Statistics'
        },
        {
          label: '预警分析',
          name: 'Warning'
        },
        {
          label: '单位指标',
          name: 'UnitIndicators'
        },
        {
          label: '⽤款计划',
          name: 'PaymentPlan'
        },
        {
          label: '支付明细',
          name: 'PaymentDetail'
        }
      ]
    }
  },
  methods: {
    async initArea() {
      this.spinFlag = true
      if (this.$route.query && this.$route.query.areaId) {
        let res = await AreaApi.findById(this.$route.query.areaId)
        if (res.ok()) {
          this.areaInfo = res.data || {}
        }
        this.spinFlag = false
      }
    },
    changeComponent() {
      this.$emit('change-component', {
        component: 'SysOption'
      })
    },
    tabClick(name) {
      this.curComp = name
    }
  },
  watch: {
    $route: 'changeComponent'
  },
  mounted() {
    this.initArea()
  }
}
</script>

<style>
</style>
