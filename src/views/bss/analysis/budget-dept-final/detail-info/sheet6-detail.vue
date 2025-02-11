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
import Api from '@/api/sys/analysis/budget-dept-final-s6'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    year: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      loading: false,
      fields: [
        'subject',
        'psubject',
        'subjectCode',
        'eq_psubject',
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
            title: this.year + '决算数(万元)',
            key: 'budgetFinal',
            align: 'center'
          },
          {
            title: '上一年决算数(万元)',
            key: 'budgetFinalLastYear',
            align: 'center'
          },
          {
            title: '比上一年同比减少(%)',
            key: 'reduceLastYear',
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
