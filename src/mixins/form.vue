<!--  -->

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      formRef: 'form',
      defaultFormValue: {},
      formDatas: {}
    }
  },
  created() {
    this.formDatas = Object.assign({}, this.defaultFormValue, this.data)
  },
  mounted() {

  },
  methods: {
    resetFields() {
      this.formDatas = Object.assign({}, this.defaultFormValue)
    },
    setDatas(datas) {
      if (!this.$_.isNil(datas) && !this.$_.isEmpty(datas)) {
        this.formDatas = Object.assign({}, datas)
      }
    },
    getDatas() {
      return Object.assign({}, this.formDatas)
    },
    beforeValidate() {
      return true
    },
    failValidate() {
    },
    // 提交表单
    submit(success, fail) {
      if (this.beforeValidate()) {
        if (!this.$_.isEmpty(this.$refs[this.formRef])) {
          this.$refs[this.formRef].validate(valid => {
            if (valid) {
              if (!this.$_.isNil(success) && this.$_.isFunction(success)) {
                success(this.getDatas())
              }
            } else {
              if (!this.$_.isNil(fail) && this.$_.isFunction(fail)) {
                fail()
              }
            }
          })
        } else {
          if (!this.$_.isNil(fail) && this.$_.isFunction(fail)) {
            fail()
          }
        }
      } else {
        this.failValidate()
        if (!this.$_.isNil(fail) && this.$_.isFunction(fail)) {
          fail()
        }
      }
    }
  }
}
</script>

<style  scoped>
</style>
