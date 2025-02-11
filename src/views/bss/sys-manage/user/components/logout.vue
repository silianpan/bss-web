<!--

 -->
<template>
<button class="userButtom" @click="handleLogout">安全退出</button>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {
    // 退出登录
    handleLogout() {
      // 弹出确认框
      this.$Modal.confirm({
        title: '退出确认',
        content: '您确认退出系统吗？',
        'class-name': 'vertical-center-modal',
        loading: true,
        onOk: () => {
          this.$store.dispatch('logout').then(() => {
            this.$Modal.remove()
            this.$Message.success('退出登录')
            this.$router.push({
              name: 'login'
            })
          })
        }

      })
    }

  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
