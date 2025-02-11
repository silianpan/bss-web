<!-- 菜单管理 -->
<template>
  <div style="background:#f7f7f7;padding: 16px;">
    <Card :bordered="false">
      <h4 style="margin:10px 0">菜单管理</h4>
      <Spin v-if="loading" fix large></Spin>
      <Button
        style="margin-bottom:10px;"
        icon="md-add"
        type="primary"
        @click="handleAddChild({ id: -1 })"
        >新增根菜单</Button
      >
      <div class="i-scrollbar-hide">
        <Table row-key="id" :columns="columns" :data="menuData" border></Table>
      </div>
    </Card>
  </div>
</template>

<script>
import MenuService from '@/api/security/menu'
import 'vue-organization-chart/dist/orgchart.css'
import MenuForm from './components/menu-form'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
export default {
  data() {
    return {
      selectedMenu: {},
      loading: false,
      btnLoading: false,
      menuData: [],
      columns: [
        {
          title: '菜单名称',
          key: 'title',
          tree: true
        },
        {
          title: '序号',
          key: 'seq',
          width: 70
        },
        {
          title: '菜单编码',
          key: 'code'
        },
        {
          title: '路由名称',
          key: 'vueRouteName',
          width: 200
        },
        {
          title: '图标',
          key: 'iconCls'
        },
        {
          title: 'query',
          key: 'query'
        },
        {
          title: 'params',
          key: 'params',
          width: 100
        },
        {
          title: 'meta',
          key: 'meta',
          width: 80
        },
        {
          title: '菜单位置',
          key: 'layoutX',
          width: 110
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, { row }) => {
            if (row.menuId === -1) {
              return (
                <ButtonGroup>
                  <Tooltip placement="top" transfer content="新增根菜单">
                    <Button
                      type="success"
                      icon="md-add"
                      onClick={() => {
                        this.handleAddChild({ id: -1 })
                      }}
                    ></Button>
                  </Tooltip>
                </ButtonGroup>
              )
            }
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
                <Tooltip placement="top" transfer content="新增子菜单">
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
    handleEdit(menu) {
      this.btnLoading = true
      this.openDrawer(
        {
          title: '修改菜单基本信息'
        },
        menu
      )
    },
    openDrawer(drawerOption, menuData, parentMenu) {
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: drawerOption.title || '',
          width: drawerOption.width || 700,
          components: {
            MenuForm,
            ActionFormContainer
          },
          onRemove: () => {
            this.loadTree()
          },
          render: h => {
            return (
              <action-form-container saveAction={this.handleMenuSaveClick}>
                <menu-form data={menuData} parent-menu={parentMenu}>
                  {' '}
                </menu-form>
              </action-form-container>
            )
          }
        },
        this
      )
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
      this.openDrawer(
        {
          title: '新增子菜单'
        },
        {
          pid: menu.id
        },
        menu
      )
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
        // 构建区域菜单树
        let tmpMap = {}
        rb.data.forEach(item => {
          if (!tmpMap.hasOwnProperty(item.areaName)) {
            tmpMap[item.areaName] = []
          }
          tmpMap[item.areaName].push(item)
        })
        let retMenus = []
        let i = 1
        for (let key in tmpMap) {
          let areaRoot = {
            title: key,
            menuId: -1,
            seq: i,
            id: i,
            children: tmpMap[key]
          }
          retMenus.push(areaRoot)
          i++
        }
        this.menuData = retMenus
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
  border: 2px solid rgba(217, 83, 79, 0.8);
}
</style>
