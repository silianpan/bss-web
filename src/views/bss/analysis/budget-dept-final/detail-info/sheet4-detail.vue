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
import Api from '@/api/sys/analysis/budget-dept-final-s4'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    flag: {
      type: String,
      default: () => 'all'
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
          }
        ],
        data: []
      }
    }
  },
  created() {
    this.initTableColumn()
  },
  computed: {},
  methods: {
    initTableColumn() {
      let columns = [
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
        }
      ]
      if (this.flag === 'all') {
        columns = columns.concat([
          {
            title: '年初结转和结余(万元)',
            align: 'center',
            children: [
              {
                title: '合计',
                key: 'budgetBegin',
                align: 'center'
              },
              {
                title: '基本支出',
                key: 'budgetBeginBase',
                align: 'center'
              },
              {
                title: '项目支出',
                key: 'budgetBeginProject',
                align: 'center'
              }
            ]
          },
          {
            title: '本年收入(万元)',
            align: 'center',
            children: [
              {
                title: '合计',
                key: 'budgetIn',
                align: 'center'
              },
              {
                title: '基本支出',
                key: 'budgetInBase',
                align: 'center'
              },
              {
                title: '项目支出',
                key: 'budgetInProject',
                align: 'center'
              }
            ]
          },
          {
            title: '本年支出(万元)',
            align: 'center',
            children: [
              {
                title: '合计',
                key: 'budgetOut',
                align: 'center'
              },
              {
                title: '基本支出',
                key: 'budgetOutBase',
                align: 'center'
              },
              {
                title: '项目支出',
                key: 'budgetOutProject',
                align: 'center'
              }
            ]
          },
          {
            title: '年末结转和结余(万元)',
            align: 'center',
            children: [
              {
                title: '合计(万元)',
                key: 'budget_end',
                align: 'center'
              },
              {
                title: '基本支出(万元)',
                key: 'budget_endBase',
                align: 'center'
              },
              {
                title: '项目支出(万元)',
                key: 'budget_endProject',
                align: 'center'
              }
            ]
          }
        ])
      } else if (this.flag === 'begin') {
        columns = columns.concat([
          {
            title: '年初结转和结余(万元)',
            align: 'center',
            children: [
              {
                title: '合计',
                key: 'budgetBegin',
                align: 'center'
              },
              {
                title: '基本支出',
                key: 'budgetBeginBase',
                align: 'center'
              },
              {
                title: '项目支出',
                key: 'budgetBeginProject',
                align: 'center'
              }
            ]
          }
        ])
      } else if (this.flag === 'in') {
        columns = columns.concat([
          {
            title: '本年收入(万元)',
            align: 'center',
            children: [
              {
                title: '合计',
                key: 'budgetIn',
                align: 'center'
              },
              {
                title: '基本支出',
                key: 'budgetInBase',
                align: 'center'
              },
              {
                title: '项目支出',
                key: 'budgetInProject',
                align: 'center'
              }
            ]
          }
        ])
      } else if (this.flag === 'out') {
        columns = columns.concat([
          {
            title: '本年支出(万元)',
            align: 'center',
            children: [
              {
                title: '合计',
                key: 'budgetOut',
                align: 'center'
              },
              {
                title: '基本支出',
                key: 'budgetOutBase',
                align: 'center'
              },
              {
                title: '项目支出',
                key: 'budgetOutProject',
                align: 'center'
              }
            ]
          }
        ])
      } else {
        columns = columns.concat([
          {
            title: '年末结转和结余(万元)',
            align: 'center',
            children: [
              {
                title: '合计(万元)',
                key: 'budget_end',
                align: 'center'
              },
              {
                title: '基本支出(万元)',
                key: 'budget_endBase',
                align: 'center'
              },
              {
                title: '项目支出(万元)',
                key: 'budget_endProject',
                align: 'center'
              }
            ]
          }
        ])
      }
      this.tableOption = {
        columns: columns,
        data: []
      }
    },
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
