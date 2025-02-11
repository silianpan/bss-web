import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 用户 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {UserService}
 */
class UserService extends BaseService {
  /**
   *
   *管理员重置密码
   * @author hsc
   * @date 2019-12-13
   * @static
   * @param {*} id
   * @returns
   * @memberof UserService
   */
  static async resetPwd(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/reset/pwd/${id}`)
    }
  }

  /**
   * 修改密码
   * @param {Object} params 参数
   * @returns 是否成功
   */
  static async editPwd(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/edit/pwd`, params)
    }
  }

  /**
   *
   *更改账号状态
   * @author hsc
   * @date 2019-12-13
   * @static
   * @param {*} id
   * @param {*} enabled
   * @returns
   * @memberof UserService
   */
  static async changeEnabled(id, enable) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/change/enable`, {
        id: id,
        enable: enable || false
      })
    }
  }

  /**
   *
   * 查询角色与用户 的关系
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} roleId
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async listUsersRole(roleId, params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/list/users/role/${roleId}`, params)
    }
  }
}

UserService.baseUrlPrefix = Config.ServerApiPrefix + '/security/user'
export default UserService
