<!--  -->
<template>
    <div>
        <div v-has-per="['sys-role-manage-btns']" class="text-align:right">
          <Button class="mr-16"  @click="handleAddRoleClick" type="primary" >新增角色</Button>
          <ButtonGroup  >
            <Button  :disabled="selectedRoles.length !== 1" @click="()=>this.handleEditClick(selectedRoles[0])" >编辑</Button>
            <Button icon="md-copy" @click="handleCopyRoleClick(selectedRoles[0])" :disabled="selectedRoles.length !== 1" >复制</Button>
            <Button @click="handleSignPermissionToRole(selectedRoles[0])" :disabled="selectedRoles.length !== 1" >授权</Button>
            <Button :disabled="$_.isEmpty(selectedRoles)" type="error" icon="md-trash"  @click="handleDeleteClick" >删除</Button>
          </ButtonGroup>
        </div>
        <div class="mt-8">
          <Table @on-selection-change="handleRoleSelectChange" ref="table" :loading="loading" :columns="tableOptions.columns" :data="tableOptions.data"></Table>
        </div>
    </div>
</template>

<script>
import RoleService from '@/api/security/role'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import RoleForm from './role-form'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import RoleDetailInfo from './role-detail-info'
export default {
  props: {
    roleGroup: {
      type: Object,
      default: () => {}
    }
  },
  components: {

  },
  data () {
    return {
      loading: false,
      selectedRoles: [],
      tableOptions: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '编码（唯一）',
            key: 'code'
          },
          {
            title: '启用状态',
            key: 'enabled',
            render: (h, params) => {
              let row = params.row
              return (
                <i-switch beforeChange={() => new Promise((resolve) => {
                  let opt = row.enabled ? '禁用' : '启用'
                  this.$Modal.confirm({
                    title: `${opt}确认`,
                    content: `您确认${opt}此角色吗？`,
                    onOk: () => {
                      resolve()
                    }
                  })
                })} value={row.enabled} onon-change={(value) => this.handleChangeEnabled(row, value)} class="ml-16" true-color="#13ce66" false-color="#ff4949" size="large">
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-switch>)
            }
          }
        ],
        data: [
        ]
      }
    }
  },
  methods: {
    handleCopyRoleClick(role) {
      if (this.roleGroup && this.roleGroup.id) {
        this.openDrawer({ title: '新增角色' }, {
          groupId: this.roleGroup.id
        }, role)
      }
    },
    handleSignPermissionToRole(role) {
      let drawer = DynamicDrawerUtil.newInstance({
        title: '赋予权限',
        width: 700,
        components: { RoleDetailInfo },
        render: (h) => {
          return (
            <role-detail-info data={role} ></role-detail-info>
          )
        }
      }, this)
      drawer.show()
    },
    // 点击编辑按钮
    handleEditClick(row) {
      // 编辑角色
      this.openDrawer({ title: '编辑角色基本信息' }, row)
    },
    handleRoleSelectChange(selection) {
      this.selectedRoles = selection
    },
    handleAddRoleClick() {
      if (this.roleGroup && this.roleGroup.id) {
        this.openDrawer({ title: '新增角色' }, {
          groupId: this.roleGroup.id
        })
      }
    },
    // 打开侧滑
    openDrawer(drawerOption, data, copySource) {
      let formDatas = data || {}
      let drawer = DynamicDrawerUtil.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 700,
        components: { RoleForm, ActionFormContainer },
        render: (h) => {
          return (
            <action-form-container saveAction={this.handleRoleSaveClick} >
              <role-form data={formDatas} copy-source={copySource} ></role-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    // 禁用|启用 角色
    async handleChangeEnabled(row, enable) {
      // 禁用|启用某个角色
      let rb = await RoleService.changeEnable(row.id, enable)
      if (rb.ok()) {
        this.$Message.success({ content: rb.msg, duration: 5 })
        // 刷新table数据
        this.queryDatas()
      }
    },

    // 查询数据
    async queryDatas() {
      this.loading = true
      this.selectedRoles = []
      if (!this.$_.isEmpty(this.roleGroup)) {
        let params = {
          conditions: [
            {
              field: 'groupId',
              queryType: 'eq',
              value: this.roleGroup.id
            }
          ],
          orders: [
            {
              asc: true,
              column: 'level'
            }
          ]
        }
        let rb = await RoleService.findAll(params)
        if (rb.ok()) {
          this.tableOptions.data = rb.data
        }
      }
      this.loading = false
    },
    // 删除角色
    async handleDeleteClick() {
      // 删除角色
      this.$Modal.confirm({
        title: `删除确认`,
        content: `您确认删除此所选的角色？`,
        onOk: async () => {
          if (!this.$_.isEmpty(this.selectedRoles)) {
            let delAll = true
            let unDelRole = []
            for (let i = 0; i < this.selectedRoles.length; i++) {
              let role = this.selectedRoles[i]
              let rb = await RoleService.logicDelete(role.id)
              if (!rb.ok()) {
                delAll = false
                unDelRole.push(role.name)
              }
            }
            if (delAll) {
              this.$Message.success('成功删除')
            } else {
              this.$Message.error(unDelRole.join(',') + ',删除失败')
            }
            this.queryDatas()
          } else {
            this.$Message.error('请选择需要删除的角色')
          }
        }
      })
    },
    // 保存角色信息
    async handleRoleSaveClick(formDatas) {
      formDatas.groupId = this.roleGroup.id
      let rb = await RoleService.saveForm(formDatas)
      if (rb.ok()) {
        this.$Message.success({ content: rb.msg, duration: 5 })
        this.queryDatas()
      }
      return rb.ok()
    }

  },
  mounted: function() {
    // this.queryDatas()
  },
  computed: {

  }
}

</script>
<style  scoped>
</style>
