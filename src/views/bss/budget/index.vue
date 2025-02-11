<template>
  <div>
    <component
      :is="currentTabComponent"
      :areaName="areaName"
      :condition="condition"
      @change-component="changeComponent"
    >
    </component>
  </div>
</template>

<script>
import AreaService from '@/api/sys/area/index'

import BudgetCondition from './components/budget-condition'
import BudgetList from './components/budget-list'

export default {
  components: {
    BudgetCondition,
    BudgetList
  },
  data() {
    return {
      loading: false,
      currentTabComponent: 'BudgetCondition',
      query: {},
      areaName: '',
      yearRange: [],
      govDept: [],
      areaChildren: [],
      condition: null
    }
  },
  methods: {
    changeComponent(data) {
      this.condition = data.condition
      this.currentTabComponent = data.component
    },
    async initCondition() {
      this.loading = true
      this.query = this.$route.query
      await this.initAreaInfo()
      this.loading = false
    },
    async initAreaInfo() {
      let res = await AreaService.findById(this.query.areaId)
      if (res.ok()) {
        this.areaName = res.data.name
      }
    }
  },
  mounted() {
    this.initCondition()
  }
}
</script>
