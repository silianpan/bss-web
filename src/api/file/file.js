import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 文件 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {FileService}
 */
class FileService extends BaseService {
  /**
   *
   * 查询近期文件(本周)
   * @author icydate
   * @date 2020-02-06
   * @static
   * @returns
   * @memberof FileService
   */
  static async getRecentFile() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/get/recent/file`)
    }
  }
}

FileService.baseUrlPrefix = Config.ServerApiPrefix + '/file/file'
export default FileService
