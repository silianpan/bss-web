<!-- 前端Vue路由管理 -->
<template>
  <div style="background:#f7f7f7;padding: 16px;">
    <Card :bordered="false">
      <h4 style="margin:10px 0">路由管理</h4>
      <Spin v-if="loading" fix large></Spin>
      <Button
        style="margin-bottom:10px;"
        icon="md-add"
        type="primary"
        @click="handleAddChild({ id: -1 })"
        >新增根路由</Button
      >
      <div class="i-scrollbar-hide">
        <Table row-key="id" :columns="columns" :data="treeData" border></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import FrontRouteService from '@/api/security/front-route'
import 'vue-organization-chart/dist/orgchart.css'
import RouteForm from './components/front-vue-route-form'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
export default {
  data() {
    return {
      selectedRoute: {},
      loading: false,
      btnLoading: false,
      treeData: [],
      columns: [
        {
          title: 'name',
          key: 'name',
          tree: true
        },
        {
          title: 'path',
          key: 'path'
        },
        {
          title: 'component',
          key: 'component'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, { row }) => {
            return (
              <ButtonGroup>
                <Tooltip placement="top" transfer content="修改">
                  <Button
                    type="info"
                    icon="ios-create-outline"
                    onClick={() => {
                      this.handleEdit(row)
                    }}
                  ></Button>
                </Tooltip>
                <Tooltip placement="top" transfer content="新增子路由">
                  <Button
                    type="success"
                    icon="md-add"
                    onClick={() => {
                      this.handleAddChild(row)
                    }}
                  ></Button>
                </Tooltip>
                <Tooltip placement="top" transfer content="删除">
                  <Button
                    type="primary"
                    icon="md-trash"
                    onClick={() => {
                      this.handleRemove(row)
                    }}
                  ></Button>
                </Tooltip>
              </ButtonGroup>
            )
          }
        }
      ]
    }
  },
  methods: {
    handleEdit(route) {
      this.btnLoading = true
      this.openDrawer({
        title: '修改路由基本信息'
      }, route)
    },
    openDrawer(drawerOption, routeData, parentRoute) {
      let drawer = this.$dynamicDrawer.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        components: {
          RouteForm,
          ActionFormContainer
        },
        onRemove: () => {
          this.loadTree()
        },
        render: (h) => {
          return (
            <action-form-container saveAction={this.handleRouteSaveClick} >
              <route-form data={ routeData } parent-route={parentRoute}> </route-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    async handleRouteSaveClick(formDatas) {
      let rb = await FrontRouteService.save(formDatas)
      if (rb.ok()) {
        this.$Message.success('操作成功')
      }
      return rb.ok()
    },
    handleAddChild(route) {
      this.btnLoading = true
      this.openDrawer({
        title: '新增子路由'
      }, {
        pid: route.id
      }, route)
    },
    handleRemove(route) {
      this.btnLoading = true
      this.$Modal.confirm({
        title: '确认',
        content: '是否删除此路由？',
        onOk: async () => {
          if (route && route.id) {
            let rb = await FrontRouteService.logicDelete(route.id)
            if (rb.ok()) {
              this.$Message.success('删除成功')
            }
            this.loadTree()
          }
        },
        onCancel: () => {
          this.btnLoading = false
        }
      })
    },
    handleNodeClick(node) {
      this.selectedRoute = {
        ...node
      }
    },
    async loadTree() {
      this.loading = true
      let rb = await FrontRouteService.queryTree()
      if (rb.ok()) {
        this.treeData = rb.data
      }
      this.loading = false
      this.btnLoading = false
    }
  },
  mounted() {
    this.loadTree()
  }
}
</script>

<style scoped>
.node-selected {
  border: 2px solid rgba(217, 83, 79, .8)
}
</style>
