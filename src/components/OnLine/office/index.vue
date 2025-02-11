<template>
  <div style="width:100%;height:100%">
    <Spin v-if="loading" fix large></Spin>
    <iframe
      @load="handleIframeOnLoad"
      :src="fileSrc"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import Config from '@/config'
// import Qs from 'qs'
export default {
  props: {
    filePath: String,
    fileName: String
  },
  components: {},
  data() {
    return {
      loading: false,
      format: ['xlxs', 'xlx', 'doc', 'docx', 'ppt', 'pptx']
    }
  },
  methods: {
    handleIframeOnLoad() {
      this.loading = false
    }
  },
  mounted: function() {
    this.loading = true
  },
  computed: {
    fileSrc() {
      // let params = {
      //   name: this.fileName || '',
      //   path: this.filePath
      // }
      // let serverPath = encodeURIComponent(`${window.location.origin}/api/file/upload/download?${Qs.stringify(params)}`)

      // 正式环境使用
      let serverPath = `http://192168100200.mysoft.com.cn/api/fileblocks/formal/${this.filePath}`
      return `${Config.OfficeWebAppServer}${serverPath}`

      // libreoffice环境使用
      // return Config.OfficeWebAppServer + '/loleaflet/dist/loleaflet.html?file_path=' + encodeURIComponent('file:///opt/lool/file-upload/formal/' + this.filePath)
    }
  }
}
</script>
