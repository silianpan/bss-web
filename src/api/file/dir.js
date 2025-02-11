import BaseService from '@/api/base-service'
import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'
/**
 *
 * 提供 文件夹操作 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {DirService}
 */
class DirService extends BaseService {
  /**
   * 根据路径查找子文件及文件夹
   * @author hsc
   * @date 2019-12-18
   * @static
   * @param {*} path
   * @returns
   * @memberof FileService
   */
  static async findChildrenPyFilePath(path) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/find/children/by/path`, {
        path: path
      })
    }
  }

  /**
   * 根据pid查找目录
   * @author icydate
   * @date 2020-01-03
   * @memberof FileService
   */
  static async findDirByPid(pid) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/find/dir/by/${pid}`)
    }
  }

  /**
   * 根据pid查找上级目录的兄弟目录
   * @author icydate
   * @date 2020-01-03
   * @memberof FileService
   */
  static async findParentBrotherDirByPId(pid) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/find/parent/brother/dir/by/${pid}`)
    }
  }
}

DirService.baseUrlPrefix = Config.ServerApiPrefix + '/file/dir'
export default DirService
