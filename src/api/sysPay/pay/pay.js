import Config from '@/config'
import _ from 'lodash'
import api from '@/plugins/axios/api'

class PayService {
  // static async pageQuery(param) {
  //   if (_.isNil(this.baseUrlPrefix)) {
  //     console.log('请设置请求的前缀地址')
  //   } else {
  //     return api.post(`${this.baseUrlPrefix}/page`, param)
  //   }
  // }

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
      return api.post(`${this.baseUrlPrefix}/page/payVoucher`, param)
    }
  }

  static async topTen(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/top/ten`, param)
    }
  }

  static async hotBsi(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/hot/bsi`, param)
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

  static async moneyTrend(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/money/trend`, param)
    }
  }

  static async contrastBudgetBs(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/contrast/budget/bs`, param)
    }
  }

  static async contrastBudgetBsi(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/contrast/budget/bsi`, param)
    }
  }

  static async percentBudgetBs(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/percent/budget/bs`, param)
    }
  }

  static async percentBudgetBsi(param) {
    if (_.isNil(this.baseUrlPrefix)) {
      console.log('请设置请求的前缀地址')
    } else {
      return api.post(`${this.baseUrlPrefix}/percent/budget/bsi`, param)
    }
  }
}

PayService.baseUrlPrefix = Config.ServerApiPrefix + '/pay/vwPayVoucher'
export default PayService
