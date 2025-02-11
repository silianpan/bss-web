import _ from 'lodash'
import FrontUserService from '@/api/auth/front-user'
export default {
  state: {
    // 用户拥有的权限菜单
    elPermissions: [
    ]

  },
  getters: {
    // 判断用户权限是否为空
    isEmpytUserPermissions: (state) => _.isEmpty(state.elPermissions),
    // 判断是否拥有此权限
    hasPer: (state) => (pers) => {
      // 判断 2个数组中是否存在重复值
      let dif = _.difference(pers || [], state.elPermissions) || []
      return dif.length !== (pers || []).length
    }
  },
  mutations: {
    // 设置 el 权限
    setElPermisssions: (state, pyload) => {
      state.elPermissions = pyload
    }

  },
  actions: {

    /**
     * 清除用户dom元素 权限
     *
     * @author hsc
     * @date 2019-12-10
     * @param {*} { commit }
     */
    async clearPermissions({ commit }) {
      commit('setElPermisssions', [])
    },

    /**
     *
     *
     * @author hsc
     * @date 2019-12-11
     * @param {*} { commit }
     */
    async initUserPermissions({ commit }) {
      let rb = await FrontUserService.queryFrontUserElementPers()
      if (rb.ok()) {
        commit('setElPermisssions', rb.data)
      } else {
        commit('setElPermisssions', [])
      }
    }
  }
}
