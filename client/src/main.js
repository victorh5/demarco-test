import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './plugins/axios'
import VueSweetalert2 from 'vue-sweetalert2'
import '@/assets/scss/_main.scss'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = api
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
