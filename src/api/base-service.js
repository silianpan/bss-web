import api from '@/plugins/axios/api'
import _ from 'lodash'
/**
 *
 * 抽取的公共方法 增删改查分页查询
 * @author hsc
 * @date 2018-08-26
 * @class BaseService
 */
class BaseService {
  /**
   *
   * 根据条件分页查询 数据
   * @author hsc
   * @date 2018-09-17
   * @static
   * @param {*} query 参考 LegaPage.class
   * @returns
   * @memberof BaseService
   */
  static async page(query = {}) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/page`, query)
    }
  }

  /**
   * 查询符合条件的数据
   *
   *
   * @author hsc
   * @date 2018-09-17
   * @static
   * @param {*} query 参数：参考 QueryCondition.class
   * @returns
   * @memberof BaseService
   */
  static async findAll(query = {}) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/all`, query)
    }
  }

  /**
   *
   * 新增 or 修改
   *
   * @author hsc
   * @date 2018-09-17
   * @static
   * @param {*} query json格式字符串
   * @returns
   * @memberof BaseService
   */
  static async save(params) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/save`, params)
    }
  }

  /**
   *根据id 查找数据
   *
   * @author hsc
   * @date 2018-09-17
   * @static
   * @param {*} id
   * @returns
   * @memberof BaseService
   */
  static async findById(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/findById`, { id: id })
    }
  }

  /**
   *根据id物理删除数据
   *
   * @author hsc
   * @date 2018-09-17
   * @static
   * @param {*} id
   * @returns
   * @memberof BaseService
   */
  static async delete(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.delete(`${this.baseUrlPrefix}/delete`, { id: id })
    }
  }

  /**
   *
   * 逻辑删除
   * @author hsc
   * @date 2018-09-17
   * @static
   * @param {*} id
   * @returns
   * @memberof BaseService
   */
  static async logicDelete(id) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.delete(`${this.baseUrlPrefix}/logic/delete`, { id: id })
    }
  }

  /**
   *
   *根据条件筛选数量
   * @author hsc
   * @date 2018-10-22
   * @static
   * @param {*} query
   * @returns
   * @memberof BaseService
   */
  static async countByCondition(query) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/count/number`, query)
    }
  }
}

export default BaseService
