<!--  -->
<template>
<div>
  <div class="mt-8 ml-16">
    <Button @click="handleGoBackClick" class="mr-16" icon="ios-arrow-back" >返回</Button>
    <Button @click="handleSaveClick" :loading="isBtnLoading" type="success" color="blue">保存</Button>
    <slot name="external"></slot>
  </div>
  <div class="mt-8" style="background: rgb(247, 247, 247)">
    <div style="position: relative;">
      <Spin size="large" fix v-if="isBtnLoading"></Spin>
      <slot ></slot>
    </div>
  </div>
</div>
</template>

<script>
import CommonUtil from '@/utils/CommonUtil'
export default {
  props: {
    beforeBack: Function,
    afterSaveAction: Function,
    saveAction: {
      default: async () => {

      }
    }
  },
  components: {},
  data() {
    return {
      isBtnLoading: false
    }
  },
  methods: {
    handleSaveClick() {
      this.isBtnLoading = true
      let targetForm = CommonUtil.findComponentDownward(this, 'm-form-')
      if (!this.$_.isEmpty(targetForm) && targetForm.submit) {
        targetForm.submit((formData) => {
          if (this.saveAction) {
            this.saveAction(formData).then((r) => {
              this.isBtnLoading = false
              if (r === true) {
                if (this.afterSaveAction) {
                  this.afterSaveAction(formData).then(r => this.close())
                } else {
                  this.close()
                }
              }
            })
          }
        }, () => {
          this.isBtnLoading = false
        })
      }
    },
    close() {
      // 向上找到 drawer 、调用destroy方法
      let drawer = CommonUtil.findComponentUpward(this, 'Drawer')
      if (drawer) {
        drawer.visible = false
      }
    },
    handleGoBackClick() {
      let targetForm = CommonUtil.findComponentDownward(this, 'm-form-')
      if (this.beforeBack && targetForm && targetForm.getDatas) {
        this.beforeBack(targetForm.getDatas()).then(r => {
          if (r) {
            this.close()
          }
        })
      } else {
        this.close()
      }
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
