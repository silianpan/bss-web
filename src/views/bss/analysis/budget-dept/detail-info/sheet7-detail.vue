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
import Api from '@/api/sys/analysis/budget-dept-s7'

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
            title: '上年结余(万元)',
            key: 'lastYear',
            align: 'center'
          },
          {
            title: '一般公共预算拨款收入(万元)',
            key: 'faGeneral',
            align: 'center'
          },
          {
            title: '政府性基金预算拨款收入(万元)',
            key: 'faGovFund',
            align: 'center'
          },
          {
            title: '事业收入(万元)',
            key: 'cause',
            align: 'center'
          },
          {
            title: '事业单位经营收入(万元)',
            key: 'causeUnit',
            align: 'center'
          },
          {
            title: '上级补助收入(万元)',
            key: 'superSubsidy',
            align: 'center'
          },
          {
            title: '下级单位上缴收入(万元)',
            key: 'subUnitTrunin',
            align: 'center'
          },
          {
            title: '其他收入(万元)',
            key: 'other',
            align: 'center'
          },
          {
            title: '用事业基金弥补收支差额(万元)',
            key: 'balance',
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
