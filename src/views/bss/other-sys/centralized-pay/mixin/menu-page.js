import AreaSelect from '../component/area-select'

export default {
  components: {
    AreaSelect
  },
  props: {
    areaInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      spinFlag: false,
      yearOp: [],
      deptOp: [],
      conForm: {},
      // 分页信息
      page: {
        totalRecords: 0,
        pageSize: 10,
        pageNum: 1
      },
      columns: [],
      data: []
    }
  },
  methods: {
    getApi() {
      return null
    },
    back() {
      this.$emit('back')
    },
    initData() {
      this.initCondition()
      this.queryData()
    },
    initConForm() {
      this.$set(this.conForm, 'year', this.$moment().year())
      this.$set(this.conForm, 'region', this.areaInfo.eleRegion)
    },
    initCondition() {
      this.initConForm()
      this.initYear()
      if (!this.$_.isEmpty(this.areaInfo)) {
        this.initDept()
      }
    },
    initYear() {
      this.getApi()
        .listYears()
        .then(res => {
          if (res.ok()) {
            this.yearOp = res.data || []
          }
        })
    },
    initDept(region = this.areaInfo.eleRegion) {
      this.getApi()
        .listDepts(region)
        .then(res => {
          if (res.ok()) {
            this.deptOp = res.data || []
          }
        })
    },
    yearChange(value) {
      this.page.pageNum = 1
      this.queryData()
    },
    monthChange(value) {
      this.page.pageNum = 1
      this.queryData()
    },
    regionChange(value) {
      this.page.pageNum = 1
      // 重新查找部门数据
      this.initDept(value)
      this.$set(this.conForm, 'dept', undefined)
      this.queryData()
    },
    deptChange(value) {
      this.page.pageNum = 1
      this.queryData()
    },
    search() {
      this.page.pageNum = 1
      this.queryData()
    },
    queryData() {},
    listChangePage(pageNum) {
      this.page.pageNum = pageNum
      this.queryData()
    },
    listChangePageSize(size) {
      this.page.pageSize = size
      this.queryData()
    }
  },
  mounted() {
    this.initData()
  }
}
