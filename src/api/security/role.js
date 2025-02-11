import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 角色操作 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {RoleService}
 */
class RoleService extends BaseService {
  static async saveForm(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/saveForm`, params)
    }
  }
  /**
   *
   *更改角色状态
   * @author hsc
   * @date 2019-12-13
   * @static
   * @param {*} id
   * @param {*} enabled
   * @returns
   * @memberof RoleService
   */
  static async changeEnable(id, enable) {
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
   * 给角色赋予某个菜单的权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async signUserToRole(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/sign/user/to/role`, params || {})
    }
  }

  /**
   *
   * 取消某个用户的角色权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async unSignUser(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/unsign/user`, params || {})
    }
  }

  static async signMenuToRole(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/sign/menu/to/role`, params || {})
    }
  }

  /**
   *
   * 取消某个角色的菜单权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async unSignMenu(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/unsign/menu`, params || {})
    }
  }

  static async signElementToRole(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/sign/element/to/role`, params || {})
    }
  }

  /**
   *
   * 取消某个角色的节点元素权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async unSignElement(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/unsign/element`, params || {})
    }
  }

  static async signRouteToRole(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/sign/route/to/role`, params || {})
    }
  }

  /**
   *
   * 取消某个角色的菜单权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async unSignRoute(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/unsign/route`, params || {})
    }
  }
  /**
   *
   * 查询该用户下的角色权限信息
   * @author hsc
   * @date 2020-01-14
   * @static
   * @param {*} userId
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async listReRolesByUserId(userId, params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/list/re/roles/${userId}`, params || {})
    }
  }

  /**
   *
   * 查询该用户下拥有的角色信息
   * @author hsc
   * @date 2020-01-14
   * @static
   * @param {*} userId
   * @param {*} params
   * @returns
   * @memberof RoleService
   */
  static async listRolesByUserId(userId) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/list/roles/${userId}`)
    }
  }
}

RoleService.baseUrlPrefix = Config.ServerApiPrefix + '/security/role'
export default RoleService
