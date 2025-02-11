<!-- 政府机构管理 -->
<template>
  <div style="background:#f7f7f7;padding: 16px;">
    <Card :bordered="false">
      <h4 style="margin:10px 0">政府机构管理</h4>
      <Spin v-if="btnLoading" fix large></Spin>
      <Button
        style="margin-bottom:10px;"
        icon="md-add"
        type="primary"
        @click="addTop({ id: areaInfo.id, name: areaInfo.name })"
        >新增部门</Button
      >
      <div class="i-scrollbar-hide">
        <Table row-key="id" :columns="columns" :data="deptData" border></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GovDeptService from '@/api/sys/gov-dept/index'
import GovDeptForm from './components/gov-dept-form'
import 'vue-organization-chart/dist/orgchart.css'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import ActionFormContainer from '@/components/Form/ActionFormContainer'

export default {
  computed: {
    ...mapGetters(['areaInfo'])
  },
  data() {
    return {
      btnLoading: false,
      deptData: [],
      columns: [
        {
          title: '名称',
          key: 'name',
          tree: true,
          width: 500
        },
        {
          title: '序号',
          key: 'seq',
          width: 150
        },
        {
          title: '编号',
          key: 'code',
          width: 150
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, { row }) => {
            if (this.$_.isNil(row.areaId) && !row.isRoot) {
              return (
                <Tooltip placement="top" transfer content="添加顶级部门">
                  <Button
                    type="info"
                    icon="md-add"
                    onClick={() => {
                      this.addTop(row)
                    }}
                  ></Button>
                </Tooltip>
              )
            }
            if (!this.$_.isNil(row.areaId)) {
              return (
                <ButtonGroup>
                  <Tooltip placement="top" transfer content="添加同级部门">
                    <Button
                      type="info"
                      icon="md-add"
                      onClick={() => {
                        this.addBrother(row)
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" transfer content="添加下级部门">
                    <Button
                      type="warning"
                      icon="md-add"
                      onClick={() => {
                        this.addChild(row)
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" transfer content="修改部门">
                    <Button
                      type="success"
                      icon="ios-create-outline"
                      onClick={() => {
                        this.modify(row)
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip placement="top" transfer content="删除部门">
                    <Button
                      type="primary"
                      icon="md-trash"
                      onClick={() => {
                        this.deleteDept(row)
                      }}
                    ></Button>
                  </Tooltip>
                </ButtonGroup>
              )
            }
          }
        }
      ]
    }
  },
  methods: {
    loadTree() {
      this.btnLoading = false
      GovDeptService.getFusionTree().then(res => {
        this.deptData = Object.assign([], res.data)
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
      this.openDrawer(drawerOption, {
        formDatas,
        parentCode: currentCode.join('-')
      })
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
      this.openDrawer(drawerOption, {
        formDatas,
        parentCode: currentCode.join('-')
      })
    },
    deleteDept(node) {
      this.$Modal.info({
        title: '删除确认！',
        content: this.$_.isNil(node.children)
          ? '是否删除该部门？'
          : '该部门的下级部门也会一并删除',
        okText: '确认',
        loading: true,
        closable: true,
        onOk: () => {
          GovDeptService.logicDelete(node.id)
            .then(res => {
              if (res.ok()) {
                this.loadTree()
                this.$Message.success('删除成功')
              }
              this.$Modal.remove()
            })
            .catch(e => {
              this.$Modal.remove()
            })
        },
        onCancel: () => {
          this.btnLoading = false
        }
      })
    },
    openDrawer(drawerOption, data) {
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: drawerOption.title || '',
          width: drawerOption.width || 700,
          components: { GovDeptForm, ActionFormContainer },
          onRemove: () => {
            this.loadTree()
          },
          render: h => {
            return (
              <action-form-container saveAction={this.handleGovDeptSaveClick}>
                <gov-dept-form
                  data={data.formDatas}
                  parentCode={data.parentCode}
                ></gov-dept-form>
              </action-form-container>
            )
          }
        },
        this
      )
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
  mounted() {
    this.loadTree()
  }
}
</script>

<style scoped>
.node-selected {
  border: 2px solid rgba(217, 83, 79, 0.8);
}
</style>
