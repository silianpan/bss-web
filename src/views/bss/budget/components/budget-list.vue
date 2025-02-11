<template>
  <div class="wrapperMain">
    <div class="containerWrapper">
      <div class="leftWrapper">
        <div class="mainWrapper i-scrollbar-hide">
          <Spin fix v-if="conditionSpin" size="large"></Spin>
          <div class="container" v-else>
            <Tree v-if="!$_.isEmpty(conditions.yearTree.datas)" :data="conditions.yearTree.datas" @on-select-change="yearClick"></Tree>
            <Tree v-if="!$_.isEmpty(conditions.areaTree.datas)" :data="conditions.areaTree.datas" @on-select-change="areaClick"></Tree>
            <Tree ref="tree" v-if="!$_.isEmpty(conditions.deptTree.datas) && deptShowFlag" :data="conditions.deptTree.datas" @on-select-change="deptClick"></Tree>
          </div>
        </div>
      </div>
      <div class="rightWrapper">
        <div class="functionBar bottomLine">
          <div class="functionBarMain">
            <div class="leftGroup">
              <div class="formLabel">
                <ButtonGroup>
                  <Button @click="changeComponent" icon="ios-arrow-back" >返回</Button>
                  <Button v-has-per="['bss-budget-upload-btn']" type="primary" @click="uploadFile">上传文档</Button>
                </ButtonGroup>
              </div>
            </div>
            <div class="rightGroup">
              <div class="formLabel">
                <Select v-model="conForm.level" style="width:160px" @on-change="changeLv">
                  <Option value="totalLv">总{{ typeName }}</Option>
                  <Option value="thisLv">本级{{ typeName }}</Option>
                  <Option value="deptLv">部门{{ typeName }}</Option>
                </Select>
              </div>
              <div class="formLabel">
                <i-input
                  v-model="conForm.searchVal"
                  placeholder="输入名称"
                  style="width:260px"
                  class="searchCriminal"
                  search
                  @on-search="searchFile"
                ></i-input>
              </div>
              <div class="formLabel">
                <Button @click="showModelToggle">{{showModel?'列表显示':'图标显示'}}</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="container i-scrollbar-hide" style="position: relative; height: calc(100vh - 330px); overflow-y: auto">
          <Spin fix v-if="listSpin" size="large"></Spin>
          <template v-else>
            <div class="wrapperList" v-if="showModel">
              <template v-for="item in data">
                <div class="wrapperItem" v-if="$store.getters.hasPer(['bss-budget-show-form-btn'])" :key="item.id">
                  <div class="wrapperItemMain" @click="showRowForm(item)">
                    <div class="icon">
                      <i :class="['typeIcon',`ext-${item.extName}`]"></i>
                    </div>
                    <div class="name">
                      <Tooltip transfer max-width="300" :content="item.name">{{item.name | filterSlice(20)}}</Tooltip>
                    </div>
                  </div>
                </div>
                <div class="wrapperItem" v-else :key="item.id">
                  <div class="wrapperItemMain" @click="showRowDetail(item)">
                    <div class="icon">
                      <i :class="['typeIcon',`ext-${item.extName}`]"></i>
                    </div>
                    <div class="name">
                      <Tooltip transfer max-width="300" :content="item.name">{{item.name | filterSlice(20)}}</Tooltip>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="tableContainer" v-if="!showModel">
              <Table v-if="$store.getters.hasPer(['bss-budget-show-form-btn'])" :columns="columns" :data="data" @on-row-click="showRowForm"></Table>
              <Table v-else :columns="columns" :data="data" @on-row-click="showRowDetail"></Table>
            </div>
          </template>
        </div>
        <div class="pageContainer" style="position">
          <Page :total="page.totalRecords" :current="page.pageNum" show-total show-sizer show-elevator :page-size="page.pageSize" @on-change="listChangePage" @on-page-size-change="listChangePageSize" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../style/budget-list.less'
import { typeToName } from '../type-to-name'

import BudgetForm from './budget-form'
import DetailInfo from './detail-info'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import ActionFormContainer from '@/components/Form/ActionFormContainer'

import GovBudgetService from '@/api/sys/budget/gov-budget'
import GovDeptService from '@/api/sys/gov-dept/index'
import AreaService from '@/api/sys/area/index'
import NpcAdvicesService from '@/api/sys/npc/advices'

