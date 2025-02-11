<template>
  <div>
    <div style="background: rgb(247, 247, 247); padding: 16px">
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
import Api from '@/api/sys/analysis/budget-final-social'
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
    // indicator: String,
    loadChildren: Function
  },
  data() {
    return {
      loading: false,
      tableOption: {
        columns: [
          {
            title: '项目',
            key: 'budgetProject',
            tree: true,
            width: 200
          },
          {
            title: '总计(万元)',
            key: 'total',
            align: 'center'
          },
          {
            title: '总企业职工基本养老保险基金计(万元)',
            key: 'c5',
            align: 'center'
          },

          {
            title: '企业职工基本养老保险基金(万元)',
            key: 'd5',
            align: 'center'
          },
          {
            title: '机关事业单位基本养老保险基金(万元)',
            key: 'c5',
            align: 'center'
          },
          {
            title: '职工基本医疗保险基金(万元)',
            key: 'f5',
            align: 'center'
          },
          {
            title: '城乡居民基本医疗保险基金(万元)',
            key: 'g5',
            align: 'center'
          },
          {
            title: '工伤保险基金(万元)',
            key: 'h5',
            align: 'center'
          },
          {
            title: '失业保险基金(万元)',
            key: 'i5',
            align: 'center'
          },
          {
            title: '生育保险基金(万元)',
            key: 'j5',
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
      Api.queryChildByCon(this.queryParams).then(res => {
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
            ...conditions,
            { field: 'pbudget_subject', value: item.budgetSubject }
          ]
        }
        Api.queryChildByCon(params).then(res => {
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
