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
import Api from '@/api/sys/analysis/budget-dept-s5'

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
              if (!row.subjectCode || Number(row.subjectCode) === 0) {
                return <span>-</span>
              }
              return <span>{row.subjectCode}</span>
            }
          },
          {
            title: '科目名称',
            key: 'subject',
            align: 'center'
          },
          {
            title: '单位名称',
            key: 'govDept',
            align: 'center'
          },
          {
            title: '本年政府性基金预算财政拨款支出',
            align: 'center',
            children: [
              {
                title: '合计(万元)',
                key: 'outTotal',
                align: 'center',
                render: (h, params) => {
                  let row = params.row
                  return <span>{row.outTotal || '-'}</span>
                }
              },
              {
                title: '基本支出(万元)',
                key: 'outBase',
                align: 'center',
                render: (h, params) => {
                  let row = params.row
                  return <span>{row.outBase || '-'}</span>
                }
              },
              {
                title: '项目支出(万元)',
                key: 'fundPublic',
                align: 'center',
                render: (h, params) => {
                  let row = params.row
                  return <span>{row.fundPublic || '-'}</span>
                }
              }
            ]
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
