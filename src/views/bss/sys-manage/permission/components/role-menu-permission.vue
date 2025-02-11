<!--  -->
<template>
    <div style="position:relative">
      <Alert  type="success" show-icon closable>
        分配菜单权限
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
      </Alert>
      <Spin v-if="loading" fix large></Spin>
      <Tree :data="menuTreeDatas" @on-check-change="handleCheckChange" show-checkbox  check-strictly></Tree>
    </div>
</template>

<script>
import MenuService from '@/api/security/menu'
import RoleMixin from './role-mixin'
import RoleService from '@/api/security/role'
export default {
  props: { },
  mixins: [RoleMixin],
  components: {},
  data () {
    return {
      loading: false,
      menuTreeDatas: [
      ]
    }
  },
  methods: {
    async loadTree() {
      this.loading = true
      if (this.roleInfo && this.roleInfo.id) {
        let rb = await MenuService.queryPermissionMenuTree({
          role_id: this.roleInfo.id
        })
        if (rb.ok()) {
          this.menuTreeDatas = this.covertTreeNode(rb.data || [])
        }
      }
      this.loading = false
    },
    covertTreeNode(treeNodes) {
      if (this.$_.isEmpty(treeNodes)) {
        return []
      }
      let rs = []
      for (let i = 0; i < treeNodes.length; i++) {
        let nodeS = treeNodes[i].self
        let treeNode = Object.assign({
          expand: true,
          disableCheckbox: false,
          checked: !this.$_.isEmpty(nodeS.reMenuRoleId),
          render: (h, { root, node, data }) => {
            let nodeData = data.self
            let iconCss = `iconfont ${nodeData.iconCls}`
            return (
              <div style="display:inline;">
                <custom-icon type={iconCss}></custom-icon>
                <span class="ml-16">{nodeData.title}</span>
              </div>
            )
          }
        }, treeNodes[i])
        if (treeNodes[i].children && !this.$_.isEmpty(treeNodes[i].children)) {
          let children = this.covertTreeNode(treeNodes[i].children)
          if (!this.$_.isEmpty(children)) {
            treeNode.children = children
          }
        }
        rs[i] = { ...treeNode }
      }
      return rs
    },
    async handleCheckChange(selectedNodes, current) {
      this.loading = true
      let { reMenuRoleId, id } = current.self
      if (reMenuRoleId && !this.$_.isEmpty(reMenuRoleId)) {
        let rb = await RoleService.unSignMenu({
          id: reMenuRoleId
        })
        if (rb.ok()) {
          this.$set(current.self, 'reMenuRoleId', '')
          this.$Message.success('取消成功')
        } else {
          this.$set(current, 'checked', false)
        }
      } else if (this.roleInfo && this.roleInfo.id) {
        let rb = await RoleService.signMenuToRole({
          roleId: this.roleInfo.id,
          menuId: id
        })
        if (rb.ok()) {
          if (rb.data && !this.$_.isEmpty(rb.data.id)) {
            current.self.reMenuRoleId = rb.data.id
            this.$Message.success('授权成功')
          } else {
            this.$Message.error('授权失败')
          }
        } else {
          this.$set(current, 'checked', false)
        }
      }
      this.loading = false
    }
  },
  mounted: function() {
    this.loadTree()
  },
  computed: {}
}

</script>
<style  scoped>
</style>
