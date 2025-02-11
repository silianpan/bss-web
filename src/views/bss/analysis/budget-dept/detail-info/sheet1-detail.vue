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
import Api from '@/api/sys/analysis/budget-dept-s1'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: () => 'all'
    }
  },
  data() {
    return {
      loading: false,
      tableOption: {
        columns: [],
        data: []
      },
      fields: [
        'subject',
        'fundType',
        'subjects',
        'not_subjects',
        'psubject',
        'year',
        'area',
        'makeLevel',
        'govDept'
      ]
    }
  },
  created() {
    this.initTableColumn()
  },
  computed: {},
  methods: {
    initTableColumn() {
      let columns = []
      if (this.type === '支出') {
        columns = [
          {
            title: '项目',
            key: 'subject'
          },
          {
            title: '合计(万元)',
            key: 'budgetNum',
            align: 'center'
          },
          {
            title: '一般公共预算财政拨款(万元)',
            key: 'faGeneral',
            align: 'center'
          },
          {
            title: '政府性基金预算财政拨款(万元)',
            key: 'faGovFund',
            align: 'center'
          }
        ]
      } else if (this.type === '收入') {
        columns = [
          {
            title: '项目',
            key: 'subject'
          },
          {
            title: '预算数(万元)',
            key: 'budgetNum',
            align: 'center'
          }
        ]
      } else {
        columns = [
          {
            title: '项目',
            key: 'subject'
          },
          {
            title: '收入',
            align: 'center',
            children: [
              {
                title: '预算数(万元)',
                key: 'budgetNum',
                align: 'center'
              }
            ]
          },
          {
            title: '支出',
            align: 'center',
            children: [
              {
                title: '合计(万元)',
                key: 'budgetNum',
                align: 'center'
              },
              {
                title: '一般公共预算财政拨款(万元)',
                key: 'faGeneral',
                align: 'center'
              },
              {
                title: '政府性基金预算财政拨款(万元)',
                key: 'faGovFund',
                align: 'center'
              }
            ]
          }
        ]
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
