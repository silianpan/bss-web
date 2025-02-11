import FrontUserService from '@/api/auth/front-user'
import DynamicRouteUtil from '@/utils/DynamicRouteUtil'
import VueRouter from 'vue-router'
import router from '@/router'
import ConstantRoutes from '@/router/routes'

import _ from 'lodash'
export default {
  state: {
    // 用户拥有的route
    routes: []
  },
  mutations: {
    setRoutes(state, pyload) {
      state.routes = pyload
    }
  },
  getters: {
    isEmptyRoutes(state) {
      return _.isEmpty(state.routes)
    }
  },
  actions: {
    /**
     *
     * 清除前端routes
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     */
    async clearRoutes({ commit }) {
      commit('setRoutes', [])
    },

    /**
     *初始化 routes
     *
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     * @param {*} paload： router
     * @returns
     */
    async initAppRoutes({ commit }) {
      let rb = await FrontUserService.queryFrontRoutes()
      if (rb.ok()) {
        if (!_.isEmpty(rb.data) && rb.data.length > 0) {
          // 设置前端路由
          let _routes = DynamicRouteUtil.convertToRoutes(rb.data)
          commit('setRoutes', rb.data)
          const newRouter = new VueRouter({
            routes: _.cloneDeep(ConstantRoutes)
          })
          router.options.routes = _.cloneDeep(ConstantRoutes)
          router.matcher = newRouter.matcher
          router.addRoutes(_routes)
        }
      }
      return rb.ok()
    },

    /**
     * 跳转到指定路由页面
     * @param {*} context
     * @param {*} menu
     */
    async goTargetRoute(context, menu) {
      let query = {}
      let params = {}
      if (_.isString(menu.query)) {
        try {
          query = JSON.parse(menu.query)
        } catch (error) {
        }
      }
      if (_.isString(menu.params)) {
        try {
          params = JSON.parse(menu.params)
        } catch (error) {

        }
      }
      router.push({
        name: menu.vueRouteName,
        query: Object.assign({}, query, {
          _: Math.random()
        }),
        params: Object.assign({}, params)
      })
    }
  }
}
