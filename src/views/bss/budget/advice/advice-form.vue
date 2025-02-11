<template>
  <div style="padding:16px;">
    <Form ref="form" :model="formDatas" :label-width="100" :rules="rules">
      <FormItem label="标题" prop="title">
        <Input v-model="formDatas.title" placeholder="" />
      </FormItem>
      <FormItem label="名字" prop="npcMemberName">
        <Input v-model="formDatas.npcMemberName" placeholder="" />
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input
          v-model="formDatas.content"
          type="textarea"
          :rows="4"
          placeholder=""
        />
      </FormItem>
    </Form>
    <CustomUpload type="drag" :action="formalFileUploadUrl" :dir="dir">
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
    <Alert v-if="showError" class="mt-8" type="error" show-icon
      >文件尚未上传完毕，请等待</Alert
    >
    <div class="mt-8" style="background:#fff">
      <WebFileUploadContainer
        @on-delete="removeTableRow"
        show-opt
        :data="tableData"
      ></WebFileUploadContainer>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import CustomUpload from '@/components/FileUpload/Upload'
import WebFileUploadContainer from '@/components/FileUpload/FileList'
import CommonUtil from '@/utils/CommonUtil'

import FileUploadService from '@/api/file/file-upload'
import ReNodeFileService from '@/api/file/re-node-file'
import NpcAdvicesService from '@/api/sys/npc/advices'

export default {
  name: 'm-form-advice',
  mixins: [FormMixin],
  components: {
    CustomUpload,
    WebFileUploadContainer
  },
  data() {
    return {
      formalFileUploadUrl: FileUploadService.uploadTempFileUrl,
      formDatas: {},
      rules: {
        title: [
          {
            required: true,
            message: '请填写意见标题',
            trigger: 'blur'
          }
        ],
        npcMemberName: [
          {
            required: true,
            message: '请填写您的姓名',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请填写内容',
            trigger: 'blur'
          }
        ]
      },
      showError: false,
      fileList: [],
      dir: {
        formId: CommonUtil.uuid()
      }
    }
  },
  methods: {
    beforeValidate() {
      this.showError = false
      return this.$store.getters.isFormFilesUploaded(this.dir.formId)
    },
    failValidate() {
      this.showError = true
    },
    getDatas() {
      let fileList = this.$store.getters.getFormUploadFileTokens(
        this.dir.formId
      )
      this.formDatas.fileList = fileList
      this.formDatas.appendix = !this.$_.isEmpty(fileList)
      return Object.assign(
        {},
        {
          npcAdvices: this.formDatas,
          fileList: fileList
        }
      )
    },
    loadFileList() {
      NpcAdvicesService.listFiles(this.formDatas.id).then(res => {
        if (res.ok()) {
          this.fileList = res.data
        }
      })
    },
    removeTableRow(row) {
      let { uid, reNodeFileId } = row
      let formId = this.dir.formId
      if (!this.$_.isEmpty(uid)) {
        this.$store.dispatch('deleteFormUploadfile', {
          formId,
          uid
        })
      }
      if (!this.$_.isEmpty(reNodeFileId)) {
        // 删除文件关系
        ReNodeFileService.logicDelete(reNodeFileId).then(rb => {
          if (rb.ok()) {
            this.$Message.success('删除成功')
            this.loadFileList()
          }
        })
      }
    }
  },
  mounted() {
    if (this.isEdit) {
      this.loadFileList()
    }
  },
  computed: {
    isEdit() {
      return !this.$_.isNil(this.formDatas.id)
    },
    uploadFileQueue() {
      return this.$store.getters.getUploadFilesByFormId(this.dir.formId)
    },
    tableData() {
      let tableData = [...this.uploadFileQueue, ...this.fileList]
      return tableData
    }
  }
}
</script>

<style></style>
