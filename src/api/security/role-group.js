import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
// import _ from 'lodash'
// import api from '@/plugins/axios/api'
/**
 *
 * 提供 角色组操作 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {RoleGroupService}
 */
class RoleGroupService extends BaseService {
  /**
   * 查询每个地区的角色组列表
   * @returns 角色组列表
   */
  static async list() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/list`)
    }
  }
}

RoleGroupService.baseUrlPrefix = Config.ServerApiPrefix + '/security/roleGroup'
export default RoleGroupService
