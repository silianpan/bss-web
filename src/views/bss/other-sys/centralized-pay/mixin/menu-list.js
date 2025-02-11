import './list.less'

export default {
  props: {
    queryParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [],
      page: {
        totalRecords: 0,
        pageSize: 5,
        pageNum: 1
      }
    }
  },
  methods: {
    initData() {},
    listChangePage(pageNum) {
      this.page.pageNum = pageNum
      this.initData()
    }
  },
  mounted() {
    this.initData()
  }
}
