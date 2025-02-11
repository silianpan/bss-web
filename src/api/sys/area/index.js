import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 区域 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {AreaService}
 */
class AreaService extends BaseService {
  /**
   * 根据ip获取区域信息
   * @author silianpan
   * @date 2021-12-07
   * @memberof AreaService
   */
  static async findByIp(ip) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/find/by/ip`, { ip })
    }
  }

  /**
   *
   *获取用户前端菜单信息
   * @author hsc
   * @date 2019-11-29
   * @memberof AreaService
   */
  static async queryAreaTree() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/tree`)
    }
  }

  /**
   * 获取子区域
   * @author icydate
   * @date 2019-12-30
   * @memberof AreaService
   */
  static async getAreaChildren(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/area/children/${id}`)
    }
  }

  /**
   * 检查code是否重复
   * @author icydate
   * @date 2020-01-13
   */
  static async checkCode(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/check/code`, param)
    }
  }
}

AreaService.baseUrlPrefix = Config.ServerApiPrefix + '/area/area'
export default AreaService
