import Axios from 'axios'
import ViewUI, { Message } from 'view-design'
// import 'axios-response-logger'

Axios.defaults.withCredentials = true

class HttpRequest {
  // 销毁请求实例
  destroy(url) {}
  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        ViewUI.LoadingBar.start()
        return config
      },
      error => {
        // 对请求错误做些什么
        Message.error('加载超时！')
        ViewUI.LoadingBar.finish()
        return Promise.reject(error)
      }
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      response => {
        ViewUI.LoadingBar.finish()
        return response
      },
      error => {
        ViewUI.LoadingBar.finish()
        return Promise.resolve(error.response)
      }
    )
  }
  // 创建实例
  create(options) {
    let conf = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      },
      withCredentials: true
    }
    return Object.assign(conf, options)
  }
  // 请求实例
  request(options) {
    options = this.create(options)
    this.interceptors(Axios, options.url)
    return Axios(options)
  }
}
export default HttpRequest
