import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Config from '@/config'
import '@/plugins/view-ui/iview.js'
import '@/plugins/lodash'
import '@/plugins/moment'
import '@/plugins/js-cookie'
import '@/plugins/vue-org-tree'
import '@/plugins/json-editor'
import '@/directives/has-per'
import '@/assets/font/iconfont.css'
import axios from '@/plugins/axios'
import Icons from '@/components/icons/icons.vue'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'

// v-viewer
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
})

Vue.prototype.$config = Config
Vue.prototype.$dynamicDrawer = DynamicDrawerUtil

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('custom-icon', Icons)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
