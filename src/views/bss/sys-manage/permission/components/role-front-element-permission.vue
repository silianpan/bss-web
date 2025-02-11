<!--  -->
<template>
  <div>
    <div class="role-user-search-container">
      <Row type="flex" justify="end">
        <i-col span="12">
          <Input
            v-model="keywords"
            @on-search="listQuery"
            search
            enter-button
            placeholder="搜索节点元素..."
          />
        </i-col>
      </Row>
    </div>
    <Divider></Divider>
    <div class="role-user-list-contianer">
      <Table
        :loading="isLoading"
        :columns="tableOptions.columns"
        :data="tableOptions.data"
      ></Table>
    </div>
  </div>
</template>

<script>
import FrontElementService from '@/api/security/front-element'
import RoleService from '@/api/security/role'
import RoleMixin from './role-mixin'
export default {
  props: {},
  mixins: [RoleMixin],
  components: {},
  data() {
    return {
      keywords: '',
      isLoading: true,
      tableOptions: {
        columns: [
          {
            title: '节点code',
            key: 'code',
            render: (h, params) => {
              // return (
              //   <Tooltip max-width="300" content={ params.row.name } placement="right">
              //     <span>{ params.row.code }</span>
              //   </Tooltip>
              // )
              return (
                <span>
                  {params.row.code} {params.row.name}
                </span>
              )
            }
          },
          {
            title: '操作',
            width: 150,
            key: 'enabled',
            render: (h, params) => {
              let row = params.row
              if (this.$_.isEmpty(row.reFrontElementRoleId)) {
                return (
                  <Button
                    onclick={() => this.handleSignElementToRole(row)}
                    type="success"
                  >
                    授权
                  </Button>
                )
              }
              return (
                <Button
                  onclick={() => this.handleUnSignElementToRole(row)}
                  type="error"
                >
                  取消
                </Button>
              )
            }
          }
        ],
        data: []
      }
    }
  },
  methods: {
    handleSignElementToRole(elementVo) {
      this.$Modal.confirm({
        title: '确认授权',
        content: '确认将此元素授权给此角色吗？',
        onOk: async () => {
          if (this.roleInfo && this.roleInfo.id) {
            this.isLoading = true
            let rb = await RoleService.signElementToRole({
              frontElementId: elementVo.id,
              roleId: this.roleInfo.id
            })
            if (rb.ok()) {
              this.$Message.success('授权成功')
            }
            this.listQuery()
          }
        }
      })
    },
    async handleUnSignElementToRole(elementVo) {
      this.$Modal.confirm({
        title: '确认',
        content: '确认取消此权限吗？',
        onOk: async () => {
          this.isLoading = true
          let rb = await RoleService.unSignElement({
            id: elementVo.reFrontElementRoleId
          })
          if (rb.ok()) {
            this.$Message.success('取消成功')
          }
          this.listQuery()
        }
      })
    },
    async listQuery() {
      this.isLoading = true
      if (this.roleInfo && this.roleInfo.id) {
        let params = {
          conditions: [
            {
              field: 'keywords',
              value: this.keywords
            }
          ]
        }
        let rb = await FrontElementService.listElementsRole(
          this.roleInfo.id,
          params
        )
        if (rb.ok()) {
          this.tableOptions.data = rb.data
        }
      }

      this.isLoading = false
    }
  },
  mounted: function() {
    this.listQuery()
  },
  computed: {}
}
</script>

<style scoped></style>
