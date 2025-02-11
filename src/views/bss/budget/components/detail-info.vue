<template>
  <div style="width: 100%;height:100%;" class="i-scrollbar-hide">
    <div class="preview-div">
      <div v-if="previewFlag" style="width:100%;height: 100%;position:relative">
        <on-line-cmp :file-path="selectedFile.path" :file-name="selectedFile.fileName"></on-line-cmp>
      </div>
      <div v-else class="no-preview">
        预览界面
      </div>
    </div>
    <div class="info-div">
      <div class="base-div">
        <div>
          <h3>{{data.name}} </h3>
        </div>
        <Card class="mt-8 font14">
          <Row>
            <i-col span="12">
              <div>
                <span>类型:</span>
                <span class="ml-16" style="color:#5cadff">{{data.typeName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>所属单位:</span>
                <span class="ml-16" style="color:#5cadff">{{data.deptName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div class="mt-8">
                <span>区域:</span>
                <span class="ml-16" style="color:#5cadff">{{data.areaName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div class="mt-8">
                <span>点击量:</span>
                <span class="ml-16">
                  <Tag color="cyan">
                    <Icon style="margin-right: 2px; position: relative; bottom: 2px" custom="iconfont icon-dianjiliang" size="15"></Icon>
                    {{hitsNum}}
                  </Tag>
                </span>
              </div>
            </i-col>
            <i-col span="24">
              <div class="mt-8">
                <span>预算编制级别:</span>
                <span class="ml-16">{{budgetMakeLevel[data.level]}}</span>
              </div>
            </i-col>
            <i-col span="24">
              <div class="mt-8">
                <span>上报日期:</span>
                <span class="ml-16">{{this.$moment(data.crtTime).format('YYYY年MM月DD日')}}</span>
              </div>
            </i-col>
          </Row>
        </Card>
      </div>
      <div class="file-div">
        <Spin v-if="fileLoading" large fix></Spin>
        <Row>
          <i-col span="12">
            <Icon type="md-attach" />附件
          </i-col>
          <i-col style="text-align: right" span="12">
            <Button @click="handleDownloadClick" :disabled="this.$_.isEmpty(this.selectedFile)" type="success" ghost size="small">下载</Button>
          </i-col>
        </Row>
        <Card class="mt-8 font14">
          <div v-if="$_.isEmpty(fileList)" style="text-align: center">暂无文件</div>
          <Row :gutter="16" v-else>
            <i-col style="text-align: center" v-for="item in fileList" :key="item.id" span="6">
              <div :class="['file-item', item.id === selectedFile.id ? 'file-selected' : '' ]" @click="selectedFile = item">
                <div :class="['file-img', `ext-${item.extName}`]"></div>
                <div class="file-name">{{item.fileName}}</div>
              </div>
            </i-col>
          </Row>
        </Card>
      </div>
      <div class="advice-div">
        <Spin v-if="adviceLoading" large fix></Spin>
        <Row>
          <i-col span="12">
            <Icon type="md-recording" />意见
          </i-col>
          <i-col style="text-align: right" span="12">
            <Button v-has-per="['bss-budget-advice-add-btn']" @click="addAdvice" type="primary" ghost size="small">新增意见</Button>
          </i-col>
        </Row>
        <Card class="mt-8 font14">
          <div v-if="$_.isEmpty(adviceList)" style="text-align: center">暂无意见</div>
          <Timeline v-else :pending="adviceList.length < page.totalRecords">
            <TimelineItem v-for="item in adviceList" :key="item.id">
                <advice-item :data="item"
                  @advice-del="handleAdviceDeleteClick"
                  @advice-edit="handleAdviceEditClick"
                  @advice-replied="handleAdviceRepliedClick"
                  >
                </advice-item>
            </TimelineItem>
            <TimelineItem v-if="adviceList.length < page.totalRecords">
              <a href="javascript:;" style="text-decoration: underline" @click="showMoreAdvice">查看更多</a>
            </TimelineItem>
        </Timeline>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import GovBudgetService from '@/api/sys/budget/gov-budget'
import NpcAdvicesService from '@/api/sys/npc/advices'
import FileUploadService from '@/api/file/file-upload'
import OnLineCmp from '@/components/OnLine'

import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import AdviceItem from '../advice/advice-item'
import AdviceForm from '../advice/advice-form'
import FeedBackInfo from '../feed-back/feed-back-info'
import { budgetMakeLevel } from '../type-to-name'

export default {
  components: {
    AdviceItem,
    OnLineCmp
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      budgetMakeLevel,
      previewFlag: false,
      hitsNum: 0,
      fileList: [],
      selectedFile: {},
      adviceList: [],
      fileLoading: false,
      adviceLoading: false,
      page: {
        totalRecords: 0,
        pageSize: 3,
        pageNum: 1
      }
    }
  },
  methods: {
    initData() {
      this.addHits()
      this.loadFileList()
      this.loadAdviceList()
    },
    addHits() {
      GovBudgetService.addBudgetHits(this.data.id).then(res => {
        if (res.ok()) {
          this.data.hits = res.data.hits
          this.hitsNum = res.data.hits
        }
      })
    },
    loadFileList() {
      this.fileLoading = true
      GovBudgetService.findFileByNodeId(this.data.id).then(res => {
        if (res.ok()) {
          this.fileList = res.data
          this.fileLoading = false
          this.findPreviewAvalibleFile()
        }
      })
    },
    findPreviewAvalibleFile() {
      if (this.$_.isEmpty(this.fileList)) {
        this.previewFlag = false
      } else {
        let flag = false
        for (let file of this.fileList) {
          if (this.previewAvalible(file)) {
            this.selectedFile = file
            flag = true
            break
          }
        }
        this.previewFlag = flag
      }
    },
    previewAvalible(file) {
      let previewAvalibleList = this.$store.state['bss-app'].previewAvalibleList
      return previewAvalibleList.indexOf(file.extName) !== -1
    },
    loadAdviceList() {
      let params = {
        current: this.page.pageNum,
        size: this.page.pageSize,
        conditions: [
          { field: 'target_id', value: this.data.id }
        ]
      }
      NpcAdvicesService.pageInfo(params).then(res => {
        if (res.ok()) {
          this.adviceList = res.data.records
          this.page.totalRecords = res.data.total
          this.adviceLoading = false
        }
      })
    },
    showMoreAdvice() {
      this.adviceLoading = true
      let params = {
        current: ++this.page.pageNum,
        size: this.page.pageSize
      }
      NpcAdvicesService.pageInfo(params).then(res => {
        if (res.ok()) {
          this.adviceList = this.adviceList.concat(res.data.records)
          this.adviceLoading = false
        }
      })
    },
    handleDownloadClick() {
      FileUploadService.download(this.selectedFile.fileName + '.' + this.selectedFile.extName, this.selectedFile.path)
    },
    addAdvice() {
      let drawerOption = {
        title: '新增意见',
        width: 28.5
      }
      let formDatas = {
        targetId: this.data.id,
        targetType: this.data.type
      }
      this.openDrawer(drawerOption, formDatas)
    },
    openDrawer(drawerOption, data) {
      let drawer = DynamicDrawerUtil.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        maskClosable: false,
        components: { AdviceForm, ActionFormContainer },
        render: (h) => {
          return (
            <action-form-container beforeBack={this.handleAdviceDrawerClose} saveAction={this.handleAdviceSaveClick} >
              <advice-form data={ data }></advice-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    handleAdviceDrawerClose(formDatas) {
      return new Promise((resolve) => {
        if (formDatas && !this.$_.isEmpty(formDatas.fileList)) {
          this.$Modal.confirm({
            title: '提示',
            content: '有文件尚未保存,是否关闭?',
            onOk: () => {
              resolve(true)
            }
          })
        } else {
          resolve(true)
        }
      })
    },
    async handleAdviceSaveClick(formDatas) {
      let res = await NpcAdvicesService.saveAdvice(formDatas)
      if (res.ok()) {
        this.$Message.success('保存成功')
        this.page.pageNum = 1
        this.loadAdviceList()
      }
      return res.ok()
    },
    handleAdviceDeleteClick(data) {
      NpcAdvicesService.logicDelete(data.id).then(res => {
        if (res.ok()) {
          this.$Message.success('删除成功')
          this.page.pageNum = 1
          this.loadAdviceList()
        }
      })
    },
    handleAdviceEditClick(data) {
      let drawerOption = {
        title: '修改意见',
        width: 28.5
      }
      let formDatas = {
        ...data
      }
      this.openDrawer(drawerOption, formDatas)
    },
    handleAdviceRepliedClick(data) {
      let drawer = DynamicDrawerUtil.newInstance({
        title: `反馈详情`,
        width: 28.5,
        maskClosable: false,
        components: { FeedBackInfo },
        render: (h) => {
          return (
            <feed-back-info data={ data }></feed-back-info>
          )
        }
      }, this)
      drawer.show()
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
@import url('../style/detail-info.less');
</style>
