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
import Api from '@/api/sys/analysis/budget-dept-s8'

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
            title: '科目',
            align: 'center',
            children: [
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
          },
          {
            title: '合计(万元)',
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
          },
          {
            title: '上缴上级支出(万元)',
            key: 'superTurnin',
            align: 'center'
          },
          {
            title: '对下级单位补助支出(万元)',
            key: 'subUnitSubsidy',
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
