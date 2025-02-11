import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class AnalysisBudgetFinalSocialApi extends BaseService {
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

AnalysisBudgetFinalSocialApi.baseUrlPrefix =
  Config.ServerApiPrefix + '/analysis/analysisBudgetFinalSocial'
export default AnalysisBudgetFinalSocialApi
