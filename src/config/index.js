export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * api服务前缀
   */
  ServerApiPrefix: '/api-bss',

  /**
   * @description office 在线预览服务
   */
  // OfficeWebAppServer: 'http://192.168.100.201/Redirect/view.aspx?src='
  // OfficeWebAppServer: 'http://172.16.194.132/Redirect/view.aspx?src='

  // 正式环境使用
  OfficeWebAppServer: 'http://192.168.100.201/op/view.aspx?src='

  // libreoffice环境使用
  // OfficeWebAppServer: 'http://localhost:9980'
}
