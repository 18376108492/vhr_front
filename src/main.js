import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import {postKeyValueRequest} from './utls/api.js'
import {postRequest} from './utls/api.js'
import {putRequest} from './utls/api.js'
import {deleteRequest} from './utls/api.js'
import {getRequest} from './utls/api.js'

Vue.prototype.postKeyValueRequest=postKeyValueRequest
Vue.prototype.postRequest=postRequest
Vue.prototype.putRequest=putRequest
Vue.prototype.deleteRequest=deleteRequest
Vue.prototype.getRequest=getRequest


Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
