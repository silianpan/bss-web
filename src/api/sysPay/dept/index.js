import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class DeptService {
  static async listDepts(code) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/list/depts`, { code })
    }
  }
}

DeptService.baseUrlPrefix = Config.ServerApiPrefix + '/dept/eleEnterprise'
export default DeptService
