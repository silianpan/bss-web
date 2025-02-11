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
          <FormItem label="月份" style="width:100%;">
            <Select v-model="conForm.month" transfer placeholder="月份">
              <Option v-for="(item, index) in 12" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="6" :md="6" :lg="6">
          <FormItem :label="`区县`" style="width:100%;">
            <AreaSelect :pid="areaInfo.id" v-model="conForm.region" placeholder="区县"></AreaSelect>
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
import AreaSelect from '../../component/area-select'

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
  mounted() {
    this.initConForm()
    this.handleSearch()
  },
  methods: {
    // 初始化条件
    initConForm() {
      this.$set(this.conForm, 'year', this.$moment().year())
      this.$set(this.conForm, 'month', this.$moment().month() + 1)
      this.$set(this.conForm, 'region', this.areaInfo.eleRegion)
    },
    handleSearch() {
      this.$emit('condition-change', { ...this.conForm })
    }
  }
}
</script>
