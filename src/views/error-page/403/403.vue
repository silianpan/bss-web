<template>
<div class="error403">
  <div class="error403-body-con">
    <Card>
      <div class="error403-body-con-title">4<span class="error403-0-span">
          <Icon type="android-lock"></Icon>
        </span><span class="error403-key-span">
          <Icon size="220" type="ios-bolt"></Icon>3
        </span></div>
      <p class="error403-body-con-message">You don't have permission</p>
    </Card>
  </div>
</div>
</template>

<script>
export default {
  name: 'Error403',
  methods: {
    backPage() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push({
        names: 'home'
      })
    }
  }
}
</script>

<style lang="less">
@import './403.less';
</style>
