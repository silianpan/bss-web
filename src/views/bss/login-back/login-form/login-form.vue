<template>
<Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
  <FormItem prop="userName">
    <i-Input v-model="form.userName" placeholder="请输入用户名">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
    </i-Input>
  </FormItem>
  <FormItem prop="password">
    <i-Input type="password" v-model="form.password" placeholder="请输入密码">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
    </i-Input>
  </FormItem>
  <FormItem>
    <Button :loading="buttonLoading" @click="handleSubmit" type="primary" long>登录</Button>
  </FormItem>
</Form>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }]
      }
    },
    onSuccessValid: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  data() {
    return {
      buttonLoading: false,
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.buttonLoading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.$_.isFunction(this.onSuccessValid)) {
            this.onSuccessValid({
              userName: this.form.userName,
              password: this.form.password
            }).then(() => {
              this.buttonLoading = false
            }).catch(e => {
              this.buttonLoading = false
            })
          }
        } else {
          this.buttonLoading = false
        }
      })
    }
  }
}
</script>
