<template>
  <div>
    <div style="background: rgb(247, 247, 247); padding: 16px">
      <Row class="mt-8 font14" v-if="!$_.isEmpty(selectedData)">
        <i-col span="12">
          <div>
            <span>预算科目:</span>
            <span class="ml-16" style="color:#5cadff">{{selectedData.budgetSubject}}</span>
          </div>
        </i-col>
        <i-col span="12" v-if="indicator === 'budgetNum'">
          <div>
            <span>预算数:</span>
            <span class="ml-16" style="color:#5cadff">{{selectedData.budgetNum}}万元</span>
          </div>
        </i-col>
        <i-col span="12" v-if="indicator === 'budgetAdjustNum'">
          <div>
            <span>调整预算数:</span>
            <span class="ml-16" style="color:#5cadff">{{selectedData.budgetAdjustNum}}万元</span>
          </div>
        </i-col>
        <i-col span="12" v-if="indicator === 'budgetFinalNum'">
          <div>
            <span>决算数:</span>
            <span class="ml-16" style="color:#5cadff">{{selectedData.budgetFinalNum}}万元</span>
          </div>
        </i-col>
      </Row>
      <Table
        row-key="id"
        border
        :loading="loading"
        :load-data="handleLoadChildren"
        :columns="tableOption.columns"
        :data="tableOption.data"
      ></Table>
    </div>
  </div>
</template>

<script>
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    },
    selectedData: {
      type: Object,
      default: () => {}
    },
    flag: {
      type: String,
      default: () => 'queryChildByCon'
    },
    indicator: String,
    loadChildren: Function
  },
  data() {
    return {
      loading: false,
      tableOption: {
        columns: [
          {
            title: '预算科目',
            key: 'budgetSubject',
            tree: true
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
          title: '预算科目',
          key: 'budgetSubject',
          tree: true
        }
      ]
      switch (this.indicator) {
        case 'budgetNum':
          columns.push({
            title: '预算数',
            key: 'budgetNum',
            width: 160,
            align: 'right',
            render: (h, params) => {
              let str = this.$_.isNil(params.row.budgetNum)
                ? '/'
                : `${params.row.budgetNum}万元`
              return <span>{str}</span>
            }
          })
          break
        case 'budgetAdjustNum':
          columns.push({
            title: '调整预算数',
            key: 'budgetAdjustNum',
            width: 160,
            align: 'right',
            render: (h, params) => {
              let str = this.$_.isNil(params.row.budgetAdjustNum)
                ? '/'
                : `${params.row.budgetAdjustNum}万元`
              return <span>{str}</span>
            }
          })
          break
        case 'budgetFinalNum':
          columns.push({
            title: '决算数',
            key: 'budgetFinalNum',
            width: 160,
            align: 'right',
            render: (h, params) => {
              let str = this.$_.isNil(params.row.budgetFinalNum)
                ? '/'
                : `${params.row.budgetFinalNum}万元`
              return <span>{str}</span>
            }
          })
          break
        default:
          columns = columns.concat([
            {
              title: '预算数',
              key: 'budgetNum',
              width: 160,
              align: 'right',
              render: (h, params) => {
                let str = this.$_.isNil(params.row.budgetNum)
                  ? '/'
                  : `${params.row.budgetNum}万元`
                return <span>{str}</span>
              }
            },

            {
              title: '调整预算数',
              key: 'budgetAdjustNum',
              width: 160,
              align: 'right',
              render: (h, params) => {
                let str = this.$_.isNil(params.row.budgetAdjustNum)
                  ? '/'
                  : `${params.row.budgetAdjustNum}万元`
                return <span>{str}</span>
              }
            },
            {
              title: '决算数',
              key: 'budgetFinalNum',
              width: 160,
              align: 'right',
              render: (h, params) => {
                let str = this.$_.isNil(params.row.budgetFinalNum)
                  ? '/'
                  : `${params.row.budgetFinalNum}万元`
                return <span>{str}</span>
              }
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
      if (this.flag === 'querySumByCon') {
        AnalysisBudgetFinalService.querySumByCon(this.queryParams).then(res => {
          if (res.ok()) {
            this.tableOption.data = res.data || {}
          }
          this.loading = false
        })
      } else if (this.flag === 'queryByCon') {
        AnalysisBudgetFinalService.queryByCon(this.queryParams).then(res => {
          if (res.ok()) {
            this.tableOption.data = res.data || {}
          }
          this.loading = false
        })
      } else {
        AnalysisBudgetFinalService.queryChildByCon(this.queryParams).then(res => {
          if (res.ok()) {
            let temp = res.data
            for (let item of temp) {
              // 判断该项是否还有子明细
              if (item.childCount !== 0) {
                item._loading = false
                item.children = []
              }
            }
            this.tableOption.data = res.data || {}
          }
          this.loading = false
        })
      }
    },
    handleLoadChildren(item, callback) {
      if (this.loadChildren && this.loadChildren.then) {
        this.loadChildren(item).then(res => {
          if (res.ok()) {
            let temp = res.data
            for (let item of temp) {
              // 判断该项是否还有子明细
              if (item.childCount !== 0) {
                item._loading = false
                item.children = []
              }
            }
            callback(res.data)
          }
        })
      } else {
        let { conditions } = this.queryParams
        let params = {
          conditions: [
            ...conditions.filter(item => item.field !== 'budget_subject_level'),
            { field: 'pbudget_subject', value: item.budgetSubject }
          ]
        }
        AnalysisBudgetFinalService.queryChildByCon(params).then(res => {
          if (res.ok()) {
            let temp = res.data
            for (let item of temp) {
              // 判断该项是否还有子明细
              if (item.childCount !== 0) {
                item._loading = false
                item.children = []
              }
            }
            callback(temp)
          }
        })
      }
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
</style>
