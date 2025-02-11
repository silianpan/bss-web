<!-- 菜单管理 -->
<template>
<div class="i-layout-content-main">
  <Card :bordered="false">
    <p slot="title">
      <span>菜单管理</span>
    </p>
    <div class="mt-8">
      <Spin v-if="loading" fix large></Spin>
      <organization-chart style="height:100%"  class="i-scrollbar-hide" @node-click="handleNodeClick" :datasource="treeData">
        <template slot-scope="{ nodeData }">
          <Poptip transfer trigger="hover" placement="right-start">
            <div :class="{'node-selected': nodeData.id === selectedMenu.id}" style="background:#fff;padding:12px">
              <custom-icon :type="`iconfont ${nodeData.iconCls}` "></custom-icon> {{nodeData.title}}
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
                    <Icon class="mr-16" type="md-add" ></Icon>新增子菜单
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
import MenuService from '@/api/security/menu'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'
import MenuForm from './components/menu-form'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
export default {
  props: {},
  components: {
    OrganizationChart
  },
  data() {
    return {
      selectedMenu: {},
      loading: false,
      btnLoading: false,
      treeData: {
        id: '-1',
        editable: false,
        deletable: false,
        title: '根菜单',
        children: []
      }
    }
  },
  methods: {
    handleEdit(menu) {
      this.btnLoading = true
      this.openDrawer({
        title: '修改菜单基本信息'
      }, menu)
    },
    openDrawer(drawerOption, menuData, parentMenu) {
      let drawer = this.$dynamicDrawer.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        components: {
          MenuForm,
          ActionFormContainer
        },
        onRemove: () => {
          this.loadTree()
        },
        render: (h) => {
          return (
            <action-form-container saveAction={this.handleMenuSaveClick} >
              <menu-form data={ menuData } parent-menu={parentMenu}> </menu-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    async handleMenuSaveClick(formDatas) {
      let rb = await MenuService.save(formDatas)
      if (rb.ok()) {
        this.$Message.success('操作成功')
      }
      return rb.ok()
    },

    handleAddChild(menu) {
      this.btnLoading = true
      this.openDrawer({
        title: '新增子菜单'
      }, {
        pid: menu.id
      }, menu)
    },
    handleRemove(menu) {
      this.btnLoading = true
      this.$Modal.confirm({
        title: '确认',
        content: '是否删除此菜单？',
        onOk: async () => {
          if (menu && menu.id) {
            let rb = await MenuService.logicDelete(menu.id)
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
      this.selectedMenu = {
        ...node
      }
    },
    async loadTree() {
      this.loading = true
      let rb = await MenuService.queryMenuTree()
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
