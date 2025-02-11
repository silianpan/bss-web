<!--  -->
<template>
<div>
  <div class="role-user-search-container">
   <Row type="flex" justify="end" >
     <i-col span="12">
        <Input v-model="keywords" @on-search="listQuery" search enter-button placeholder="搜索用户" />
     </i-col>
   </Row>
  </div>
  <Divider></Divider>
  <div class="role-user-list-contianer">
    <Spin v-if="isLoading" fix large></Spin>
    <List>
      <ListItem v-for="(item,index) in userDatas" :key="index">
        <ListItemMeta :title="item.nickName">
          <div slot="avatar">
            <Avatar v-if="!$_.isEmpty(item.avatar)" size="large" shape="square" :src="item.avatar" />
            <Avatar v-else shape="square" icon="ios-person"   style="background: #f56a00;" size="large" />
          </div>
          <div slot="description">
            账号：{{item.accountName}}
          </div>
        </ListItemMeta>
        <template slot="action">
           <Button v-if="$_.isEmpty(item.reUserRoleId)" @click="handleSignUserToRole(item)" type="success">授权</Button>
           <Button v-else type="error"  @click="handleUnSignUserToRole(item)">取消</Button>
        </template>
        <!-- <user-list-item-content @refresh="pageQuery" :data="item"></user-list-item-content> -->
      </ListItem>
    </List>
  </div>

</div>
</template>

<script>
import UserService from '@/api/security/user'
import RoleService from '@/api/security/role'
import RoleMixin from './role-mixin'
export default {
  props: {},
  mixins: [RoleMixin],
  components: {},
  data() {
    return {
      keywords: '',
      userDatas: [],
      isLoading: true
    }
  },
  methods: {
    handleSignUserToRole(userVo) {
      this.$Modal.confirm({
        title: '确认授权',
        content: '确认授权此用户权限吗？',
        onOk: async () => {
          if (this.roleInfo && this.roleInfo.id) {
            this.isLoading = true
            let rb = await RoleService.signUserToRole({
              userId: userVo.id,
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
    async handleUnSignUserToRole(userVo) {
      this.$Modal.confirm({
        title: '确认',
        content: '确认取消此用户权限？',
        onOk: async () => {
          this.isLoading = true
          let rb = await RoleService.unSignUser({
            id: userVo.reUserRoleId
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
        let rb = await UserService.listUsersRole(this.roleInfo.id, params)
        if (rb.ok()) {
          this.userDatas = rb.data
        }
      }

      this.isLoading = false
    }
  },
  mounted: function () {
    this.listQuery()
  },
  computed: {}
}
</script>

<style  scoped>
</style>
