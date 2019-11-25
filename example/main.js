import Vue from 'vue'
import App from './components/App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'

import querystring from 'querystring'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.prototype.$qs = querystring
Vue.config.debug = true
axios.defaults.withCredentials = false

Vue.config.productionTip = false

new Vue({
  router,
  $,
  render: h => h(App)
}).$mount('#app')
