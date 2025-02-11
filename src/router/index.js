import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import ConstantRoutes from './routes'
import _ from 'lodash'
Vue.use(VueRouter)

const router = new VueRouter({
  base: '/bss/',
  routes: _.cloneDeep(ConstantRoutes)
})
const LoginRouteName = 'login'
router.beforeEach((to, from, next) => {
  if (to.name !== LoginRouteName) {
    // 如果用户已经登录则跳转到请求页面
    if (store.getters.isLogin === true) {
      next()
    } else {
      // 否则跳转到登录页面
      next({
        name: LoginRouteName
      })
    }
  } else {
    next()
    // 如果本地存有用户信息则发出退出登录请求再跳转到登录页面
    // if (store.getters.isLogin === true) {
    //   store.dispatch('logout').then(() => {
    //     next()
    //   })
    // } else {
    //   next()
    // }
  }
})

export default router
