<!--  -->
<template>
  <div style="background:#f7f7f7;padding: 16px;">
    <Card :bordered="false">
      <h4 style="margin:10px 0">区域管理</h4>
      <Row class="mt-8">
        <organization-chart class="i-scrollbar-hide" :datasource="treeData">
          <template slot-scope="{ nodeData }">
            <template v-if="nodeData.isRoot">
              <Poptip transfer trigger="hover" placement="right-start" style="background:#fff;padding:12px">
                <div>
                  {{nodeData.name}}
                </div>
                <div class="api" slot="content">
                  <List>
                    <Spin v-if="btnLoading" fix ></Spin>
                    <ListItem style="cursor:pointer">
                      <div @click="addArea(nodeData)">
                        <Icon class="mr-16" type="md-add"></Icon>添加区域
                      </div>
                    </ListItem>
                  </List>
                </div>
              </Poptip>
            </template>
            <template v-else>
              <Poptip transfer trigger="hover" placement="right-start" style="background:#fff;padding:12px">
                <div style="color: #4a8beb;">
                  <custom-icon :type="`iconfont icon-quyuguanli`"></custom-icon> {{nodeData.name}}
                </div>
                <div class="api" slot="content">
                  <List>
                    <Spin v-if="btnLoading" fix ></Spin>
                    <ListItem style="cursor:pointer">
                      <div @click="addBrother(nodeData)">
                        <Icon class="mr-16" type="md-add"></Icon>添加同级区域
                      </div>
                    </ListItem>
                    <ListItem  style="cursor:pointer">
                      <div @click="addChild(nodeData)">
                        <Icon  class="mr-16" type="md-add"></Icon>添加下级区域
                      </div>
                    </ListItem>
                    <ListItem  style="cursor:pointer">
                      <div @click="modify(nodeData)">
                        <Icon  class="mr-16" type="ios-create"></Icon>修改区域
                      </div>
                    </ListItem>
                    <ListItem  style="cursor:pointer">
                      <div @click="deleteArea(nodeData)">
                        <Icon  class="mr-16" type="md-trash"></Icon>删除区域
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
import AreaService from '@/api/sys/area'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import AreaForm from './components/area-form'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'

export default {
  props: {},
  components: {
    OrganizationChart
  },
  data() {
    return {
      btnLoading: false,
      treeData: {
        id: 0,
        name: '区域管理',
        isRoot: true,
        children: []
      },
      deptData: []
    }
  },
  methods: {
    loadTree() {
      this.btnLoading = false
      AreaService.queryAreaTree().then(res => {
        this.deptData = Object.assign([], res.data)
        this.treeData.children = this.deptData
      })
    },
    addArea(node) {
      this.btnLoading = true
      let drawerOption = {
        title: '添加顶级区域',
        width: 1000
      }
      let formDatas = {
        enabled: true,
        areaDisabled: true
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: '' })
    },
    addBrother(node) {
      this.btnLoading = true
      let currentCode = []
      if (node.pid !== '-1') {
        currentCode = node.code.split('-')
        currentCode.pop()
      }
      let drawerOption = {
        title: '添加同级区域',
        width: 1000
      }
      let formDatas = {
        pid: node.pid,
        enabled: true,
        areaDisabled: true
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: currentCode.join('-') })
    },
    addChild(node) {
      this.btnLoading = true
      let drawerOption = {
        title: '添加下级区域',
        width: 1000
      }
      let formDatas = {
        pid: node.id,
        enabled: true,
        areaDisabled: true
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: node.code })
    },
    modify(node) {
      this.btnLoading = true
      let formDatas = node
      let currentCode = node.code.split('-')
      formDatas.code = currentCode.pop()
      let drawerOption = {
        title: '修改区域信息'
      }
      this.openDrawer(drawerOption, { formDatas, parentCode: currentCode.join('-') })
    },
    deleteArea(node) {
      this.$Modal.info({
        title: '删除确认！',
        content: this.$_.isNil(node.children) ? '是否删除该区域？' : '该部门的下级区域也会一并删除',
        okText: '确认',
        loading: true,
        closable: true,
        onOk: () => {
          AreaService.logicDelete(node.id).then(res => {
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
        components: { AreaForm, ActionFormContainer },
        onRemove: () => {
          this.loadTree()
        },
        render: (h) => {
          return (
            <action-form-container saveAction={this.handleAreaSaveClick} >
              <area-form data={ data.formDatas } parentCode={ data.parentCode }></area-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    async handleAreaSaveClick(formDatas) {
      delete formDatas.children
      let rb = await AreaService.save(formDatas)
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
