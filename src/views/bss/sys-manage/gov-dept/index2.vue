<!--  -->
<template>
  <div class="i-layout-content-main ">
    <Card :bordered="false">
      <p slot="title">
        <span>政府机构管理</span>
      </p>
      <Row class="mt-8">
        <organization-chart class="i-scrollbar-hide" :datasource="treeData">
          <template slot-scope="{ nodeData }">
            <div v-if="$_.isNil(nodeData.areaId) && nodeData.isRoot" style="background:#fff;padding:12px">
              {{nodeData.name}}
            </div>
            <template v-if="$_.isNil(nodeData.areaId) && !nodeData.isRoot">
              <Poptip transfer trigger="hover" placement="right-start" style="background:#fff;padding:12px">
                <div style="color: #4a8beb;">
                  <custom-icon :type="`iconfont icon-quyuguanli`"></custom-icon> {{nodeData.name}}
                </div>
                <div class="api" slot="content">
                  <List>
                    <Spin v-if="btnLoading" fix ></Spin>
                    <ListItem style="cursor:pointer">
                      <div @click="addTop(nodeData)">
                        <Icon class="mr-16" type="md-add"></Icon>添加顶级部门
                      </div>
                    </ListItem>
                  </List>
                </div>
              </Poptip>
            </template>
            <template v-if="!$_.isNil(nodeData.areaId)">
              <Poptip transfer trigger="hover" placement="right-start" style="background:#fff;padding:12px">
                <div style="color: #e64646;">
                  <custom-icon :type="`iconfont icon-jigou` "></custom-icon> {{nodeData.name}}
                </div>
                <div class="api" slot="content">
                  <List>
                    <Spin v-if="btnLoading" fix ></Spin>
                    <ListItem style="cursor:pointer">
                      <div @click="addBrother(nodeData)">
                        <Icon class="mr-16" type="md-add"></Icon>添加同级部门
                      </div>
                    </ListItem>
                    <ListItem  style="cursor:pointer">
                      <div @click="addChild(nodeData)">
                        <Icon  class="mr-16" type="md-add"></Icon>添加下级部门
                      </div>
                    </ListItem>
                    <ListItem  style="cursor:pointer">
                      <div @click="modify(nodeData)">
                        <Icon  class="mr-16" type="ios-create"></Icon>修改部门
                      </div>
                    </ListItem>
                    <ListItem  style="cursor:pointer">
                      <div @click="deleteDept(nodeData)">
                        <Icon  class="mr-16" type="md-trash"></Icon>删除部门
                      </div>
                    </ListItem>
                  </List>
                </div>
              </Poptip>
            </template>
          </template>
        </organization-chart>
      </Row>
    </Card>
  </div>
</template>

<script>
import GovDeptService from '@/api/sys/gov-dept/index'
import GovDeptForm from './components/gov-dept-form'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import ActionFormContainer from '@/components/Form/ActionFormContainer'

export default {
  components: {
    OrganizationChart
  },
  props: {},
  data() {
    return {
      btnLoading: false,
      treeData: {
        id: 0,
        name: '政府机构管理',
        isRoot: true,
        expand: true,
        children: []
      },
      deptData: []
    }
  },
  methods: {
    loadTree() {
      this.btnLoading = false
      GovDeptService.getFusionTree().then(res => {
        this.deptData = Object.assign([], res.data)
        this.treeData.children = this.deptData
      })
    },
    // 点击树的操作
    addTop(node) {
      this.btnLoading = true
      let drawerOption = {
        title: '添加顶级部门',
        width: 1000
      }
      let formDatas = {
        areaId: node.id,
        areaName: node.name,
        enabled: true,
        areaDisabled: true
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: '' })
    },
    addBrother(node) {
      this.btnLoading = true
      let currentCode = []
      if (!node.pid !== '-1') {
        currentCode = node.code.split('-')
        currentCode.pop()
      }
      let drawerOption = {
        title: '添加同级部门',
        width: 1000
      }
      let formDatas = {
        pid: node.pid,
        areaId: node.areaId,
        areaName: node.areaName,
        enabled: true
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: currentCode.join('-') })
    },
    addChild(node) {
      this.btnLoading = true
      let drawerOption = {
        title: '添加下级部门',
        width: 1000
      }
      let formDatas = {
        pid: node.id,
        areaId: node.areaId,
        areaName: node.areaName,
        enabled: true
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: node.code })
    },
    modify(node) {
      this.btnLoading = true
      let formDatas = {
        ...node,
        deptDisabled: true
      }
      let currentCode = node.code.split('-')
      formDatas.code = currentCode.pop()
      let drawerOption = {
        title: '修改部门信息',
        width: 1000
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: currentCode.join('-') })
    },
    deleteDept(node) {
      this.$Modal.info({
        title: '删除确认！',
        content: this.$_.isNil(node.children) ? '是否删除该部门？' : '该部门的下级部门也会一并删除',
        okText: '确认',
        loading: true,
        closable: true,
        onOk: () => {
          GovDeptService.logicDelete(node.id).then(res => {
            if (res.ok()) {
              this.loadTree()
              this.$Message.success('删除成功')
            }
            this.$Modal.remove()
          }).catch(e => { this.$Modal.remove() })
        },
        onCancel: () => {
          this.btnLoading = false
        }
      })
    },
    openDrawer(drawerOption, data) {
      let drawer = DynamicDrawerUtil.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        components: { GovDeptForm, ActionFormContainer },
        onRemove: () => {
          this.loadTree()
        },
        render: (h) => {
          return (
            <action-form-container saveAction={this.handleGovDeptSaveClick} >
              <gov-dept-form data={ data.formDatas } parentCode={ data.parentCode }></gov-dept-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    async handleGovDeptSaveClick(formDatas) {
      delete formDatas.children
      let rb = await GovDeptService.save(formDatas)
      if (rb.ok()) {
        this.loadTree()
        this.$Message.success('保存成功')
      } else {
        this.$Message.error(rb.msg)
      }
      return rb.ok()
    }
  },
  mounted: function () {
    this.loadTree()
  },
  computed: {}
}
</script>

<style scoped>
.node-selected {
  border: 2px solid rgba(217, 83, 79, .8)
}
</style>
