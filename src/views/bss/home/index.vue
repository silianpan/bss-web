<template>
  <div
    class="warp"
    v-if="!$_.isNil(areaInfo)"
    :style="{
      background:
        'url(' +
        require(`../../../assets/styles/images/area/${areaInfo.eleRegion}/banner.png`) +
        ') no-repeat'
    }"
  >
    <div class="homePage">
      <!-- logo -->
      <div
        v-if="!$_.isNil(areaInfo)"
        class="defaultLogo"
        :style="{
          background:
            'url(' +
            require(`../../../assets/styles/images/area/${areaInfo.eleRegion}/logo.png`) +
            ') no-repeat'
        }"
      ></div>
      <!-- 用户信息 -->
      <div class="defaultUserInfo">
        <div class="userInfoWrap">
          <div class="userLabel">欢迎您：{{ userInfo.nickName || '' }}</div>
          <div class="userLabel">
            <!-- 跳转到个人信息页 -->
            <span class="links" @click="handleChangePwd">修改密码</span>
          </div>
          <div class="userLabel">
            <!-- 退出登录 -->
            <logout-btn-cmp></logout-btn-cmp>
          </div>
        </div>
      </div>
      <div class="fastLinks">
        <!-- 快捷方式块，根据权限显示。会自动分配距离 -->
        <div class="fastLinkMain">
          <!-- <div class="fastLinkSearch">
            <div class="fastSearchMain">
              <AutoComplete v-model="searchVal" icon="ios-search" placeholder="搜索文档" style="width:260px" class="searchCriminal"></AutoComplete>
            </div>
            <div class="currentDate"></div>
          </div> -->
          <div class="fastLinkMainContent i-scrollbar-hide">
            <div class="fastItems" v-for="item in menus" :key="item.id">
              <div class="fastItemMain" @click="headerMenuItemClick(item)">
                <div class="fastItemsContent">
                  <i :class="['defaultFastLinkIcon ', item.iconCls]"></i>
                  <div class="defaultFstLinkText">{{ item.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="knowledgeBox">
        <div class="knowledgeMain">
          <recent-files-c></recent-files-c>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="footer">&copy;XXX科技有限公司</div>
    <!--修改密码-->
    <Modal
      v-model="isShowChangePwd"
      :closable="false"
      :mask-closable="false"
      class-name="vertical-center-modal"
      :width="460"
      title="修改密码"
    >
      <div class="modalBox">
        <Form ref="formInline" :model="changePwd" :label-width="100">
          <Row>
            <i-Col span="24">
              <FormItem label="旧密码：">
                <Input v-model="changePwd.oldpwd" type="password" password />
              </FormItem>
            </i-Col>
          </Row>
          <Row>
            <i-Col span="24">
              <FormItem label="新密码：">
                <Input v-model="changePwd.newpwd" type="password" password />
              </FormItem>
            </i-Col>
          </Row>
          <Row>
            <i-Col span="24">
              <FormItem label="确认密码：">
                <Input
                  v-model="changePwd.confirmpwd"
                  type="password"
                  password
                />
              </FormItem>
            </i-Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" @click.native.stop="handleCancelChangePwd"
          >取消</Button
        >
        <Button type="primary" @click.native.stop="handleSaveChangePwd"
          >确认</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import LogoutBtnCmp from '@/views/bss/sys-manage/user/components/logout'
import RecentFilesC from '@/views/bss/home/recent-file'
import { mapGetters } from 'vuex'
import UserService from '@/api/security/user'
export default {
  components: {
    LogoutBtnCmp,
    RecentFilesC
  },
  data() {
    return {
      searchVal: '',
      isShowChangePwd: false,
      changePwdLoading: true,
      changePwd: {}
    }
  },
  computed: {
    ...mapGetters(['areaInfo']),
    /** 当前登录用户基本信息 */
    userInfo() {
      return this.$store.state.user.userInfo
    },
    // 用户可操作菜单
    menus() {
      return this.$store.state.menu.menus.filter(
        menu => menu.code !== 'bss-home'
      )
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 点击修改密码
    handleChangePwd() {
      this.isShowChangePwd = true
    },
    // 取消修改密码
    handleCancelChangePwd() {
      this.isShowChangePwd = false
    },
    // 保存修改密码
    handleSaveChangePwd() {
      const { oldpwd, newpwd, confirmpwd } = this.changePwd
      if (oldpwd === newpwd) {
        return this.$Message.warning('新密码不能和旧密码相同')
      }
      if (newpwd !== confirmpwd) {
        return this.$Message.warning('确认密码和新密码不相同')
      }
      UserService.editPwd({
        oldPwd: oldpwd,
        newPwd: newpwd
      }).then(res => {
        if (res.ok()) {
          this.$Message.success('修改成功！')
          this.$router.push({
            path: '/login'
          })
        }
      })
    },
    headerMenuItemClick(menu) {
      this.$store.dispatch('headerMenuItemClick', menu)
    },
    async init() {}
  }
}
</script>
