import _ from 'lodash'
export default {
  /**
   *
   * 随机生成uuid
   * @author hsc
   * @date 2019-12-24
   * @returns
   */
  uuid() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },
  extname(filename) {
    if (!filename || typeof filename !== 'string') {
      return false
    }
    let a = filename
      .split('')
      .reverse()
      .join('')
    let b = a
      .substring(0, a.search(/\./))
      .split('')
      .reverse()
      .join('')
    return b
  },
  findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
      componentNames = [componentName]
    } else {
      componentNames = componentName
    }

    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
      parent = parent.$parent
      if (parent) name = parent.$options.name
    }
    return parent
  },
  findComponentDownward(context, componentNamePrefix) {
    const childrens = context.$children
    let children = null
    if (childrens.length) {
      for (const child of childrens) {
        const name = child.$options.name
        if (name && name.startsWith(componentNamePrefix)) {
          children = child
          break
        } else {
          children = this.findComponentDownward(child, componentNamePrefix)
          if (children) break
        }
      }
    }
    return children
  },

  convertToQc(conditions) {
    if (!conditions || conditions.length === 0) {
      return {}
    }
    let qc = {}
    conditions.forEach(c => {
      let { field, value } = c
      qc[field] = value
    })
    return qc
  },
  convertToC(qc) {
    if (!qc || _.isEmpty(qc)) {
      return []
    }
    let c = []
    for (const key in qc) {
      if (qc.hasOwnProperty(key)) {
        c.push({
          field: key,
          value: qc[key]
        })
      }
    }
    return c
  }
}
