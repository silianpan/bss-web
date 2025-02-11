import axios from '@/plugins/axios'
import { Message } from 'view-design'
import store from '@/store'
import router from '@/router'
import _ from 'lodash'
import FileDownLoad from 'js-file-download'
const HttpErrorCode = {
  400: '请求错误',
  401: '未授权，请登陆',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}
/**
 * 跳转到登录页面
 */
const goLoginDebounce = _.debounce(
  function() {
    store.dispatch('logout')
    router.push({
      name: 'login'
    })
  },
  250,
  { maxWait: 1000 }
)
/**
 * 展示出错误信息
 */
const showErrorMsg = _.debounce(
  function(msg) {
    Message.error({
      content: msg,
      duration: 5
    })
  },
  250,
  { maxWait: 1000 }
)

/**
 *
 *检查reponse返回状态
 * @author hsc
 * @date 2019-11-29
 * @param {*} [response={}]
 * @returns
 */
function checkStatus(response = {}) {
  let { status, statusText } = response
  if (status === 200 || status === 304) {
    return response.data
  } else {
    let msg = HttpErrorCode[status] || statusText
    showErrorMsg(msg)
    return {
      code: status,
      msg: msg
    }
  }
}

/**
 *检查登录状态
 *
 * @author hsc
 * @date 2019-11-29
 * @param {*} response
 * @returns
 */
function checkLogin(response) {
  let { code } = response
  if (
    code === 7004
  ) {
    goLoginDebounce()
  }
  return response
}
/**
 *检查服务器返回结果
 * @author hsc
 * @date 2019-11-29
 * @param {*} result
 * @returns
 */
function checkResult(result) {
  let { code } = result
  result.ok = function() {
    return false
  }
  if (code === '200' || code === 200) {
    result.ok = function() {
      return true
    }
  } else {
    showErrorMsg(result.msg)
  }
  return result
}

export default {

  get: (url, params = {}) => {
    return axios
      .request({
        url: url,
        params,
        method: 'get'
      })
      .then(checkStatus)
      .then(checkResult)
      .then(checkLogin)
  },
  uploadFile: (url, data) => {
    let options = {
      url: url,
      data,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-URL-PATH': location.pathname
      }
    }
    return axios
      .request(options)
      .then(checkStatus)
      .then(checkResult)
      .then(checkLogin)
  },
  /**
   * 下载文件
   * @param {*} url
   * @param {*} params
   */
  async downLoadFile (url, options, fileName) {
    let _options = Object.assign({}, {
      url: url,
      method: 'post',
      responseType: 'blob'
    }, options)
    
    const res = await axios.request(_options)
    let resBlob = res.data // <--- store the blob if it is
    let resData = null
    try {
      let resText = await new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.addEventListener('abort', reject)
        reader.addEventListener('error', reject)
        reader.addEventListener('loadend', () => {
          resolve(reader.result)
        })
        reader.readAsText(resBlob)
      })
      resData = JSON.parse(resText) // <--- try to parse as json evantually
    } catch (err) {
      // ignore
    }
    // Now you have `resData` and `resBlob` at the same time.
    // `resData` would be the normal data object,
    // or the error object if `resBlob` is expected.
    if (resData) {
      Message.error({
        content: resData.msg,
        duration: 5
      })
    } else {
      // handle blob
      FileDownLoad(resBlob, `${fileName}`)
    }
  },
  post: (url, data, options = {}) => {
    let _options = Object.assign({}, options, {
      url: url,
      data,
      method: 'post'
    })
    return axios
      .request(_options)
      .then(checkStatus)
      .then(checkResult)
      .then(checkLogin)
  },
  delete: (url, params) => {
    return axios
      .request({
        url: url,
        params,
        method: 'delete'
      })
      .then(checkStatus)
      .then(checkResult)
      .then(checkLogin)
  },
  put: (url, data, hasParams = false) => {
    let options = {
      url: url,
      data,
      method: 'put'
    }
    if (hasParams) {
      options.params = data
    }
    return axios
      .request(options)
      .then(checkStatus)
      .then(checkResult)
      .then(checkLogin)
  }
}
