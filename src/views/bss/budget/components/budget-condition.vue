<template>
  <div>
    <div class="container" style="position: relative; height: calc(100vh - 200px);">
      <Spin fix v-if="loading" size="large"></Spin>
      <div class="typeBox" v-else>
        <div class="typeBlockList" v-if="!$_.isEmpty(conditions.yearRange.datas)">
          <div class="typeBlockListTitle">
            <span class="typeBlockListText">年份</span>
          </div>
          <div class="typeBlockContent">
            <span class="typeBlockItem" @click="yearClick(item)" v-for="(item, index) in conditions.yearRange.datas" :key="index">{{item}}</span>
          </div>
        </div>
        <div class="typeBlockList" v-if="!$_.isEmpty(conditions.areaChildren.datas)">
          <div class="typeBlockListTitle">
            <span class="typeBlockListText">区域</span>
          </div>
          <div class="typeBlockContent">
            <span class="typeBlockItem" @click="areaClick(item)" v-for="item in conditions.areaChildren.datas" :key="item.id">{{item.name}}</span>
          </div>
        </div>
        <div class="typeBlockList" v-if="!$_.isEmpty(conditions.govDept.datas)">
          <div class="typeBlockListTitle">
            <span class="typeBlockListText">部门</span>
          </div>
          <div class="typeBlockContent">
            <span class="typeBlockItem" @click="deptClick(item)" v-for="item in conditions.govDept.datas" :key="item.id">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { typeToName } from '../type-to-name'

import GovBudgetService from '@/api/sys/budget/gov-budget'
import GovDeptService from '@/api/sys/gov-dept/index'
import AreaService from '@/api/sys/area/index'

export default {
  props: {
    areaName: String
  },
  data() {
    return {
      loading: false,
      query: {},
      typeName: '',
      areaInfo: {},
      conditions: {
        yearRange: {
          queryDataAction: this.initYearRange,
          datas: []
        },
        areaChildren: {
          queryDataAction: this.initAreaChildren,
          datas: []
        },
        govDept: {
          queryDataAction: this.initGovDept,
          datas: []
        }
      }
    }
  },
  methods: {
    init() {
      this.query = this.$route.query
      this.typeName = typeToName[this.query.type]
      this.initCondition()
    },
    async initCondition() {
      this.loading = true
      await this.initAreaInfo()
      for (const key in this.conditions) {
        if (this.conditions.hasOwnProperty(key)) {
          const element = this.conditions[key]
          if (this.$_.isFunction(element.queryDataAction)) {
            let data = await element.queryDataAction()
            if (!this.$_.isNil(data)) {
              this.conditions[key].datas = data
            }
          }
        }
      }
      this.loading = false
    },
    async initAreaInfo() {
      let res = await AreaService.findById(this.query.areaId)
      if (res.ok()) {
        this.areaInfo = res.data
      }
    },
    async initYearRange() {
      let param = {
        conditions: [
          { field: 'type', value: this.query.type },
          { field: 'area_id', value: this.query.areaId }
        ]
      }
      let res = await GovBudgetService.listYears(param)
      if (res.ok()) {
        return res.data
      } else {
        return []
      }
    },
    async initAreaChildren() {
      let res = await AreaService.getAreaChildren(this.query.areaId)
      if (res.ok()) {
        return [{ ...this.areaInfo }].concat(
          res.data || []
        )
      } else {
        return []
      }
    },
    async initGovDept() {
      let res = await GovDeptService.getTopDeptByArea(this.query.areaId)
      if (res.ok()) {
        return res.data
      } else {
        return []
      }
    },
    yearClick(item) {
      let condition = { year: { title: item }, dept: {}, area: {} }
      this.changeComponent(condition)
    },
    areaClick(item) {
      let condition = { year: {}, dept: {}, area: item }
      this.changeComponent(condition)
    },
    deptClick(item) {
      let condition = { year: {}, dept: item, area: { id: this.query.areaId } }
      this.changeComponent(condition)
    },
    changeComponent(condition) {
      this.$emit('change-component', {
        component: 'BudgetList',
        condition
      })
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    '$route': 'init'
  }
}
</script>

<style>

</style>
