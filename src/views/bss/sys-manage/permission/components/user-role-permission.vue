<!--  -->
<template>
<div>
  <div v-if="!$_.isEmpty(userHasRoles)" >
    <div>
      <Divider orientation="left">已有权限</Divider>
    </div>
    <div style="margin: 12px 0px;">
      <Spin v-if="loading" fix large></Spin>
      <Tag @on-close="handleTagClose(item)" color="blue" size="large" type="border" closable v-for="(item, index) in userHasRoles" :key="index">{{item.name}}</Tag>
    </div>
  </div>
  <Divider orientation="left">赋予权限</Divider>
  <Tabs :value="selectedRoleGroup.id" @on-click="handleTabClick" :animated="false">
    <TabPane  v-for="(roleGroup,index) in roleGroups" :key="index" :name="roleGroup.id" :label="roleGroup.name">
    </TabPane>
  </Tabs>
  <Table ref="table" :loading="loading" :columns="tableOptions.columns" :data="tableOptions.data"></Table>

</div>
</template>

<script>
// 给用户分配 角色权限
import UserMixin from './user-mixin'
import RoleGroupService from '@/api/security/role-group'
import RoleService from '@/api/security/role'
export default {
  props: {},
  mixins: [UserMixin],
  components: {},
  data() {
    return {
      roleGroups: [],
      selectedRoleGroup: {},
      tableOptions: {
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '操作',
            width: 150,
            key: 'enabled',
            render: (h, params) => {
              let row = params.row
              if (this.$_.isEmpty(row.reUserRoleId)) {
                return <Button onclick={() => this.handleSignRoleToUser(row)} type="success">赋予</Button>
              }
              return <Button onclick={() => this.handleUnSignRoleToUser(row)} type="error" >取消</Button>
            }
          }
        ],
        data: []
      },
      userHasRoles: [],
      loading: true
    }
  },
  methods: {
    async handleSignRoleToUser(roleVo) {
      if (this.userInfo && roleVo) {
        this.isLoading = true
        let rb = await RoleService.signUserToRole({
          userId: this.userInfo.id,
          roleId: roleVo.id
        })
        if (rb.ok()) {
          this.$Message.success('授权成功')
        }
        this.queryRolesByUser()
        this.queryRolesByGroup()
      }
    },
    async handleUnSignRoleToUser(roleVo) {
      if (roleVo && !this.$_.isEmpty(roleVo.reUserRoleId)) {
        this.isLoading = true
        let rb = await RoleService.unSignUser({
          id: roleVo.reUserRoleId
        })
        if (rb.ok()) {
          this.$Message.success('取消成功')
        }
        this.queryRolesByUser()
        this.queryRolesByGroup()
      }
    },
    handleTagClose(tag) {
      this.$Modal.confirm({
        title: `取消确认`,
        content: `您确认取消授权此用户该角色吗？`,
        onOk: async () => {
          // 移除 该角色 角色权限
          this.handleUnSignRoleToUser(tag)
        }
      })
    },
    handleTabClick(id) {
      this.selectedRoleGroup = {
        id: id
      }
      this.queryRolesByGroup()
    },
    // 查询此用户已分配的角色权限
    async queryRolesByUser() {
      if (this.userInfo && this.userInfo.id) {
        let rb = await RoleService.listRolesByUserId(this.userInfo.id)
        if (rb.ok()) {
          this.userHasRoles = rb.data
        }
      }
    },

    // 根据角色分组查询此用户 角色状态
    async queryRolesByGroup() {
      this.loading = true
      if (this.userInfo && this.selectedRoleGroup && !this.$_.isEmpty(this.selectedRoleGroup.id)) {
        let params = {
          conditions: [
            {
              field: 'groupId',
              value: this.selectedRoleGroup.id
            }
          ],
          orders: [
            {
              asc: true,
              column: 'level'
            }
          ]
        }
        let rb = await RoleService.listReRolesByUserId(this.userInfo.id, params)
        if (rb.ok()) {
          this.tableOptions.data = rb.data
        }
      }
      this.loading = false
    },
    // 初始化数据
    async queryRoleGroupDatas() {
      this.loading = true
      let rb = await RoleGroupService.list()
      if (rb.ok()) {
        this.roleGroups = rb.data
      }
      this.loading = false
    },
    async init() {
      await this.queryRolesByUser()
      await this.queryRoleGroupDatas()
      if (!this.$_.isEmpty(this.roleGroups)) {
        let drg = this.roleGroups[0]
        if (this.$_.isEmpty(this.selectedRoleGroup)) {
          this.selectedRoleGroup = {
            ...drg
          }
        } else {
          let match = this.roleGroups.filter(rg => rg.id === this.selectedRoleGroup.id)
          if (this.$_.isEmpty(match)) {
            this.selectedRoleGroup = {
              ...drg
            }
          }
        }
        this.queryRolesByGroup()
      }
    }

  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style  scoped>
</style>
