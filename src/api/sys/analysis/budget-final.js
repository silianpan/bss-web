import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class AnalysisBudgetFinalService extends BaseService {
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
   * 决算数据预处理
   */
  static async dataPreHandle(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/data/prehandle`, params)
    }
  }
  /**
   * 根据条件求和查询
   */
  static async querySumByCon(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/query/sum/by/con`, params)
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
  /**
   * 根据条件查询子明细
   */
  static async queryChildByCon(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/query/child/by/con`, params)
    }
  }
}

AnalysisBudgetFinalService.baseUrlPrefix = Config.ServerApiPrefix + '/analysis/analysisBudgetFinal'
export default AnalysisBudgetFinalService
