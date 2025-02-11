<!--  -->
<template>
<div class="i-layout-content-main ">
  <Card :bordered="false">
    <p slot="title">
      <span>路由管理</span>
    </p>
    <div class="mt-8">
      <Spin v-if="loading" fix large></Spin>
      <organization-chart style="height:100%"   class="i-scrollbar-hide" @node-click="handleNodeClick" :datasource="treeData">
        <template slot-scope="{ nodeData }">
          <Poptip transfer trigger="hover" placement="right-start">
            <div :class="{'node-selected': nodeData.id === selectedRoute.id}" style="background:#fff;padding:8px">
              <custom-icon :type="`iconfont ${nodeData.iconCls}` "></custom-icon> {{nodeData.name}}
            </div>
            <div class="api" slot="content">
              <List>
                <Spin v-if="btnLoading" fix > </Spin>
                <ListItem v-if="nodeData.editable!==false" style="cursor:pointer" >
                  <div @click="handleEdit(nodeData)">
                    <Icon class="mr-16" type="ios-create-outline"></Icon>修改
                  </div>
                </ListItem>
                <ListItem  style="cursor:pointer" >
                  <div @click="handleAddChild(nodeData)">
                    <Icon class="mr-16" type="md-add" ></Icon>新增子路由
                  </div>
                </ListItem>
                <ListItem v-if="nodeData.deletable!==false"  style="cursor:pointer" >
                  <div  @click="handleRemove(nodeData)">
                    <Icon  class="mr-16" type="md-trash"></Icon>删除
                  </div>
                </ListItem>
              </List>
            </div>
          </Poptip>
        </template>
      </organization-chart>
    </div>
  </Card>

</div>
</template>

<script>
import FrontRouteService from '@/api/security/front-route'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'
import RouteForm from './components/front-vue-route-form'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
export default {
  props: {},
  components: {
    OrganizationChart
  },
  data() {
    return {
      selectedRoute: {},
      loading: false,
      btnLoading: false,
      treeData: {
        id: '-1',
        editable: false,
        deletable: false,
        name: '根路由',
        children: []
      }
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
        this.treeData.children = Object.assign([], rb.data)
      }
      this.loading = false
      this.btnLoading = false
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
