import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class AnalysisBudgetDeptFinalService extends BaseService {
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

AnalysisBudgetDeptFinalService.baseUrlPrefix =
  Config.ServerApiPrefix + '/analysis/analysisBudgetFinalDeptS3InOutFa'
export default AnalysisBudgetDeptFinalService
