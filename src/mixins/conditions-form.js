export default {
  data() {
    return {
      formDatas: {}
    }
  },
  methods: {
    handleSearch() {
      this.$emit('on-search')
    },
    getConditions() {
      let _datas = this.getDatas()
      let conditons = []
      for (const key in _datas) {
        if (
          _datas.hasOwnProperty(key) &&
          (_datas[key] || !this.$_.isEmpty(_datas[key]))
        ) {
          let c = {
            field: key,
            value: _datas[key]
          }
          conditons.push(c)
        }
      }
      return conditons
    },
    getDatas() {
      let _datas = Object.assign({}, this.formDatas)
      return _datas
    },
    handleReset() {
      this.formDatas = {}
      this.handleSearch()
    },
    setSearchFormDatas(data) {
      this.formDatas = data
      this.handleSearch()
    }
  }
}
