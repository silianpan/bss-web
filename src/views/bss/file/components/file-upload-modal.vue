<!--  -->
<template>
<div class="file-upload-modal-container">
  <Modal :mask="false" v-model="modalMax" footer-hide :width="modalWidth" :closable="false" scrollable :transition-names="['slide-down','slide-up']" class-name="right-bottom-modal">
    <div slot="header">
      <div class="header-text">
        <span v-if="uploadedCnt === allCnt">上传完成</span>
        <span v-else>正在上传({{`${uploadedCnt}/${allCnt}`}})</span>
      </div>
      <div class="dialog-actions">
        <span @click="handleMinMaxClick" class="dialog-maxing" style="display:in-line">
          <Icon size="20" style="font-weight:bold" type="md-remove" />
        </span>
        <span @click="handleClose" class="dialog-close" style="margin-left:4px">
          <Icon size="20" style="font-weight:bold" type="md-close" />
        </span>
      </div>
    </div>

    <div style="position:relative;font-size:14px">
      <div class="tip tip-success">
        <div class="tip-text">
          有{{uploadedCnt}}个文件上传成功
          <!--  -->
        </div>
        <!-- <Icon class="ivu-alert-close" size="16" type='md-close'></Icon> -->
      </div>
      <WebFileUploadContainer :data="uploadFilesQueue"></WebFileUploadContainer>
    </div>
  </Modal>

  <Modal :mask="false" v-model="modalMin" footer-hide :width="modalWidth" :closable="false" :transition-names="['slide-down','slide-up']" class-name="right-bottom-modal">
    <div slot="header">
      <div class="header-progress" :style="{width:`${averageSpeed }%`,display: averageSpeed===0 ? 'none':'block'}"></div>
      <div class="header-text">
        <span v-if="uploadedCnt === allCnt">上传完成</span>
        <span v-else>正在上传({{`${uploadedCnt}/${allCnt}`}})</span>
      </div>
      <div class="dialog-actions">
        <span @click="handleMinMaxClick" class="dialog-minising" style="display:in-line">
          <Icon size="20" style="font-weight:bold" type="md-square-outline" />
        </span>
        <span  @click="handleClose" class="dialog-close" style="margin-left:4px">
          <Icon size="20" style="font-weight:bold" type="md-close" />
        </span>
      </div>
    </div>
    <div class="tip tip-success" style="font-size:14px">
      <div v-if="uploadedCnt === allCnt " class="tip-text">
        有{{uploadedCnt}}个文件上传成功
      </div>
      <!-- <Icon class="ivu-alert-close" size="16" type='md-close'></Icon> -->
    </div>
  </Modal>
</div>
</template>

<script>
import WebFileUploadContainer from '@/components/FileUpload/FileList'

export default {
  props: {},
  components: {
    WebFileUploadContainer
  },
  data() {
    return {
      modalMax: false,
      modalMin: false,
      modalWidth: 633
    }
  },
  methods: {

    show() {
      if (!this.modalMax && !this.modalMin) {
        this.modalMax = true
        this.modalMin = false
      }
    },

    handleMinMaxClick() {
      this.modalMax = !this.modalMax
      this.modalMin = !this.modalMax
    },
    handleClose() {
      this.modalMax = false
      this.modalMin = false
    }
  },
  mounted: function () {},
  computed: {
    allCnt() {
      return this.uploadFilesQueue.length
    },

    averageSpeed() {
      let sumSpeed = 0
      let avgSpeed = 0
      for (let i = 0; i < this.uploadFilesQueue.length; i++) {
        let f = this.uploadFilesQueue[i]
        sumSpeed += f.percentage
      }
      if (this.uploadFilesQueue.length !== 0) {
        avgSpeed = sumSpeed / this.uploadFilesQueue.length
      }
      return avgSpeed === 100 ? 0 : avgSpeed
    },
    uploadedCnt() {
      return this.$_.filter(this.uploadFilesQueue || [], (f) => f.status === 'success').length
    },
    uploadFilesQueue() {
      return Object.values(this.$store.state['up-load'].uploadFilesQueue)
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-actions {
  color: grey;
  top: 13px;
  position: absolute;
  right: 12px
}

.header {
  &-text {
    color: grey;
    padding: 14px 16px;
    position: relative;
  }

  &-progress {
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    *height: 49px;
    background: #87c4fb;
    transition: width .2s
  }

}

.tip {
  position: relative;

  &-success {
    background: #62a3ff;
    color: white;
  }

  &-text {
    height: 35px;
    width: 75%;
    line-height: 35px;
    text-indent: 15px;
    text-overflow: ellipsis
  }
}
</style>
