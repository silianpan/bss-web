<!--  -->
<template>
<div style="background: rgb(247, 247, 247)">
  <div style="padding:16px;">
    <div>
      <h3>{{data.title}} </h3>
    </div>
    <Card class="mt-8 font14">
      <Row>
        <i-col span="12">
          <div>
            <span>意见对象:</span>
            <span class="ml-16" style="color:#5cadff">{{data.budgetName}}</span>
          </div>
        </i-col>
         <i-col span="12">
          <div>
            <span>责任单位:</span>
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
            <span>人大代表姓名:</span>
            <span class="ml-16">{{data.npcMemberName}} </span>
          </div>
        </i-col>
        <i-col span="24">
          <div class="mt-8">
            <span>意见内容:</span>
            <span class="ml-16">{{data.content}}</span>
          </div>
        </i-col>
      </Row>
    </Card>
  </div>
  <div style="padding:0px 16px 16px 16px;position:relative">
    <div>
      <Icon type="md-attach" />意见附件
    </div>
     <Spin v-if="attachedloading" large fix></Spin>
    <div v-if="!$_.isEmpty(attachedList)" >
      <Card v-for="(item, index) in attachedList" :key="index" class="mt-8 font14">
        <div style="position:relative;">
          <span class="list-title">
            {{item.fileName}}
          </span>
          <span class="list-action">
            <Button type="text" @click="handleDownloadClick(item)">
               <Icon size="20" color="#5cadff" type="md-cloud-download" />
            </Button>
          </span>
        </div>
      </Card>
    </div>
    <div v-else style="text-align:center;color:grey;font-size:14px" >
      暂无附件
    </div>
  </div>
  <div style="padding:0px 16px 16px 16px;position:relative">
    <Spin v-if="feedbackloading" large fix></Spin>
    <div>
      <Icon type="md-recording" />
      反馈记录
    </div>
    <div class="mt-8">
      <Button   size="small" @click="handleAddFeedback">
        新增
      </Button>
    </div>
    <Card class="mt-8 font14" >
      <Timeline  v-if="!$_.isEmpty(feedBackItems)">
        <TimelineItem v-for="(item, index) in feedBackItems" :key="index">
          <npc-feed-back-item :data="item"  @on-modify="handleNpmFeedbackModify" @on-delete="handleNpmFeedbackDelete"></npc-feed-back-item>
        </TimelineItem>
      </Timeline>
      <div v-else>
        暂无反馈
      </div>
    </Card>
  </div>
</div>
</template>

<script>
import NpcFeedBackItem from '@/views/bss/npc/feed-back/components/feed-back-item'
import NpcFeedBackForm from '@/views/bss/npc/feed-back/components/feed-back-form'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import NpcAdvicesFeedbackService from '@/api/sys/npc/feedback'
import NpcAdvicesService from '@/api/sys/npc/advices'
import FileUploadService from '@/api/file/file-upload'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    NpcFeedBackItem
  },
  data() {
    return {
      // 意见反馈
      feedBackItems: [],
      // 意见附件
      attachedList: [],
      // 意见模块加载状态
      attachedloading: true,
      // 意见回复加载状态
      feedbackloading: true
    }
  },
  methods: {
    // 附件下载
    handleDownloadClick(file) {
      FileUploadService.download(file.fileName + '.' + file.extName, file.path)
    },
    async init() {
      this.queryAdviceFeedback()
      this.queryAdviceFiles()
    },
    // 查询意见附件
    async queryAdviceFiles() {
      if (!this.$_.isEmpty(this.data.id)) {
        this.attachedloading = true
        let rb = await NpcAdvicesService.listFiles(this.data.id)
        if (rb.ok()) {
          this.attachedList = rb.data
        }
        this.attachedloading = false
      }
    },
    // 查询代表意见回复
    async queryAdviceFeedback() {
      this.feedbackloading = true
      let adviceId = this.data.id
      if (!this.$_.isEmpty(adviceId)) {
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
        let rb = await NpcAdvicesFeedbackService.findAll(params)
        if (rb.ok()) {
          this.feedBackItems = rb.data || []
        }
      } else {
        this.feedBackItems = []
      }
      this.feedbackloading = false
    },

    showFeedbackDrawer(option, data) {
      let drawer = this.$dynamicDrawer.newInstance({
        title: option.title || '新增反馈',
        width: option.width || '800px',
        maskClosable: false,
        closable: false,
        components: { ActionFormContainer, NpcFeedBackForm },
        render: (h) => {
          return (
            <action-form-container afterSaveAction={this.handleFeedbackAfterSaveAction} beforeBack={this.handleFeedbackDrawerClose} saveAction={this.handleFeedbackSaveClick} >
              <npc-feed-back-form data={data}></npc-feed-back-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    // 新增意见反馈
    handleAddFeedback() {
      this.showFeedbackDrawer({
        title: '新增反馈'
      }, {
        adviceId: this.data.id
      })
    },
    // 删除意见反馈
    async handleNpmFeedbackDelete(data) {
      this.feedbackloading = true
      if (!this.$_.isEmpty(data.id)) {
        let rb = await NpcAdvicesFeedbackService.logicDelete(data.id)
        if (rb.ok()) {
          this.$Message.success('删除成功')
        }
        await this.queryAdviceFeedback()
        // 更改此意见的反馈状态
        if (this.$_.isEmpty(this.feedBackItems)) {
          await NpcAdvicesService.changeRepliedStatus(data.adviceId, false)
          this.$emit('on-refresh')
        }
      }
    },
    // 意见反馈 修改
    handleNpmFeedbackModify(data) {
      this.showFeedbackDrawer({
        title: '修改反馈'
      }, data)
    },
    handleFeedbackDrawerClose(formDatas) {
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
    async handleFeedbackAfterSaveAction(formDatas) {
      // 更改此意见的反馈状态
      let { adviceId } = formDatas.feedback
      if (!this.$_.isEmpty(adviceId) && this.$_.isEmpty(this.feedBackItems)) {
        await NpcAdvicesService.changeRepliedStatus(adviceId, true)
        this.$emit('on-refresh')
      }
      await this.queryAdviceFeedback()
    },
    // 保存反馈意见 操作
    async handleFeedbackSaveClick(formDatas) {
      let rb = await NpcAdvicesFeedbackService.saveForm(formDatas)
      if (rb.ok()) {
        this.$Message.success('操作成功')
      }
      return rb.ok()
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style lang="less" scoped>

.more-split {
  width: 100%;
  float: left;
  position: relative;
  display: block;
  top: 0;
  bottom: 0;
  border: 1px dashed #eee;

}

.advice {
  position: relative;
  transition: all .2s ease-in-out;
}

.advice-more {
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  transition: height .2s ease-in-out;
}

.advice-more-content {
  position: absolute;
  bottom: 0;
  left: 4px;
  right: 4px;
  text-align: center;
  cursor: pointer;
  padding: 5px 0;
}

.list-action {
  position: relative;
  float: right
}

.font14 {
  font-size: 14px;
}
</style>
