import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 政府部门预算|决算信息表操作 接口
 * @author icydate
 * @date 2019-12-30
 * @class ModuleService
 * @extends {GovBudgetService}
 */
class GovBudgetService extends BaseService {
  /**
   *
   * 查询年份范围
   * @author icydate
   * @date 2019-12-30
   * @memberof GovBudgetService
   */
  static async listYears(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/list/years`, param)
    }
  }

  /**
   *
   * 保存预决算信息
   * @author icydate
   * @date 2020-01-06
   * @memberof GovBudgetService
   */
  static async saveBudget(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/save/budget`, param)
    }
  }

  /**
   *
   * 分页查询预决算信息
   * @author icydate
   * @date 2020-01-07
   * @memberof GovBudgetService
   */
  static async pageBudget(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/page/budget`, param)
    }
  }

  /**
   *
   * 查询指定预决算信息的文件
   * @author icydate
   * @date 2020-01-07
   * @memberof GovBudgetService
   */
  static async findFileByNodeId(nodeId) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/find/file/by/${nodeId}`)
    }
  }

  /**
   *
   * 增加预决算点击量
   * @author icydate
   * @date 2020-01-13
   * @memberof GovBudgetService
   */
  static async addBudgetHits(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/add/budget/hits/${id}`)
    }
  }

  /**
   * 本年度预决算报告总数、本年度代表意见总数、本年度责任单位反馈意见总数
   */
  static async analysisBudgetCount(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/budget/count`, params || {})
    }
  }

  /**
   * 本年度预决算类型汇总
   */
  static async analysisBudgetCountByType(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/budget/count/by/type`, params || {})
    }
  }
}

GovBudgetService.baseUrlPrefix = Config.ServerApiPrefix + '/budget/govBudget'
export default GovBudgetService
