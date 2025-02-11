import SessionUtil from '@/utils/SessionStorageUtil'
import FrontUserService from '@/api/auth/front-user'
import LoginService from '@/api/auth/login'
import AreaService from '@/api/sys/area/index'
import _ from 'lodash'
export default {
  state: {
    // 用户基本信息
    userInfo: {},
    isLogin: SessionUtil.parse('is-login'),
    // 区域信息
    areaInfo: null
  },
  getters: {
    // 是否已登录
    isLogin: state => state.isLogin,
    isEmptyUserInfo: state => _.isEmpty(state.userInfo),
    areaInfo: state => {
      if (_.isNil(state.areaInfo) || _.isEmpty(state.areaInfo)) {
        return SessionUtil.get('area-info', null)
      }
      return state.areaInfo
    }
  },
  mutations: {
    /**
     * 设置前端用户基本信息
     * @author hsc
     * @date 2019-12-10
     * @param {*} state
     * @param {*} pyload
     */
    setUserInfo: (state, pyload) => {
      state.userInfo = pyload
      // 设置sessionStorage 中用户的基本信息
      // SessionUtil.set('user-info', pyload)
    },

    // 设置区域信息
    setAreaInfo: (state, pyload) => {
      state.areaInfo = pyload
      SessionUtil.set('area-info', pyload)
    },

    /** 登录成功 */
    loginSuccess: state => {
      state.isLogin = true
      SessionUtil.set('is-login', true)
    },
    /** 退出成功 */
    logoutSuccess: state => {
      state.isLogin = false
      SessionUtil.set('is-login', false)
    }
  },
  actions: {
    // 退出登录|清除登录信息 action
    async logout({ dispatch, commit }) {
      await LoginService.logout()
      await commit('setUserInfo', {})
      await commit('logoutSuccess')
      await dispatch('clearRoutes')
      await dispatch('clearMenus')
    },

    /**
     *
     * 初始化认证信息 action
     * @author hsc
     * @date 2019-12-11
     * @param {*} { dispatch, commit }
     * @returns
     */
    async initAuthInfo({ commit }) {
      let rb = await FrontUserService.queryFrontUserInfo()
      if (rb.ok()) {
        // 设置基本信息
        commit('setUserInfo', rb.data)
      }
      return rb.ok()
    },

    /**
     * 初始化区域信息
     */
    async initAreaInfo({ commit }) {
      let rb = await AreaService.findByIp(localStorage.getItem('ip'))
      // 如果ok，不为null，不为空
      if (rb.ok() && !_.isNil(rb.data) && !_.isEmpty(rb.data)) {
        commit('setAreaInfo', rb.data)
      }
    }
  }
}
