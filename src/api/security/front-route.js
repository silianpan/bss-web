import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 vue 路由 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {FrontRouteService}
 */
class FrontRouteService extends BaseService {
  static async queryTree() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/tree`)
    }
  }

  /**
   *
   *查询角色前端路由权限
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof FrontRouteService
   */
  static async queryPermissionFrontRouteTree(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/permission/tree`, params || {})
    }
  }
}

FrontRouteService.baseUrlPrefix = Config.ServerApiPrefix + '/security/frontVueRoute'
export default FrontRouteService
