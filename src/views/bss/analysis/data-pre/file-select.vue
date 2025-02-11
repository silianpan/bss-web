<!-- 选择附件解析 -->
<template>
  <div style="width: 100%;height:100%;" class="i-scrollbar-hide">
    <div class="info-div">
      <div class="base-div">
        <div>
          <h3>{{ data.name }}</h3>
        </div>
        <Card class="mt-8 font14">
          <Row>
            <i-col span="12">
              <div>
                <span>类型:</span>
                <span class="ml-16" style="color:#5cadff">{{
                  data.typeName
                }}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>所属单位:</span>
                <span class="ml-16" style="color:#5cadff">{{
                  data.deptName
                }}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div class="mt-8">
                <span>区域:</span>
                <span class="ml-16" style="color:#5cadff">{{
                  data.areaName
                }}</span>
              </div>
            </i-col>
            <i-col span="24">
              <div class="mt-8">
                <span>预算编制级别:</span>
                <span class="ml-16">{{budgetMakeLevel[data.level]}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div class="mt-8">
                <span>上报日期:</span>
                <span class="ml-16">{{
                  this.$moment(data.crtTime).format('YYYY年MM月DD日')
                }}</span>
              </div>
            </i-col>
          </Row>
        </Card>
      </div>
      <div class="file-div">
        <Spin v-if="fileLoading" large fix></Spin>
        <Row>
          <i-col span="12">
            <Icon type="md-attach" />附件 </i-col>
          <i-col style="text-align: right" span="12">
            <Button @click="handleDownloadClick" :disabled="this.$_.isEmpty(this.selectedFile)" type="success" ghost size="small">下载</Button>
          </i-col>
        </Row>
        <Card class="mt-8 font14">
          <div v-if="$_.isEmpty(fileList)" style="text-align: center">
            暂无文件
          </div>
          <Row :gutter="16" v-else>
            <i-col style="text-align: center" v-for="item in fileList" :key="item.id" span="6">
              <div :class="[
                  'file-item',
                  item.id === selectedFile.id ? 'file-selected' : ''
                ]" @click="selectFileClick(item)">
                <div :class="['file-img', `ext-${item.extName}`]"></div>
                <div class="file-name">{{ item.fileName }}</div>
              </div>
            </i-col>
          </Row>
        </Card>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import GovBudgetService from '@/api/sys/budget/gov-budget'
import FileUploadService from '@/api/file/file-upload'
import { budgetMakeLevel } from '@/views/bss/budget/type-to-name'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      budgetMakeLevel,
      fileLoading: false,
      selectedFile: {},
      fileList: []
    }
  },
  mounted() {
    this.loadFileList()
  },
  methods: {
    handleDownloadClick() {
      FileUploadService.download(
        this.selectedFile.fileName + '.' + this.selectedFile.extName,
        this.selectedFile.path
      )
    },
    loadFileList() {
      this.fileLoading = true
      GovBudgetService.findFileByNodeId(this.data.id).then(res => {
        if (res.ok()) {
          this.fileList = res.data
          this.findPreviewAvalibleFile()
          this.fileLoading = false
        }
      })
    },
    findPreviewAvalibleFile() {
      if (!this.$_.isEmpty(this.fileList)) {
        for (let file of this.fileList) {
          if (file.extName === 'xls' || file.extName === 'xlsx') {
            this.selectedFile = file
            this.$emit('on-select-file', this.selectedFile)
          }
        }
      }
    },
    selectFileClick(item) {
      this.selectedFile = item
      this.$emit('on-select-file', this.selectedFile)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../budget/style/detail-info.less');

.info-div {
  width: 100% !important;
}
</style>
