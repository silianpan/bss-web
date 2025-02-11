<template>
  <div class="loginCustom">
    <Row type="flex" justify="center" align="middle" class="code-row-bg">
      <i-Col span="24">
        <Form
          ref="loginForm"
          :model="form"
          :rules="rules"
          @keydown.enter.native="handleSubmit"
        >
          <FormItem prop="userName" class="formItem">
            <i-Input
              size="large"
              v-model="form.userName"
              placeholder="请输入用户名"
            >
              <img slot="prefix" src="@/assets/styles/images/user.png" alt="" />
            </i-Input>
          </FormItem>
          <FormItem prop="password" class="formItem">
            <i-Input
              size="large"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
            >
              <img slot="prefix" src="@/assets/styles/images/pwd.png" alt="" />
            </i-Input>
          </FormItem>
        </Form>
        <Button
          class="loginBtn"
          :loading="buttonLoading"
          @click="handleSubmit"
          size="large"
          type="primary"
          long
          >登录</Button
        >
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
        return [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ]
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
        return [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
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
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.$_.isFunction(this.onSuccessValid)) {
            this.onSuccessValid({
              userName: this.form.userName,
              password: this.form.password
            })
              .then(() => {
                this.buttonLoading = false
              })
              .catch(e => {
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

<style lang="less">
.loginCustom {
  .ivu-input-prefix,
  .ivu-input-suffix {
    width: 72px;
    top: 16px;
  }
  .ivu-input-with-prefix {
    padding-left: 72px;
  }
  input {
    height: 72px;
    background: #f8f8f8;
    border-radius: 10px;
    border: none;
  }

  .loginBtn {
    position: relative;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #fff;
    border-radius: 4px;
    outline: none;
    transition: all 0.3s ease-in-out;
    /* ff 3.6+ */
    background: -moz-linear-gradient(
      0deg,
      rgba(230, 70, 70, 1) 0%,
      rgba(250, 104, 104, 1) 100%
    );

    /* safari 5.1+,chrome 10+ */
    background: -webkit-linear-gradient(
      0deg,
      rgba(230, 70, 70, 1) 0%,
      rgba(250, 104, 104, 1) 100%
    );

    /* opera 11.10+ */
    background: -o-linear-gradient(
      0deg,
      rgba(230, 70, 70, 1) 0%,
      rgba(250, 104, 104, 1) 100%
    );

    /* ie 6-9 */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#E64646', endColorstr='#FA6868', GradientType=1 );

    /* ie 10+ */
    background: -ms-linear-gradient(
      0deg,
      rgba(230, 70, 70, 1) 0%,
      rgba(250, 104, 104, 1) 100%
    );

    /* global 94%+ browsers support */
    background: linear-gradient(
      0deg,
      rgba(230, 70, 70, 1) 0%,
      rgba(250, 104, 104, 1) 100%
    );
    box-shadow: 0px 1px 5px 1px rgba(250, 104, 104, 1);
    &:hover {
      /* ff 3.6+ */
      background: -moz-linear-gradient(
        0deg,
        rgba(250, 104, 104, 1) 0%,
        rgba(230, 70, 70, 1) 100%
      );

      /* safari 5.1+,chrome 10+ */
      background: -webkit-linear-gradient(
        0deg,
        rgba(250, 104, 104, 1) 0%,
        rgba(230, 70, 70, 1) 100%
      );

      /* opera 11.10+ */
      background: -o-linear-gradient(
        0deg,
        rgba(250, 104, 104, 1) 0%,
        rgba(230, 70, 70, 1) 100%
      );

      /* ie 6-9 */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FA6868', endColorstr='#E64646', GradientType=1 );

      /* ie 10+ */
      background: -ms-linear-gradient(
        0deg,
        rgba(250, 104, 104, 1) 0%,
        rgba(230, 70, 70, 1) 100%
      );

      /* global 94%+ browsers support */
      background: linear-gradient(
        0deg,
        rgba(250, 104, 104, 1) 0%,
        rgba(230, 70, 70, 1) 100%
      );
    }
    height: 60px;
    border-radius: 42px;
  }
 
  .formItem {
    margin-bottom: 50px;
  }
}
</style>
