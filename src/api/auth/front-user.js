
import Config from '@/config'
import api from '@/plugins/axios/api'
import _ from 'lodash'
class FrontUserService {
  /**
   * 获取用户基本信息
   * @author hsc
   * @date 2019-11-25
   * @static
   * @returns
   * @memberof ModuleService
   */
  static async queryFrontUserInfo() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/user/info`)
    }
  }

  /**
   *请求当前用户可操作的节点元素
   *
   * @author hsc
   * @date 2020-01-15
   * @static
   * @returns
   * @memberof FrontUserService
   */
  static async queryFrontUserElementPers() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/user/element/per`)
    }
  }

  /**
   *
   *查询当前用户菜单信息
   * @author hsc
   * @date 2019-12-09
   * @static
   * @returns
   * @memberof FrontUserService
   */
  static async queryFrontMenus() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/vue/menus`)
    }
  }

  /**
   *
   * 查询当前路由信息
   * @author hsc
   * @date 2019-12-09
   * @static
   * @returns
   * @memberof FrontUserService
   */
  static async queryFrontRoutes() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/vue/routes`)
    }
  }
}
FrontUserService.baseUrlPrefix = Config.ServerApiPrefix + '/auth/front'
export default FrontUserService
