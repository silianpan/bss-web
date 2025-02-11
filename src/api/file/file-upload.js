import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 文件 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {FileUploadService}
 */
class FileUploadService {
  /**
   *
   * 删除文件|文件夹
   * @author hsc
   * @date 2019-12-13
   * @static
   * @param {*} id
   * @param {*} enabled
   * @returns
   * @memberof FileUploadService
   */
  static async delete(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/delete`, params)
    }
  }

  /**
   *下载文件
   *
   * @author hsc
   * @date 2019-12-17
   * @static
   * @param {*} fileName
   * @param {*} relativePath
   * @returns
   * @memberof FileUploadService
   */
  static async download(fileName, relativePath) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.downLoadFile(`${this.baseUrlPrefix}/download`, {
        params: {
          name: fileName,
          path: relativePath
        },
        method: 'get'
      }, fileName, 'get')
    }
  }

  static async downloadZip(params, fileName) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.downLoadFile(`${this.baseUrlPrefix}/download/zip`, {
        data: params
      }, `${fileName || 'default'}.zip`)
    }
  }
}

FileUploadService.baseUrlPrefix = Config.ServerApiPrefix + '/file/upload'

FileUploadService.uploadTempFileUrl = FileUploadService.baseUrlPrefix + '/temp'

FileUploadService.uploadFormalUrl = FileUploadService.baseUrlPrefix + '/formal'

export default FileUploadService
