<!--  -->
<template>
<div style="padding:16px;">
  <Form ref="form" label-colon :model="formDatas" :label-width="100" :rules="formRules">
    <Row>
      <i-col :xs="24" :sm="24">
        <FormItem label="反馈标题" prop="title">
          <Input v-model="formDatas.title" placeholder="反馈标题" />
        </FormItem>
      </i-col>
    </Row>
  </Form>

  <CustomUpload class="mt-8" type="drag" :action="tempFileUploadUrl" :dir="dir">
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="52" style="color: #e64646"></Icon>
      <p>点击或拖动文件至此</p>
    </div>
  </CustomUpload>
  <div class="mt-8">
    <Icon type="md-attach" />
    <span>
      附件
    </span>
  </div>
  <Alert v-if="showError" class="mt-8" type="error" show-icon>文件尚未上传完毕，请等待</Alert>
  <div class="mt-8" style="background:#fff">
    <WebFileUploadContainer @on-delete="handleDelete" show-opt :data="uploadFilesQueue"></WebFileUploadContainer>
  </div>
  <!--  -->
</div>
</template>

<script>
import CustomUpload from '@/components/FileUpload/Upload'
import FileUploadService from '@/api/file/file-upload'
import WebFileUploadContainer from '@/components/FileUpload/FileList'
import FormMixin from '@/mixins/form'
import CommonUtil from '@/utils/CommonUtil'
import ReNodeFileService from '@/api/file/re-node-file'
import NpcAdvicesFeedbackService from '@/api/sys/npc/feedback'
export default {
  name: 'm-form-feed-back',
  mixins: [FormMixin],
  props: {},
  components: {
    CustomUpload,
    WebFileUploadContainer
  },
  data() {
    return {
      // 默认表单值
      defaultFormValue: {},
      // 是否展示错误提示
      showError: false,
      // 目录
      dir: {
        formId: CommonUtil.uuid()
      },
      // 附件信息
      attachedList: [],
      // 临时文件上传地址
      tempFileUploadUrl: FileUploadService.uploadTempFileUrl,
      // 基础表单信息
      formDatas: {},
      // 表单验证规则
      formRules: {
        title: [{
          type: 'string',
          required: true,
          message: '反馈标题不能为空'
        }]
      }

    }
  },
  methods: {
    getDatas() {
      let fileList = this.$store.getters.getFormUploadFileTokens(this.dir.formId)
      let formDatas = this.formDatas
      this.formDatas.appendix = !this.$_.isEmpty(fileList)
      return Object.assign({}, {
        feedback: formDatas,
        fileList: fileList
      })
    },
    beforeValidate() {
      this.showError = false
      return this.$store.getters.isFormFilesUploaded(this.dir.formId)
    },
    failValidate() {
      this.showError = true
    },
    listFiles() {
      if (!this.$_.isEmpty(this.formDatas.id)) {
        NpcAdvicesFeedbackService.listFiles(this.formDatas.id).then(rb => {
          if (rb.ok()) {
            this.attachedList = rb.data || []
          }
        })
      }
    },
    handleDelete(file) {
      let { uid, reNodeFileId } = file
      let formId = this.dir.formId
      if (!this.$_.isEmpty(uid)) {
        this.$store.dispatch('deleteFormUploadfile', {
          formId,
          uid
        })
      } else if (!this.$_.isEmpty(reNodeFileId)) {
        // 删除文件关系
        ReNodeFileService.logicDelete(reNodeFileId).then(rb => {
          if (rb.ok()) {
            this.$Message.success('删除成功')
            this.listFiles()
          }
          // 重新刷新 已有的附件
        })
      }
    }

  },
  mounted: function () {
    this.listFiles()
  },
  computed: {
    uploadFilesQueue() {
      return [...this.$store.getters.getUploadFilesByFormId(this.dir.formId), ...this.attachedList]
    }
  }
}
</script>

<style  scoped>
</style>
