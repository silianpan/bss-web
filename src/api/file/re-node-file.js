import BaseService from '@/api/base-service'
import Config from '@/config'
// import _ from 'lodash'
// import api from '@/plugins/axios/api'
/**
 *
 * 提供 文件与 数据关系 接口
 * @author icydate
 * @date 2019-11-25
 * @class ModuleService
 * @extends {ReNodeFileService}
 */
class ReNodeFileService extends BaseService {

}

ReNodeFileService.baseUrlPrefix = Config.ServerApiPrefix + '/file/reNodeFile'
export default ReNodeFileService
