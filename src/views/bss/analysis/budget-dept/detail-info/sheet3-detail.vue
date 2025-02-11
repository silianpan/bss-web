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
import Api from '@/api/sys/analysis/budget-dept-s3'

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
      fields: ['subject', 'year', 'area', 'makeLevel', 'govDept'],
      tableOption: {
        columns: [
          {
            title: '科目名称',
            key: 'subject'
          },
          {
            title: '合计(万元)',
            key: 'subtotal',
            align: 'center'
          },
          {
            title: '人员经费(万元)',
            key: 'fundPerson',
            align: 'center'
          },
          {
            title: '公用经费(万元)',
            key: 'fundPublic',
            align: 'center'
          },
          {
            title: '对个人和家庭补助(万元)',
            key: 'fundSubsidy',
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
