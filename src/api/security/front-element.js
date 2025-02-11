import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 vue 元素节点 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {FrontElementService}
 */
class FrontElementService extends BaseService {
  /**
   *
   *
   * @author hsc
   * @date 2020-01-15
   * @static
   * @param {*} roleId
   * @param {*} params
   * @returns
   * @memberof FrontElementService
   */
  static async listElementsRole(roleId, params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/list/elements/role/${roleId}`, params)
    }
  }

  /**
   *
   *更改节点状态
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
}

FrontElementService.baseUrlPrefix = Config.ServerApiPrefix + '/security/frontElement'
export default FrontElementService
