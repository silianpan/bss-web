<style lang="less">
@import './login.less';

.login-title-border {
  font-size: 35px;
  color: white;
  font-weight: bold;
  border-top: 2px solid white;
  border-radius: 5px 20% 50%
}
</style>

<template>
<div class="login">
  <div class="login-content">
    <div class="login-title">
      <div>
        XXX人民代表大会
      </div>
      <div class="login-title-border">
        财政联网预算监督系统
      </div>
    </div>
    <div class="login-con">
      <Card>
        <login-form :onSuccessValid="handleSubmit" :userNameRules="userNameRules"></login-form>
      </Card>
    </div>
  </div>
</div>
</template>

<script>
import LoginForm from './login-form'
import LoginService from '@/api/auth/login'
import FrontUserService from '@/api/auth/front-user'
export default {
  components: {
    LoginForm
  },
  data: function () {
    /** 登陆验证规则 */
    return {
      userNameRules: [{
        required: true,
        validator: this.userNameValidator,
        trigger: 'blur'
      }]
    }
  },
  computed: {},
  methods: {
    userNameValidator: function (rule, value, callback) {
      if (this.$_.isNil(value) || this.$_.isEmpty(value)) {
        callback(new Error('登陆账户不能为空'))
      } else {
        callback()
      }
    },
    async handleSubmit({
      userName,
      password
    }) {
      // 发起登陆请求 ，获取返回数据 初始化 vuex 进入home 页面
      let res = await LoginService.login({ accountName: userName, pwd: password })
      if (res.ok()) {
        // 设置 token
        const token = res.data
        // 获取user基本信息
        // 获取user菜单权限信息
        res = await FrontUserService.queryFrontUserInfo(token)
        if (res.ok()) {
          // 设置基本信息
          // this.$store.commit('initUserInfo', res.data)
          // this.$store.commit('resetTagNavList')
          this.$Message.success('登录成功')
          this.$router.push({
            name: 'bss-home'
          })
        }
      }
    },
    convertTreeToList(menus, parent) {
      let res = {}
      menus.forEach(m => {
        let mItem = {
          ...m
        }
        // mItem.breadcrumb =
        delete mItem.children
        res[m.id] = mItem
        if (m && 'children' in m && m.children.length > 0) {
          let _r = this.convertTreeToList(m.children)
          Object.assign(res, _r)
        }
        return m
      })
      return res
    }
  }
}
</script>
