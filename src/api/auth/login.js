
import Config from '@/config'
import api from '@/plugins/axios/api'
import _ from 'lodash'
class LoginService {
  /**
   *
   * @author hsc
   * @date 2019-11-29
   * @static
   * @param {*} params
   * accountName : 账户名
   * pwd :密码
   * @returns
   * @memberof LoginService
   */
  static async login(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/account/pwd/doLogin`, params)
    }
  }

  /**
   *退出登录
   * @author hsc
   * @date 2019-11-29
   * @static
   * @returns
   * @memberof LoginService
   */
  static async logout() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/logout`)
    }
  }
}
LoginService.baseUrlPrefix = Config.ServerApiPrefix + '/auth/login'
export default LoginService
