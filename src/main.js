import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import { BootstrapVue, BIconChevronCompactLeft, BIconChevronCompactRight } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection: process.env.NODE_ENV === 'development' ? 'http://localhost' : '/'
}))

Vue.use(BootstrapVue)
Vue.component('BIconChevronCompactLeft', BIconChevronCompactLeft)
Vue.component('BIconChevronCompactRight', BIconChevronCompactRight)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
