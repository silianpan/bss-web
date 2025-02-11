<template>
  <div>
    <!-- 如果没有配置白名单 -->
    <h2
      v-if="
        areaInfo === null ||
          $_.isNil(areaInfo.eleRegion) ||
          $_.isEmpty(areaInfo.eleRegion)
      "
      style="text-align:center;margin-top:20px"
    >
      请联系管理员添加IP白名单
    </h2>
    <!-- 如果配置了白名单，且区域为市区 -->
    <div
      v-else-if="areaInfo !== null && areaInfo.eleRegion === '542100'"
      class="loginMain"
    >
      <div class="loginLogo"></div>
      <div class="loginMian">
        <div class="loginTitle">系统登录</div>
        <login-form
          :onSuccessValid="handleSubmit"
          :userNameRules="userNameRules"
        ></login-form>
      </div>
    </div>
    <!-- 如果配置了白名单，且区域为区县 -->
    <div v-else class="loginMainQx">
      <div
        class="loginbg"
        :style="{
          background:
            'url(' +
            require(`../../../assets/styles/images/area/${areaInfo.eleRegion}/bg.png`) +
            ') no-repeat'
        }"
      />
      <div class="loginformContainer">
        <div class="loginformWarpper">
          <div
            class="logo"
            :style="{
              background:
                'url(' +
                require(`../../../assets/styles/images/area/${areaInfo.eleRegion}/logo.png`) +
                ') no-repeat'
            }"
          >
            <!-- <img src="@/assets/styles/images/area/542123/logo.png" alt="" /> -->
          </div>
          <div class="loginform">
            <login-form-qx
              :onSuccessValid="handleSubmit"
              :userNameRules="userNameRules"
            ></login-form-qx>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './login-form'
import LoginFormQx from './login-form/login-form-qx'
import LoginService from '@/api/auth/login'
import { mapGetters } from 'vuex'
export default {
  components: {
    LoginForm,
    LoginFormQx
  },
  computed: {
    ...mapGetters(['areaInfo'])
  },
  data() {
    /** 登陆验证规则 */
    return {
      userNameRules: [
        {
          required: true,
          validator: this.userNameValidator,
          trigger: 'blur'
        }
      ]
    }
  },
  methods: {
    userNameValidator: function(rule, value, callback) {
      if (this.$_.isNil(value) || this.$_.isEmpty(value)) {
        callback(new Error('登陆账户不能为空'))
      } else {
        callback()
      }
    },
    async handleSubmit({ userName, password }) {
      // 发起登陆请求 ，获取返回数据 初始化 vuex 进入home 页面
      let res = await LoginService.login({
        accountName: userName,
        pwd: password
      })
      if (res.ok()) {
        this.$Message.success('账号验证成功')
        this.$store.commit('loginSuccess')
        // 初始化用户配置
        this.$store.dispatch('initAuthConfig').then(rs => {
          if (rs) {
            this.$router.push({
              name: 'bss-home'
            })
          } else {
            this.$Message.error('初始化路由失败')
          }
        })
      }
    }
  }
}
</script>
