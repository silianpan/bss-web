<template>
  <div style="padding:16px;">
    <Form ref="form" :model="formDatas" :label-width="110" :rules="rules">
      <Row>
        <i-col span="12">
          <FormItem label="名称" prop="name">
            <Input v-model="formDatas.name" placeholder="" />
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="类型" prop="type">
            <Tag color="blue">{{formDatas.typeName}}</Tag>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="8">
          <FormItem label="年份" prop="year">
            <DatePicker v-model="formDatas.yearShow" type="year" placeholder="" style="width: 200px"></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="8">
          <FormItem label="是否公开" prop="open">
            <i-switch v-model="formDatas.open">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </i-col>
        <i-col span="8">
          <FormItem label="点击次数" prop="hits">
            <Tag color="volcano">{{formDatas.hits || 0}}</Tag>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem :label="deptShowFlag ? '所属区域' : '本级'" prop="area">
            <GcsDropDown v-model="formDatas.areaName" :data="areaTree" menuLabelField="name" @on-item-click="areaMenuClick"></GcsDropDown>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem :label="formDatas.typeName + '级别'" prop="level">
            <RadioGroup v-model="formDatas.level" @on-change="changeLv">
              <Radio :disabled="lvDisabled" label="totalLv">总{{ formDatas.typeName }}</Radio>
              <Radio :disabled="lvDisabled" label="thisLv">本级{{ formDatas.typeName }}</Radio>
              <Radio :disabled="lvDisabled" label="deptLv">部门{{ formDatas.typeName }}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="12">
          <FormItem label="所属部门" prop="dept" v-if="deptShowFlag">
            <GcsDropDown v-model="formDatas.deptName" :data="deptTree" menuLabelField="name" @on-item-click="deptMenuClick"></GcsDropDown>
          </FormItem>
        </i-col>
        <i-col span="12">
          <FormItem label="所属文件夹" prop="dir" v-if="false">
            <i-input v-model="formDatas.dirName" disabled placeholder="">
              <Button type="primary" slot="append" @click="$refs.budgetDirModal.show()">选择</Button>
            </i-input>
          </FormItem>
        </i-col>
      </Row>
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
    <Alert v-if="showError" class="mt-8" type="error" show-icon>文件尚未上传完毕，请等待</Alert>
    <div class="mt-8" style="background:#fff">
      <WebFileUploadContainer @on-delete="removeTableRow" show-opt :data="tableData"></WebFileUploadContainer>
    </div>
    <div v-if="isEdit" style="padding-top: 16px; position: relative;">
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
    <BudgetDirModal ref="budgetDirModal" :checkedId="formDatas.dirId" @on-modal-ok="dirClickOk"></BudgetDirModal>
  </div>
</template>

<script>
import '../style/budget-form.less'

import FormMixin from '@/mixins/form'
import CommonUtil from '@/utils/CommonUtil'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import GcsDropDown from '@/components/GcsDropDown'
import CustomUpload from '@/components/FileUpload/Upload'
import BudgetDirModal from './budget-dir-modal'
import WebFileUploadContainer from '@/components/FileUpload/FileList'
import AdviceItem from '../advice/advice-item'
import AdviceForm from '../advice/advice-form'
import FeedBackInfo from '../feed-back/feed-back-info'

import GovBudgetService from '@/api/sys/budget/gov-budget'
import AreaService from '@/api/sys/area'
import GovDeptService from '@/api/sys/gov-dept/index'
import FileUploadService from '@/api/file/file-upload'
import ReNodeFileService from '@/api/file/re-node-file'
import NpcAdvicesService from '@/api/sys/npc/advices'

