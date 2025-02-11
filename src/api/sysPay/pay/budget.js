import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class VwBudgetService {
  static async listYears() {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/list/years`)
    }
  }

  static async listDepts(code) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.get(`${this.baseUrlPrefix}/list/depts`, { code })
    }
  }

  static async pageInfo(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/page/budgetVoucher`, param)
    }
  }

  static async topTen(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/top/ten`, param)
    }
  }

  static async hotBp(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/hot/bp`, param)
    }
  }

  static async bpMoney(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/bp/money`, param)
    }
  }

  static async bsMoney(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/bs/money`, param)
    }
  }

  static async bsiMoney(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/bsi/money`, param)
    }
  }

  static async typeStatus(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/type/status`, param)
    }
  }

  static async moneyTrend(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/money/trend`, param)
    }
  }
}

VwBudgetService.baseUrlPrefix = Config.ServerApiPrefix + '/pay/vwBudgetVoucher'
export default VwBudgetService
