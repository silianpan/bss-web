class RegexUtil {
  static test(str, regex) {
    const _s = str || ''
    let p = new RegExp(regex)
    return p.test(_s)
  }
  /**
   *
   * 正浮点数验证器
   * @author hsc
   * @date 2018-11-20
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testPositiveFloatingNumber(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.PositiveFloatingNumber)
  }

  /**
   *
   * 身份证验证
   * @author hsc
   * @date 2018-11-21
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testIdNumber(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.IdNumber)
  }
  /**
   * 电话号码验证
   * @author hsc
   * @date 2018-11-21
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testPhone(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.Phone)
  }

  /**
   *
   * email 验证
   * @author hsc
   * @date 2018-11-21
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testEmail(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.Email)
  }

  /**
   *中文验证
   *
   * @author hsc
   * @date 2018-11-21
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testChinese(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.Email)
  }

  /**
   *
   * 验证非零的正整数
   * @author hsc
   * @date 2018-11-21
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testNonZeroPositiveInteger(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.NonZeroPositiveInteger)
  }
  /**
   *
   * 验证含零的正整数
   * @author zxy
   * @date 2018-11-26
   * @static
   * @param {*} str
   * @returns
   * @memberof RegexUtil
   */
  static testPositiveInteger(str) {
    const _s = `${str || ''}`
    return RegexUtil.test(_s, this.regexs.PositiveInteger)
  }
}
RegexUtil.regexs = {
  // 正浮点数
  PositiveFloatingNumber:
    '^(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*))$',
  // 非负浮点数（正浮点数 + 0
  NonNegativeFloatingNumber: '^d+(.d+)?$',

  // 验证Email地址
  Email: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$',

  // 验证身份证号（15位或18位数字）：
  IdNumber: '^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$',

  // 验证电话号码： --正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
  Phone: '^(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}$',

  // 验证汉字
  Chinese: '^[\u4e00-\u9fa5],{0,}$',

  // 验证非零的正整数 验证非零的正整数：^\+?[1-9][0-9]*$
  NonZeroPositiveInteger: '^\\+?[1-9][0-9]*$',

  // 验证包含0得正整数
  PositiveInteger: '^\\+?(0|[1-9][0-9]*)$'
}

// 动态注入 方法
export default RegexUtil
