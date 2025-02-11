<template>
  <div>
    <Form ref="searchForm" :model="conForm" inline :label-width="100">
      <Row type="flex" :gutter="8">
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <FormItem label="年度" style="width:100%;">
            <Select v-model="conForm.year" transfer placeholder="年度">
              <Option v-for="(item, index) in yearOp" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <FormItem label="区县" style="width:100%;">
            <AreaSelect :pid="areaInfo.id" v-model="conForm.region" placeholder="区县" @on-change="regionChange"></AreaSelect>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <FormItem label="部门" style="width:100%;">
            <Select v-model="conForm.dept" transfer clearable filterable placeholder="部门（可搜索）">
              <Option v-for="(item, index) in deptOp" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <div style="text-align:right">
            <Button @click="handleSearch" type="primary">分析</Button>
          </div>
        </i-col>
      </Row>
    </Form>
  </div>
</template>

<script>
import AreaSelect from '../component/area-select'
import Api from '@/api/sysPay/dept'

export default {
  components: {
    AreaSelect
  },
  props: {
    areaInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      startYear: 2020,
      deptOp: [],
      conForm: {}
    }
  },
  computed: {
    yearOp() {
      let arr = []
      for (let i = this.startYear; i <= this.$moment().year(); i++) {
        arr.unshift(i)
      }
      return arr
    }
  },
  methods: {
    initCondition() {
      this.initConForm()
      if (!this.$_.isEmpty(this.areaInfo)) {
        this.initDept()
      }
    },
    // 初始化条件
    initConForm() {
      this.$set(this.conForm, 'year', this.$moment().year())
      this.$set(this.conForm, 'region', this.areaInfo.eleRegion)
      this.$set(this.conForm, 'area_name', this.areaInfo.name)
    },
    initDept(region = this.areaInfo.eleRegion) {
      Api.listDepts(region).then((res) => {
        if (res.ok()) {
          this.deptOp = res.data || []
        }
      })
    },
    regionChange(obj) {
      this.$set(this.conForm, 'region', obj.value)
      this.$set(this.conForm, 'area_name', obj.label)
      // 重新查找部门数据
      this.initDept(obj.value)
      this.$set(this.conForm, 'dept', undefined)
    },
    handleSearch() {
      if (this.$_.isNil(this.conForm.dept)) {
        this.$Message.warning('请选择部门')
        return
      }
      this.$emit('condition-change', { ...this.conForm })
    }
  },
  mounted() {
    this.initCondition()
  }
}
</script>

<style>
</style>
