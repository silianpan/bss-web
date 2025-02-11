import Vue from 'vue'
// 注册 全局指令 (指令函数)
import _ from 'lodash'
Vue.directive('has-per', {
  inserted: function (el, binding, vnode) {
    // 获取指令绑定的值
    let values = binding.value
    let btnPermissions = []
    if (_.isArray(values)) {
      btnPermissions = values
    } else if (_.isString(btnPermissions)) {
      btnPermissions.push(btnPermissions)
    }
    // 如果有此权限则 显示 ，无此权限 则 删除 元素
    if (!vnode.context.$store.getters.hasPer(btnPermissions)) {
      el.parentNode.removeChild(el)
    }
  }
})
