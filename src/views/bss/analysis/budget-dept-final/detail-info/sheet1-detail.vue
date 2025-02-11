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
import Api from '@/api/sys/analysis/budget-dept-final-s1'

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
            title: '本年收入合计(万元)',
            key: 'inTotalNum',
            align: 'center'
          },
          {
            title: '财政本款收入(万元)',
            key: 'faApprIn',
            align: 'center'
          },
          {
            title: '上级补助收入(万元)',
            key: 'superSubsidyIn',
            align: 'center'
          },
          {
            title: '事业收入(万元)',
            key: 'busiIn',
            align: 'center'
          },
          {
            title: '经营收入(万元)',
            key: 'magIn',
            align: 'center'
          },
          {
            title: '附属单位上缴收入(万元)',
            key: 'unitUpIn',
            align: 'center'
          },
          {
            title: '其他收入(万元)',
            key: 'otherIn',
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
