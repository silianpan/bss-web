// import DynamicRouteUtil from '@/utils/DynamicRouteUtil'
// import VueRouter from 'vue-router'

export default {
  state: {
    // 可预览的文件列表
    previewAvalibleList: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'png', 'jpg']
  },
  mutations: {

  },
  actions: {
    /**
     *
     * 如果用户已经登录则检查本地需要加载的信息
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     * @param {*} paload： router
     * @returns
     */
    async initWebApp({ getters, dispatch }) {
      if (getters.isLogin === true) {
        await dispatch('checkAuthConfig')
      }
    },

    /**
     *检查用户配置，如果信息缺失，则重新获取
     *
     * @author hsc
     * @date 2019-12-11
     * @param {*} { getters, dispatch }
     * @param {*} router
     */
    async checkAuthConfig({ getters, dispatch }) {
      if (getters.isEmptyUserInfo) {
        dispatch('initAuthInfo')
      }
      if (getters.isEmpytUserMenus) {
        dispatch('initUserMenus')
      }
      if (getters.isEmpytUserPermissions) {
        dispatch('initUserPermissions')
      }
      if (getters.isEmptyRoutes) {
        dispatch('initAppRoutes')
      }
    },

    /**
     * 获取用户配置，会覆盖之前用户的配置信息
     *
     * @author hsc
     * @date 2019-12-11
     * @param {*} { commit, dispatch }
     * @param {*} router
     * @returns
     */
    async initAuthConfig({ dispatch }) {
      // 初始化用户基本信息
      dispatch('initAuthInfo')
      // 动态初始化用户菜单
      dispatch('initUserMenus')
      // 动态初始化用户可操作的权限
      dispatch('initUserPermissions')
      // 动态初始化routes
      let r = await dispatch('initAppRoutes')
      return r
    }

  }
}
