import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 意见反馈接口 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {NpcAdvicesFeedbackService}
 */
class NpcAdvicesFeedbackService extends BaseService {
  /**
   *
   *查找反馈意见附件
   * @author hsc
   * @date 2020-01-07
   * @static
   * @param {*} id
   * @returns
   * @memberof NpcAdvicesService
   */
  static async listFiles(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/files`, {
        id: id
      })
    }
  }
  /**
   *保存意见反馈信息
   *
   * @author hsc
   * @date 2020-01-07
   * @static
   * @param {*} params
   * @returns
   * @memberof NpcAdvicesFeedbackService
   */
  static async saveForm(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/saveForm`, params)
    }
  }

  /**
   * 本年度意见及反馈汇总
   */
  static async analysisNpcAdviceFeedbackByType(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/count/by/type`, params || {})
    }
  }
}

NpcAdvicesFeedbackService.baseUrlPrefix = Config.ServerApiPrefix + '/npc/npcAdvicesFeedback'
export default NpcAdvicesFeedbackService
