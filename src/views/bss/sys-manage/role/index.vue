<!--  -->
<template>
<div style="background:#f7f7f7;padding: 16px">
  <Card :bordered="false">
    <div>
      <Spin fix large v-if="loading"></Spin>
      <Tabs :value="selectedRoleGroup.id" @on-click="handleTabClick" :animated="false">
        <TabPane v-for="(roleGroup,index) in roleGroups" :key="index" :name="roleGroup.id" :label="() => labelRoleGroup(roleGroup)">
        </TabPane>
        <Button v-has-per="['sys-role-group-manage-btns']" @click="handleRoleGroupAdd" type="primary" slot="extra">角色组管理</Button>
      </Tabs>
    </div>
    <RoleTableList ref="roleTable" :roleGroup="selectedRoleGroup"></RoleTableList>
  </Card>
</div>
</template>

<script>
import RoleGroupService from '@/api/security/role-group'
import RoleTableList from './components/role-table-list'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import RoleGroupList from './components/role-group-list'
export default {
  props: {},
  components: {
    RoleTableList
  },
  data() {
    return {
      selectedRoleGroup: {},
      roleGroups: [],
      loading: true,
      isBtnLoading: false,
      labelRoleGroup: row => {
        return <div>
          {row.name}
          <Tag color="blue">{row.areaName}</Tag>
        </div>
      }
    }
  },
  methods: {
    handleTabClick(id) {
      this.selectedRoleGroup = {
        id: id
      }
      this.$nextTick(() => {
        if (this.$refs.roleTable) {
          this.$refs.roleTable.queryDatas()
        }
      })
    },
    openDrawer(drawerOption, data) {
      let drawer = DynamicDrawerUtil.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        components: {
          RoleGroupList
        },
        onRemove: () => {
          this.init()
        },
        render: (h) => {
          return (
            <role-group-list > </role-group-list>
          )
        }
      }, this)
      drawer.show()
    },
    async handleRoleGroupAdd() {
      this.openDrawer({
        title: '角色分组管理'
      }, {})
    },

    // 初始化数据
    async queryDatas() {
      this.loading = true
      let rb = await RoleGroupService.list()
      if (rb.ok()) {
        this.roleGroups = rb.data
      }
      this.loading = false
    },
    async init() {
      await this.queryDatas()
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
        this.$nextTick(() => {
          if (this.$refs.roleTable) {
            this.$refs.roleTable.queryDatas()
          }
        })
      }
    }

  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style scoped>

</style>
