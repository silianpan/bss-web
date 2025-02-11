<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserIP } from '@/utils/UserIPUtil'
export default {
  name: 'app',
  created() {
    // 获取内网ip
    getUserIP(ip => {
      console.log('ip', ip)
      localStorage.setItem('ip', ip)
      this.$store.dispatch('initAreaInfo')
      this.$store.dispatch('initWebApp')
    })
  }
}
</script>

<style lang="less">
// @import 'http://at.alicdn.com/t/font_1528087_8jdtik1dfp9.css';
</style>
