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
import Api from '@/api/sys/analysis/budget-dept-final-s2'

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
            title: '本年支出合计(万元)',
            key: 'outTotalNum',
            align: 'center'
          },
          {
            title: '基本支出(万元)',
            key: 'basicOut',
            align: 'center'
          },
          {
            title: '项目支出(万元)',
            key: 'projectOut',
            align: 'center'
          },
          {
            title: '上缴上级支出(万元)',
            key: 'superUpOut',
            align: 'center'
          },
          {
            title: '经营支出(万元)',
            key: 'magOut',
            align: 'center'
          },
          {
            title: '对附属单位补助支出(万元)',
            key: 'unitSubsidyOut',
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
