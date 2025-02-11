import { Drawer } from 'view-design'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import _ from 'lodash'

let DynamicDrawer = {}
DynamicDrawer.newInstance = (properties, vNode) => {
  const _props = Object.assign(
    {},
    properties || {}
  )
  let Instance = new Vue({
    name: 'dynamic-drawer',
    store: (vNode || {}).$store || store,
    router: (vNode || {}).$router || router,
    components: Object.assign({}, _props.components),
    data: Object.assign({
      // 是否可见
      visible: false,
      // 按钮加载状态
      buttonLoading: false,
      // spin加载状态
      loading: false
    }, _props),
    render(h) {
      let drawerConent = h('div', '')
      if (_.isFunction(_props.render)) {
        drawerConent = _props.render(h)
      }
      return h(
        Drawer,
        {
          props: Object.assign({
          }, _props),
          domProps: {
            value: this.visible
          },
          on: {
            input: status => {
              this.visible = status
            },
            'on-resize-width': () => {
              this.onResizeWidth()
            },
            'on-close': visible => {
              if (visible === false) {
                this.$nextTick(() => {
                  this.destroy()
                })
              }
            },
            'on-visible-change': visible => {
              if (visible === false) {
                this.$nextTick(() => {
                  this.destroy()
                })
              }
            }
          }
        },
        [drawerConent]
      )
    },
    computed: {

    },
    methods: {
      _onRemove() {
        if (_.isFunction(_props.onRemove)) {
          _props.onRemove()
        }
      },
      destroy() {
        this.$destroy()
        this._onRemove()
        setTimeout(() => {
          if (!_.isEmpty(vNode) && !_.isEmpty(vNode.$el)) {
            vNode.$el.removeChild(this.$el)
          } else {
            document.body.removeChild(this.$el)
          }
        }, 1000)
      }
    }
  })
  const component = Instance.$mount()
  if (!_.isEmpty(vNode) && !_.isEmpty(vNode.$el)) {
    vNode.$el.appendChild(component.$el)
  } else {
    document.body.appendChild(component.$el)
  }
  const modal = Instance.$children[0]

  return {
    /** 显示 弹出框 */
    show: () => {
      modal.visible = true
    },
    /** 移除 */
    remove() {
      modal.visible = false
      // modal.$parent.remove()
    },
    /** 当前的 modal */
    component: modal
  }
}
export default DynamicDrawer