export default {
  name: 'm-form-budget',
  mixins: [FormMixin],
  components: {
    GcsDropDown,
    CustomUpload,
    BudgetDirModal,
    WebFileUploadContainer,
    AdviceItem
  },
  data() {
    return {
      formalFileUploadUrl: FileUploadService.uploadTempFileUrl,
      formDatas: {},
      rules: {
        name: [{
          required: true,
          message: '请填写部门名称',
          trigger: 'blur'
        }],
        area: [{
          required: true,
          validator: this.validateArea
        }],
        dept: [{
          required: true,
          validator: this.validateDept
        }]
      },
      areaTree: [],
      deptTree: [],
      fileList: [],
      dir: {
        formId: CommonUtil.uuid()
      },
      dirModal: false,
      showError: false,
      adviceList: [],
      adviceLoading: false,
      page: {
        totalRecords: 0,
        pageSize: 3,
        pageNum: 1
      },
      lvDisabled: false,
      deptShowFlag: false
    }
  },
  methods: {
    initData() {
      if (this.isEdit) {
        this.loadLv()
        this.loadFileList()
        this.loadAdviceList()
      } else {
        this.formDatas.level = 'deptLv'
        this.deptShowFlag = true
      }
      this.loadAreaTree()
      this.loadDeptTree()
    },
    getDatas() {
      let fileList = this.$store.getters.getFormUploadFileTokens(this.dir.formId)
      this.formDatas.year = this.$moment(this.formDatas.yearShow).year()
      if (this.$_.isNaN(this.formDatas.year)) {
        this.formDatas.year = this.$moment().year()
      }
      this.formDatas.appendix = !this.$_.isEmpty(fileList)
      return Object.assign({}, {
        govBudget: this.formDatas,
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
    validateArea(rule, value, callback) {
      if (this.$_.isNil(this.formDatas.areaId)) {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    },
    validateDept(rule, value, callback) {
      if (this.$_.isNil(this.formDatas.govDeptId) && this.formDatas.level === 'deptLv') {
        callback(new Error('部门预算请选择部门'))
      } else {
        callback()
      }
    },
    changeLv(value) {
      this.deptShowFlag = (value === 'deptLv')
      this.formDatas.govDeptId = null
    },
    loadLv() {
      // this.lvDisabled = true
      // if (!this.$_.isNil(this.formDatas.areaId) && !this.$_.isNil(this.formDatas.govDeptId)) {
      //   this.formDatas.level = 'deptLv'
      //   this.deptShowFlag = true
      // } else {
      //   this.formDatas.level = 'thisLv'
      //   this.deptShowFlag = false
      // }
      if (this.formDatas.level === 'deptLv') {
        this.deptShowFlag = true
      } else {
        this.deptShowFlag = false
      }
    },
    loadFileList() {
      GovBudgetService.findFileByNodeId(this.formDatas.id).then(res => {
        if (res.ok()) {
          this.fileList = res.data
        }
      })
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
    loadAreaTree() {
      AreaService.queryAreaTree().then(res => {
        if (res.ok()) {
          this.areaTree = Object.assign([], res.data)
        }
      })
    },
    loadDeptTree() {
      GovDeptService.getTopDeptByArea(this.formDatas.areaId).then(res => {
        if (res.ok()) {
          this.deptTree = Object.assign([], res.data)
        }
      })
    },
    areaMenuClick(node) {
      this.formDatas.areaId = node.id
      this.$set(this.formDatas, 'deptName', '')
      this.formDatas.govDeptId = null
      this.loadDeptTree()
      this.$refs.form.validateField('area')
    },
    deptMenuClick(node) {
      this.formDatas.govDeptId = node.id
    },
    dirClickOk(dir, parents) {
      parents.push(dir)
      let dirName = parents.map(dir => dir.dirName).join('/')
      this.formDatas.dirId = dir.id
      this.$set(this.formDatas, 'dirName', dirName)
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
  },
  computed: {
    isEdit() {
      return !this.$_.isNil(this.formDatas.id)
    },
    uploadFileQueue() {
      return this.$store.getters.getUploadFilesByFormId(this.dir.formId)
    },
    tableData() {
      let tableData = [
        ...this.uploadFileQueue,
        ...this.fileList
      ]
      return tableData
    }
  }
}
</script>

<style>
</style>
