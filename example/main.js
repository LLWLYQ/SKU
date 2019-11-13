import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import querystring from 'querystring'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.prototype.$qs = querystring
Vue.config.debug = true
axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
