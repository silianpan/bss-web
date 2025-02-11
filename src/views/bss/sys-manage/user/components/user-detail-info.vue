<!--  -->
<template>
<div>
  <div style="padding:16px;">
    <Alert type="success" show-icon>
      用户基本信息
      <Icon type="ios-information-circle" slot="icon">
      </Icon>
    </Alert>
    <Card>
      <Row :gutter="16">
        <i-col :xs="24">
          <div class="mt-8 ">
            <Avatar v-if="!$_.isEmpty(userInfo.avatar)" size="large" shape="square" :src="userInfo.avatar" />
            <Avatar v-else shape="square" icon="ios-person" size="large" />
          </div>
        </i-col>
        <i-col :xs="24" :sm="12">
          <div class="mt-8 ">
            <span class="mr-16">昵称:</span>
            {{userInfo.nickName}}
          </div>
        </i-col>
        <i-col :xs="24" :sm="12">
          <div class="mt-8 ">
            <span class="mr-16">账号:</span>
            {{userInfo.accountName}}
          </div>
        </i-col>

        <i-col :xs="24" :sm="12">
          <div class="mt-8 ">
            <span class="mr-16">是否启用:</span>
            <Tag color="#13ce66" v-if="userInfo.enabled">启用</Tag>
            <Tag color="#ff4949" v-else>禁用</Tag>
          </div>
        </i-col>
      </Row>
    </Card>
  </div>
</div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
