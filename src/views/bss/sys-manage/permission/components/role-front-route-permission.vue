<!--  -->
<template>
    <div style="position:relative">
      <Alert  type="success" show-icon closable>
        分配前端路由权限
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
      </Alert>
      <Spin v-if="loading" fix large></Spin>
      <Tree :data="frontRouteTreeDatas" @on-check-change="handleCheckChange" show-checkbox  check-strictly></Tree>
    </div>
</template>

<script>
import FrontRouteService from '@/api/security/front-route'
import RoleMixin from './role-mixin'
import RoleService from '@/api/security/role'
export default {
  props: { },
  mixins: [RoleMixin],
  components: {},
  data () {
    return {
      loading: false,
      frontRouteTreeDatas: [
      ]
    }
  },
  methods: {
    async loadTree() {
      this.loading = true
      if (this.roleInfo && this.roleInfo.id) {
        let rb = await FrontRouteService.queryPermissionFrontRouteTree({
          role_id: this.roleInfo.id
        })
        if (rb.ok()) {
          this.frontRouteTreeDatas = this.covertTreeNode(rb.data || [])
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
          checked: !this.$_.isEmpty(nodeS.reRouteRoleId),
          render: (h, { root, node, data }) => {
            let nodeData = data.self
            return (
              <div style="display:inline;">
                <span class="ml-16">{nodeData.name}</span>
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
      let { reRouteRoleId, id } = current.self
      if (reRouteRoleId && !this.$_.isEmpty(reRouteRoleId)) {
        let rb = await RoleService.unSignRoute({
          id: reRouteRoleId
        })
        if (rb.ok()) {
          this.$set(current.self, 'reRouteRoleId', '')
          this.$Message.success('取消成功')
        } else {
          this.$set(current, 'checked', false)
        }
      } else if (this.roleInfo && this.roleInfo.id) {
        let rb = await RoleService.signRouteToRole({
          roleId: this.roleInfo.id,
          routeId: id
        })
        if (rb.ok()) {
          if (rb.data && !this.$_.isEmpty(rb.data.id)) {
            current.self.reRouteRoleId = rb.data.id
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
