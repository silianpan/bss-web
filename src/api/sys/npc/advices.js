import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 代表意见 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {NpcAdvicesService}
 */
class NpcAdvicesService extends BaseService {
  /**
   *
   * 保存意见信息
   * @author icydate
   * @date 2020-01-13
   * @memberof NpcAdvicesService
   */
  static async saveAdvice(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/save/advice`, param)
    }
  }

  /**
   *
   *查找代表意见附件
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

  static async pageInfo(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/page/info`, params || {})
    }
  }

  /**
   * 本年度代表意见Top10
   */
  static async analysisNpcAdviceByDeptTop10(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/count/by/dept/top10`, params || {})
    }
  }

  /*
   *
   * 改变意见反馈状态
   * @author hsc
   * @date 2020-01-09
   * @static
   * @param {*} params
   * @param {*} fileName
   * @returns
   * @memberof NpcAdvicesService
   */
  static async changeRepliedStatus(id, replied) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/change/replied`, {
        id: id,
        replied: replied || false
      })
    }
  }
  /*
   *
   * 采编 意见
   * @author hsc
   * @date 2020-01-09
   * @static
   * @param {*} params
   * @param {*} fileName
   * @returns
   * @memberof NpcAdvicesService
   */
  static async coverZip(params, fileName) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.downLoadFile(`${this.baseUrlPrefix}/cover`, {
        data: params
      }, `${fileName || 'default'}.doc`)
    }
  }
}

NpcAdvicesService.baseUrlPrefix = Config.ServerApiPrefix + '/npc/npcAdvices'
export default NpcAdvicesService
