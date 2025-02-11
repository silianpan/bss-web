<template>
  <div>
    <div style="background: rgb(247, 247, 247); padding: 16px">
      <Table
        row-key="id"
        border
        :loading="loading"
        :columns="tableOption.columns"
        :data="tableOption.data"
      ></Table>
    </div>
  </div>
</template>

<script>
import Api from '@/api/sys/analysis/budget-dept-s4'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      fields: ['subject', 'yearBudget', 'year', 'area', 'makeLevel', 'govDept'],
      tableOption: {
        columns: [
          {
            title: '年度',
            key: 'yearBudget'
          },
          {
            title: '合计(万元)',
            key: 'total',
            align: 'center'
          },
          {
            title: '因公出国(境)费(万元)',
            key: 'goAbroad',
            align: 'center'
          },
          {
            title: '公务用车购置及运行费小计(万元)',
            key: 'carSubtotal',
            align: 'center'
          },
          {
            title: '公务用车购置费(万元)',
            key: 'carBuy',
            align: 'center'
          },
          {
            title: '公务用车运行费(万元)',
            key: 'carRun',
            align: 'center'
          },
          {
            title: '公务接待费(万元)',
            key: 'entertainment',
            align: 'center'
          }
        ],
        data: []
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    initData() {
      this.loading = true
      let { conditions } = this.queryParams
      Api.queryByCon({
        conditions: (conditions || []).filter(c =>
          this.$_.includes(this.fields, c.field)
        )
      }).then(res => {
        if (res.ok()) {
          this.tableOption.data = res.data || {}
        }
        this.loading = false
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
</style>
