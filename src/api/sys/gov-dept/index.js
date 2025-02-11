import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 部门 接口
 * @author icydate
 * @date 2019-11-12
 * @class GovDeptService
 * @extends {BaseService}
 */
class GovDeptService extends BaseService {
  /**
   * 获取部门和区域的融合树
   * @author icydate
   * @date 2019-12-12
   */
  static async getFusionTree() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/fusion/tree`)
    }
  }

  /**
   * 检查code是否重复
   * @author icydate
   * @date 2019-12-17
   */
  static async checkCode(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/check/code`, param)
    }
  }

  /**
   * 查询同一区域的部门树
   * @author icydate
   * @date 2019-12-18
   */
  static async getDeptTreeByArea(id, areaId) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/dept/tree/by/area`, { id, areaId })
    }
  }

  /**
   * 查询区域下一级部门
   * @author icydate
   * @date 2019-12-18
   */
  static async getTopDeptByArea(areaId) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/top/dept/by/${areaId}`)
    }
  }
}

GovDeptService.baseUrlPrefix = Config.ServerApiPrefix + '/dept/govDept'
export default GovDeptService