export default {
  props: {
    areaName: String,
    condition: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      conditionSpin: false,
      listSpin: false,
      query: {},
      typeName: '',
      showModel: true,
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },
        {
          title: '名称',
          width: 300,
          key: 'name',
          render: (h, { row }) => {
            return h('span', [
              h('i', {
                attrs: {
                  class: 'file-small-icon2 ' + 'ext-' + row.extName
                },
                style: {
                  display: 'inline-block'
                }
              }),
              h('span', row.name)
            ])
          }
        },
        {
          title: '点击次数',
          key: 'hits'
        },
        {
          title: '所属区域',
          key: 'areaName'
        },
        {
          title: '所属部门',
          key: 'deptName',
          render: (h, params) => {
            return h('span', this.$_.isNil(params.row.deptName) ? '-' : params.row.deptName)
          }
        },
        {
          title: '上传时间',
          key: 'crtTime'
        }
      ],
      data: [],
      formDrawer: null,
      areaInfo: {},
      conditions: {
        yearTree: {
          queryDataAction: this.initYearTree,
          datas: []
        },
        areaTree: {
          queryDataAction: this.initAreaTree,
          datas: []
        },
        deptTree: {
          queryDataAction: this.initDeptTree,
          datas: []
        }
      },
      conForm: {},
      // 分页信息
      page: {
        totalRecords: 0,
        pageSize: 10,
        pageNum: 1
      },
      deptShowFlag: false
    }
  },
  filters: {
    filterSlice(value, size) {
      if (value && value.length > size) {
        value = value.substring(0, size) + '…'
      }
      return value
    }
  },
  methods: {
    // 检查预算级别
    initConForm() {
      this.query = this.$route.query
      this.typeName = typeToName[this.query.type]
      this.conForm = {
        type: this.query.type,
        level: this.$_.isEmpty(this.condition.dept) ? 'totalLv' : 'deptLv',
        ...this.condition
      }
      this.deptShowFlag = !this.$_.isEmpty(this.condition.dept)
    },
    // 初始化条件
    async initCondition() {
      this.conditionSpin = true
      await this.initAreaInfo()
      for (const key in this.conditions) {
        if (this.conditions.hasOwnProperty(key)) {
          const element = this.conditions[key]
          if (this.$_.isFunction(element.queryDataAction)) {
            let data = await element.queryDataAction()
            if (!this.$_.isNil(data)) {
              this.conditions[key].datas = data
            }
          }
        }
      }
      this.conditionSpin = false
    },
    async initAreaInfo() {
      let res = await AreaService.findById(this.query.areaId)
      if (res.ok()) {
        this.areaInfo = res.data
      }
    },
    async initYearTree() {
      let yearRange = []
      let param = {
        conditions: [
          { field: 'type', value: this.query.type },
          { field: 'area_id', value: this.query.areaId }
        ]
      }
      let res = await GovBudgetService.listYears(param)
      if (res.ok()) {
        yearRange = res.data.map(item => ({
          title: item,
          selected: item === this.conForm.year.title
        }))
      }
      let treeData = !this.$_.isEmpty(yearRange) ? [
        {
          title: '年份',
          expand: true,
          children: yearRange
        }
      ] : []
      return treeData
    },
    async initAreaTree() {
      let areaData = []
      let res = await AreaService.getAreaChildren(this.query.areaId)
      if (res.ok()) {
        let areaChildren = res.data.map(item => ({
          title: item.name,
          ...item,
          selected: item.id === this.conForm.area.id
        }))
        areaData = [
          {
            ...this.areaInfo,
            title: this.areaInfo.name,
            selected: this.areaInfo.id === this.conForm.area.id,
            expand: true,
            children: areaChildren
          }
        ]
      }
      let treeData = [
        {
          title: '区域',
          expand: true,
          root: true,
          children: areaData
        }
      ]
      return treeData
    },
    async initDeptTree(areaId = this.condition.area.id) {
      if (this.$_.isNil(areaId)) {
        areaId = this.query.areaId
      }
      let govDept = []
      let res = await GovDeptService.getTopDeptByArea(areaId)
      if (res.ok()) {
        govDept = res.data.map(item => ({
          ...item,
          selected: item.id === this.conForm.dept.id
        }))
      }
      let treeData = !this.$_.isEmpty(govDept) ? [
        {
          title: '部门',
          expand: true,
          children: govDept
        }
      ] : [
        {
          title: '暂无部门数据',
          disabled: true
        }
      ]
      return treeData
    },
    // 选择条件
    yearClick(arr, node) {
      this.treeClick(node.selected, 'year', node)
    },
    async areaClick(arr, node) {
      this.conForm.dept = {}
      this.$set(this.conditions.deptTree, 'datas', node.selected && this.$_.isNil(node.root) ? await this.initDeptTree(node.id) : [])
      this.treeClick(node.selected, 'area', node)
    },
    deptClick(arr, node) {
      this.treeClick(node.selected, 'dept', node)
    },
    treeClick(isSelected, field, value) {
      this.page.pageNum = 1
      if (isSelected) {
        this.conForm[field] = value
      } else {
        this.conForm[field] = {}
      }
      this.initBudget()
    },
    changeLv(value) {
      const treeTitle = value === 'deptLv' || value === 'totalLv' ? '区域' : '本级'
      this.$set(this.conditions.areaTree.datas[0], 'title', treeTitle)
      this.page.pageNum = 1
      this.deptShowFlag = (value === 'deptLv')
      if (value === 'thisLv' || value === 'totalLv') {
        this.conForm.dept = {}
      } else {
        // 使用了v-if要等页面刷新完成
        this.$nextTick(() => {
          if (!this.$_.isEmpty(this.$refs.tree.getSelectedNodes())) {
            let node = this.$refs.tree.getSelectedNodes()[0]
            node.selected = false
          }
        })
      }
      this.initBudget()
    },
    searchFile() {
      this.page.pageNum = 1
      this.initBudget()
    },
    listChangePage(pageNum) {
      this.page.pageNum = pageNum
      this.initBudget()
    },
    listChangePageSize(size) {
      this.page.pageSize = size
      this.initBudget()
    },
    initBudget() {
      this.listSpin = true
      let params = {
        conditions: [
          { field: 'type', value: this.conForm.type },
          { field: 'year', value: this.conForm.year.title },
          { field: 'name', value: this.conForm.searchVal },
          { field: 'area_id', value: this.conForm.area.id },
          { field: 'dept_code', value: this.conForm.dept.code },
          { field: 'level', value: this.conForm.level }
        ],
        current: this.page.pageNum,
        size: this.page.pageSize
      }
      // 是否公开选项根据权限来显示
      if (!this.$store.getters.hasPer(['bss-budget-show-form-btn'])) {
        params.conditions.push({ field: 'open', value: true })
      }

      GovBudgetService.pageBudget(params).then(res => {
        if (res.ok()) {
          this.data = res.data.records
          this.page.totalRecords = res.data.total
        }
        this.listSpin = false
      })
    },
    changeComponent() {
      this.$emit('change-component', {
        component: 'BudgetCondition'
      })
    },
    showModelToggle() {
      this.showModel = !this.showModel
      this.initBudget()
    },
    showRowDetail(row) {
      let data = {
        typeName: this.typeName,
        ...row
      }
      let drawer = DynamicDrawerUtil.newInstance({
        title: `"${row.name}"详情`,
        width: 95,
        maskClosable: false,
        components: { DetailInfo },
        render: (h) => {
          return (
            <detail-info data={ data }></detail-info>
          )
        }
      }, this)
      drawer.show()
    },
    showRowForm(row) {
      let drawerOption = {
        title: '修改' + this.typeName,
        width: 1100
      }
      let formDatas = {
        typeName: this.typeName,
        yearShow: '' + row.year,
        ...row
      }
      this.openDrawer(drawerOption, formDatas)
    },
    uploadFile() {
      let drawerOption = {
        title: '新增' + this.typeName,
        width: 1100
      }
      let formDatas = {
        type: this.query.type,
        typeName: this.typeName,
        open: true,
        areaId: this.$route.query.areaId,
        areaName: this.areaName
      }
      this.openDrawer(drawerOption, formDatas)
    },
    openDrawer(drawerOption, data) {
      let delBtn = this.$_.isNil(data.id) ? <span></span> : <Button style="margin-left: 5px" onClick={ () => { this.handelBudgetDeleteClick(data) }} type="error" color="red">删除</Button>

      let drawer = DynamicDrawerUtil.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        maskClosable: false,
        components: { BudgetForm, ActionFormContainer },
        render: (h) => {
          return (
            <action-form-container beforeBack={this.handleBudgetDrawerClose} saveAction={this.handleBudgetSaveClick} >
              <template slot="external">
                { delBtn }
              </template>
              <budget-form data={ data }></budget-form>
            </action-form-container>
          )
        }
      }, this)
      this.formDrawer = drawer
      this.formDrawer.show()
    },
    handleBudgetDrawerClose(formDatas) {
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
    async handleBudgetSaveClick(formDatas) {
      let res = await GovBudgetService.saveBudget(formDatas)
      if (res.ok()) {
        this.$Message.success('保存成功')
        this.refreshBudget(formDatas.govBudget.level)
      }
      return res.ok()
    },
    async handelBudgetDeleteClick(data) {
      let adviceRes = await NpcAdvicesService.pageInfo({
        current: 1,
        size: 1,
        conditions: [
          { field: 'target_id', value: data.id }
        ]
      })
      let adviceList = adviceRes.data.records
      if (!this.$_.isEmpty(adviceList)) {
        this.$Notice.warning({
          title: '删除提示',
          desc: `该${this.typeName}已包含意见，不能删除，您可以修改“是否公开”选项来对外隐藏`,
          duration: 5
        })
      } else {
        let res = await GovBudgetService.logicDelete(data.id)
        if (res.ok()) {
          this.$Message.success('删除成功')
          this.refreshBudget()
          this.formDrawer.remove()
        } else {
          this.$Message.error('删除失败！请重试')
        }
      }
    },
    refreshBudget(level = this.conForm.level) {
      this.conForm = {
        type: this.query.type,
        level,
        year: {},
        dept: {},
        area: {}
      }
      this.initBudget()
      this.initCondition()
    }
  },
  mounted() {
    this.initConForm()
    this.initCondition()
    this.initBudget()
  },
  watch: {
    '$route': 'changeComponent'
  }
}
</script>

<style lang="less" scoped>
</style>
