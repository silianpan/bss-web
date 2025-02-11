<template>
  <div class="info-div i-scrollbar-hide">
    <div class="feed-back-div">
      <Spin v-if="feedbackLoading" large fix></Spin>
      <Icon type="md-recording" />反馈
      <Card class="mt-8 font14">
        <div v-if="$_.isEmpty(feedbackList)" style="text-align: center">
          暂无反馈
        </div>
        <Timeline v-else>
          <TimelineItem v-for="item in feedbackList" :key="item.id">
            <feed-back-item
              :data="item"
              @feedback-file="handleFeedbackFileClick"
            ></feed-back-item>
          </TimelineItem>
        </Timeline>
      </Card>
    </div>
    <div class="file-div">
      <Spin v-if="fileLoading" large fix></Spin>
      <Row>
        <i-col span="12"> <Icon type="md-attach" />附件 </i-col>
        <i-col style="text-align: right" span="12">
          <ButtonGroup>
            <Button
              @click="handlePreviewClick"
              :disabled="previewDisabled"
              type="info"
              ghost
              size="small"
              >预览</Button
            >
            <Button
              @click="handleDownloadClick"
              :disabled="this.$_.isEmpty(this.selectedFile)"
              type="success"
              ghost
              size="small"
              >下载</Button
            >
          </ButtonGroup>
        </i-col>
      </Row>
      <Card class="mt-8 font14">
        <div v-if="$_.isEmpty(fileList)" style="text-align: center">
          暂无文件
        </div>
        <Row :gutter="16" v-else>
          <i-col
            style="text-align: center"
            v-for="item in fileList"
            :key="item.id"
            span="6"
          >
            <div
              :class="[
                'file-item',
                item.id === selectedFile.id ? 'file-selected' : ''
              ]"
              @click="selectedFile = item"
            >
              <div :class="['file-img', `ext-${item.extName}`]"></div>
              <div class="file-name">{{ item.fileName }}</div>
            </div>
          </i-col>
        </Row>
      </Card>
    </div>
  </div>
</template>

<script>
import NpcAdvicesFeedbackService from '@/api/sys/npc/feedback'
import FileUploadService from '@/api/file/file-upload'
import FeedBackItem from './feed-back-item'
import Config from '@/config'

export default {
  components: {
    FeedBackItem
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      feedbackLoading: false,
      fileLoading: false,
      feedbackList: [],
      fileList: [],
      selectedFile: {}
    }
  },
  methods: {
    loadFeedback() {
      this.feedbackLoading = true
      let adviceId = this.data.id
      let params = {
        conditions: [
          {
            field: 'adviceId',
            value: adviceId
          }
        ],
        orders: [
          {
            column: 'crt_time',
            asc: false
          }
        ]
      }
      NpcAdvicesFeedbackService.findAll(params).then(res => {
        if (res.ok()) {
          this.feedbackList = res.data
          this.feedbackLoading = false
        }
      })
    },
    handleFeedbackFileClick(data) {
      this.fileLoading = true
      NpcAdvicesFeedbackService.listFiles(data.id).then(res => {
        if (res.ok()) {
          this.fileList = res.data
          this.selectedFile = {}
          this.fileLoading = false
        }
      })
    },
    handlePreviewClick() {
      // 正式环境使用
      let serverPath = `http://192168100200.mysoft.com.cn/api/fileblocks/formal/${this.selectedFile.path}`
      window.open(`${Config.OfficeWebAppServer}${serverPath}`, '_blank')

      // libreoffice环境使用
      // window.open(Config.OfficeWebAppServer + '/loleaflet/dist/loleaflet.html?file_path=' + encodeURIComponent('file:///opt/lool/file-upload/formal/' + this.selectedFile.path))
    },
    handleDownloadClick() {
      FileUploadService.download(
        this.selectedFile.fileName + '.' + this.selectedFile.extName,
        this.selectedFile.path
      )
    }
  },
  mounted() {
    this.loadFeedback()
  },
  computed: {
    previewDisabled() {
      let previewAvalible = this.$store.state['bss-app'].previewAvalibleList
      if (this.$_.isEmpty(this.selectedFile)) {
        return true
      } else {
        return previewAvalible.indexOf(this.selectedFile.extName) === -1
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../style/feed-back-info.less');
</style>
