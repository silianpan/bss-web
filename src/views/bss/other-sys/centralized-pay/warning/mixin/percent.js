import Api from '@/api/sysPay/pay/pay.js'
import './percent.less'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      type: '',
      // 超出界限
      overFlag: 100,
      // 预警界限
      warningFlag: 80,
      list: []
    }
  },
  watch: {
    // 监听查询参数
    queryParams: {
      handler(newVal, oldVal) {
        this.queryData(newVal)
      },
      deep: true
    }
  },
  methods: {
    async queryData(qp) {
      this.loading = true
      let res
      if (this.type === 'bs') {
        res = await Api.percentBudgetBs(qp)
      }
      if (this.type === 'bsi') {
        res = await Api.percentBudgetBsi(qp)
      }
      if (res.ok()) {
        this.list = res.data || []
      }
      this.loading = false
    },
    itemClick(item) {
      let param = {}
      if (this.type === 'bs') {
        param = { bsName: item.bsName }
      }
      if (this.type === 'bsi') {
        param = { bsiName: item.bsiName }
      }
      this.$emit('open-pay', param)
    }
  },
  mounted() {
    this.queryData(this.queryParams)
  }
}
