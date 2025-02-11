<!--  -->
<template>
  <div style="background:#f7f7f7;padding: 16px;">
    <Card :bordered="false">
      <div v-has-per="['sys-user-manage-btns']" slot="title">
        <Button @click="handleAddClick" type="primary">新增用户</Button>
        <ButtonGroup class="ml-16">
          <Button
            :disabled="selectedUsers.length !== 1"
            @click="() => this.handleSignRoleClick(selectedUsers[0])"
            >赋予角色</Button
          >
          <Button
            @click="handleResetPwdClick"
            :disabled="$_.isEmpty(selectedUsers)"
            >重置密码</Button
          >
          <Button
            :disabled="$_.isEmpty(selectedUsers)"
            type="error"
            icon="md-trash"
            @click="handleDeleteClick"
            >删除</Button
          >
        </ButtonGroup>
      </div>
      <div slot="extra">
        <AutoComplete
          @keydown.enter.native="handleSearch"
          v-model="searchCon.keywords"
          icon="ios-search"
          placeholder="搜索..."
          style="width:260px"
          class="searchCriminal"
        ></AutoComplete>
      </div>
      <div class="i-scrollbar-hide">
        <Table
          @on-selection-change="handleSelectChange"
          ref="table"
          :loading="isLoading"
          :columns="tableOptions.columns"
          :data="tableOptions.data"
        ></Table>
        <div class="mt-8">
          <Page
            transfer
            @on-page-size-change="handlePageSizeChange"
            @on-change="handlePageIndexChange"
            :total="pageOption.total"
            show-total
            show-sizer
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import UserService from '@/api/security/user'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import SignRoleToUser from './components/sign-role-to-user'
import UserForm from './components/user-form'
export default {
  props: {},
  components: {},
  data() {
    return {
      searchCon: {
        keywords: ''
      },
      selectedUsers: [],
      userDatas: [],
      tableOptions: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '区域',
            key: 'areaName'
          },
          {
            title: '登录账号',
            key: 'accountName'
          },
          {
            title: 'UUID',
            key: 'id'
          },
          {
            title: '头像',
            key: 'accountName',
            width: 80,
            render: (h, params) => {
              let row = params.row
              if (!this.$_.isEmpty(row.avatar)) {
                return <Avatar shape="square" src={row.avatar} />
              }
              return <Avatar shape="square" icon="ios-person" />
            }
          },
          {
            title: '用户名',
            key: 'nickName'
          },
          {
            title: '启用状态',
            width: 150,
            key: 'enabled',
            render: (h, params) => {
              let row = params.row
              return (
                <i-switch
                  beforeChange={() =>
                    new Promise(resolve => {
                      let opt = row.enabled ? '禁用' : '启用'
                      this.$Modal.confirm({
                        title: `${opt}确认`,
                        content: `您确认${opt}此用户吗？`,
                        onOk: () => {
                          resolve()
                        }
                      })
                    })
                  }
                  value={row.enabled}
                  onon-change={value => this.handleChangeEnabled(row, value)}
                  class="ml-16"
                  true-color="#13ce66"
                  false-color="#ff4949"
                  size="large"
                >
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              )
            }
          }
        ],
        data: []
      },
      isLoading: false,
      pageOption: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSignRoleClick(user) {
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: '赋予用户角色',
          width: 720,
          onRemove: () => {
            // this.init()
          },
          components: { SignRoleToUser },
          render: h => {
            return <sign-role-to-user user-info={user}></sign-role-to-user>
          }
        },
        this
      )
      drawer.show()
    },
    handleResetPwdClick() {
      // 重置用户密码
      this.$Modal.confirm({
        title: `重置确认`,
        content: `重置后密码与登陆账户一致，是否继续操作`,
        onOk: async () => {
          if (!this.$_.isEmpty(this.selectedUsers)) {
            let resetAll = true
            let unRestUser = []
            this.isLoading = true
            for (let i = 0; i < this.selectedUsers.length; i++) {
              let user = this.selectedUsers[i]
              let rb = await UserService.resetPwd(user.id)
              if (!rb.ok()) {
                resetAll = false
                unRestUser.push(user.accountName)
              }
            }
            if (resetAll) {
              this.$Message.success('重置成功')
            } else {
              this.$Message.error(unRestUser.join(',') + ',删除失败')
            }
            this.pageQuery()
          } else {
            this.$Message.error('请选择需要删除的用户')
          }
        }
      })
    },
    handleDeleteClick() {
      // 删除用户
      this.$Modal.confirm({
        title: `删除确认`,
        content: `您确认删除此所选的用户？`,
        onOk: async () => {
          if (!this.$_.isEmpty(this.selectedUsers)) {
            let delAll = true
            let unDelUser = []
            this.isLoading = true
            for (let i = 0; i < this.selectedUsers.length; i++) {
              let user = this.selectedUsers[i]
              let rb = await UserService.logicDelete(user.id)
              if (!rb.ok()) {
                delAll = false
                unDelUser.push(user.accountName)
              }
            }
            if (delAll) {
              this.$Message.success('成功删除')
            } else {
              this.$Message.error(unDelUser.join(',') + ',删除失败')
            }
            this.pageQuery()
          } else {
            this.$Message.error('请选择需要删除的用户')
          }
        }
      })
    },
    handleSelectChange(selection) {
      this.selectedUsers = selection
    },
    // 打开用户新增弹窗
    openDrawer(drawerOption, formDatas) {
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: drawerOption.title || '',
          width: drawerOption.width || 720,
          onRemove: () => {
            // this.init()
          },
          components: { UserForm, ActionFormContainer },
          render: h => {
            return (
              <action-form-container saveAction={this.handleSaveClick}>
                <user-form data={formDatas}></user-form>
              </action-form-container>
            )
          }
        },
        this
      )
      drawer.show()
    },
    // 更改用户 启用 or 禁用 状态
    handleChangeEnabled(row, value) {
      if (!this.$_.isEmpty(row.id)) {
        UserService.changeEnabled(row.id, value).then(rb => {
          if (rb.ok()) {
            this.$Message.success({ content: rb.msg, duration: 5 })
          }
        })
      }
    },
    // 分页查询数据
    async pageQuery() {
      this.isLoading = true
      let { pageIndex, pageSize } = this.pageOption
      let params = {
        current: pageIndex,
        size: pageSize,
        conditions: [
          {
            field: 'accountName',
            value: this.searchCon.keywords || ''
          }
        ]
      }
      let rb = await UserService.page(params)
      if (rb.ok()) {
        this.tableOptions.data = rb.data.records
        this.pageOption.total = rb.data.total
      }
      this.selectedUsers = []
      this.isLoading = false
    },

    // 点击新增按钮时
    handleAddClick() {
      this.openDrawer(
        {
          title: '新增用户'
        },
        {}
      )
    },

    // 保存用户基本信息
    async handleSaveClick(formData) {
      let rb = await UserService.save(formData)
      if (rb.ok()) {
        this.$Message.success({ content: rb.msg, duration: 5 })
        this.pageQuery()
      }
      return rb.ok()
    },
    // 页码发生变化
    handlePageIndexChange(pageIndex) {
      this.pageOption.pageIndex = pageIndex
      this.pageQuery()
    },
    // 页面大小发生变化
    handlePageSizeChange(pageSize) {
      this.pageOption.pageSize = pageSize
      this.pageQuery()
    },
    handleSearch() {
      this.pageQuery()
    }
  },
  mounted() {
    this.pageQuery()
  }
}
</script>
