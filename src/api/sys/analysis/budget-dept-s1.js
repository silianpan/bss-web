import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class AnalysisBudgetDeptService extends BaseService {
  /**
   *
   * 查询年份范围
   */
  static async listYears(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/list/years`, param)
    }
  }

  /**
   * 查询部门
   * @param {*} param
   */
  static async listDepts(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/list/depts`, param)
    }
  }

  /**
   * 根据条件查询明细
   */
  static async queryByCon(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/query/by/con`, params)
    }
  }
}

AnalysisBudgetDeptService.baseUrlPrefix =
  Config.ServerApiPrefix + '/analysis/analysisBudgetDeptS1OutFa'
export default AnalysisBudgetDeptService
