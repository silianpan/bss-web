import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 菜单 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {MenuService}
 */
class MenuService extends BaseService {
  /**
   *
   *获取用户前端菜单信息
   * @author hsc
   * @date 2019-11-29
   * @static
   * @returns
   * @memberof MenuService
   */
  static async queryMenuTree() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/tree`)
    }
  }
  /**
   *
   *查询角色权限菜单信息
   * @author hsc
   * @date 2020-01-13
   * @static
   * @param {*} params
   * @returns
   * @memberof MenuService
   */
  static async queryPermissionMenuTree(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/permission/tree`, params || {})
    }
  }
}

MenuService.baseUrlPrefix = Config.ServerApiPrefix + '/security/menu'
export default MenuService
