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
import Api from '@/api/sys/analysis/budget-dept-s2'

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
      fields: [
        'subject',
        'subjectCode',
        'year',
        'area',
        'makeLevel',
        'govDept'
      ],
      tableOption: {
        columns: [
          {
            title: '科目编码',
            key: 'subjectCode',
            render: (h, params) => {
              let row = params.row
              if (row.subjectCode === '0') {
                return <span>-</span>
              }
              return <span>{row.subjectCode || '-'}</span>
            }
          },
          {
            title: '科目名称',
            key: 'subject'
          },
          {
            title: '小计(万元)',
            key: 'subtotal',
            align: 'center'
          },
          {
            title: '基本支出(万元)',
            key: 'outBase',
            align: 'center'
          },
          {
            title: '项目支出(万元)',
            key: 'outProject',
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
