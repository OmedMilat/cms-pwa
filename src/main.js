import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router'
import store from './store'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VModal, { dialog: true })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
