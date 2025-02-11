<template>
<div style="padding: 16px 122px 16px 122px">
  <Row type="flex" justify="center" align="middle" class="code-row-bg">
    <i-Col span="24">
      <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" :label-width="80">
        <FormItem label="账  号:" prop="userName">
          <i-Input v-model="form.userName" placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="密  码:" prop="password">
          <i-Input type="password" v-model="form.password" placeholder="请输入密码" />
        </FormItem>
      </Form>
      <Button class="loginBtn" :loading="buttonLoading" @click="handleSubmit" type="primary" long>登录</Button>
    </i-Col>
  </Row>
</div>
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
