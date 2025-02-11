import _ from 'lodash'
export default {

  /**
   * 获取session-storage 中的值
   * @param {*} key
   * @param {*} defaultValue
   */
  get(key, defaultValue) {
    let value = sessionStorage.getItem(key)
    return value || defaultValue
  },
  /**
   * 放入 session-storage 中，自动字符串化 obj
   * @param {*} key
   * @param {*} obj
   */
  set(key, obj) {
    if (_.isObject(obj)) {
      sessionStorage.setItem(key, JSON.stringify(obj))
    } else {
      sessionStorage.setItem(key, obj)
    }
  },
  /**
   * 从 session-storage 中移除key
   * @param {*} key
   */
  remove(key) {
    sessionStorage.removeItem(key)
  },

  /**
   * 从 session-storage 取出key并将值对象化
   * @param {*} key
   * @param {*} defaultValue
   */
  parse(key, defaultValue) {
    let value = sessionStorage.getItem(key)
    let rs = defaultValue
    try {
      rs = JSON.parse(value)
    } catch (e) {
    }
    return rs || defaultValue
  }
}
