<template>
  <div class="w-h-100 file-preview-contain">
    <a-button type="primary" class="file-preview-btn" @click="downloadDoc">下载</a-button>
    <iframe v-if="pdfUrl" :src="pdfUrl" frameborder="0" class="w-h-100"></iframe>
  </div>
</template>

<script>
import Config from '@/config'
export default {
  name: 'SDocPreview',
  data() {
    return {
      pdfUrl: '',
      url: '',
      name: ''
    }
  },
  mounted() {
    const q = this.$route.query
    this.pdfUrl = q.viewerUrl + '?file=' + encodeURIComponent(q.fileUrl)
    this.url = q.url
    this.name = q.name
  },
  methods: {
    downloadDoc() {
      if (!this.isEmpty(this.name) && !this.isEmpty(this.url)) {
        const downloadUrl = Config.ServerApiPrefix + '/file/upload/download'
        const convertUrl = `${downloadUrl}?name=${this.name}&path=${this.url}`
        window.open(convertUrl, '_blank')
      } else {
        this.$message.error('文档不存在')
      }
    }
  }
}
</script>

<style scoped>
.w-h-100 {
  width: 100%;
  height: 100%;
}
.file-preview-contain {
  text-align: center;
  background-color: #404040;
  display: flex;
  flex-direction: column;
}
/* .file-preview-btn {
  margin: 1px 0 1px 0;
} */
</style>
