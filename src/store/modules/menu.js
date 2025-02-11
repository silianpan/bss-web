import SessionUtil from '@/utils/SessionStorageUtil'
import FrontUserService from '@/api/auth/front-user'
import _ from 'lodash'
export default {
  state: {
    // 用户拥有的权限菜单
    menus: [],

    // header 激活菜单的 name 值
    headerActiveMenuName: SessionUtil.get('header-active-menu-name', ''),

    // sider-bar 激活菜单的 name 值
    siderBarActiveMenuName: SessionUtil.get('sider-active-menu-name', ''),

    // 应该根据布局规则来
    siderMenus: []
  },
  getters: {
    isEmpytUserMenus: state => _.isEmpty(state.menus),

    siderMenus: state => {
      if (_.isEmpty(state.siderMenus)) {
        // 从header 中获取
        return (
          (state.menus.find(m => m.id === state.headerActiveMenuName) || {})
            .children || []
        )
      }
      return state.siderMenus
    },

    hasSider: (state, getters) => !_.isEmpty(getters.siderMenus)
  },
  mutations: {
    setMenus: (state, pyload) => {
      state.menus = pyload
    },

    setHeaderActiveMenuName: (state, value) => {
      state.headerActiveMenuName = value
      SessionUtil.set('header-active-menu-name', value)
    },

    setSiderActiveMenuName: (state, value) => {
      state.siderBarActiveMenuName = value
      SessionUtil.set('sider-active-menu-name', value)
    },

    setSiderMenus: (state, pyload) => {
      state.siderMenus = pyload
    }
  },
  actions: {
    /**
     *清除菜单及激活的菜单
     *
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     */
    async clearMenus({ commit }) {
      commit('setMenus', [])
      commit('setHeaderActiveMenuName', '')
    },

    /**
     *
     *
     * @author hsc
     * @date 2019-12-11
     * @param {*} { commit }
     */
    async initUserMenus({ commit }) {
      let rb = await FrontUserService.queryFrontMenus()
      if (rb.ok()) {
        commit('setMenus', rb.data)
        // 初始化 siderMenus
      } else {
        commit('setMenus', [])
      }
    },

    async headerMenuItemClick({ commit, dispatch }, menu) {
      commit('setHeaderActiveMenuName', menu.vueRouteName)
      let children = menu.children || []
      let targetRoute = {
        ...menu
      }
      //
      if (_.isArray(children) && children.length > 0) {
        targetRoute = children[0]
      }
      commit('setSiderActiveMenuName', targetRoute.vueRouteName)
      commit('setSiderMenus', children)
      return dispatch('goTargetRoute', targetRoute)
    }
  }
}
