import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import { BootstrapVue, BIconChevronCompactLeft, BIconChevronCompactRight, BIconCalendarPlus } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection: process.env.NODE_ENV === 'development' ? 'http://localhost' : '/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  }
}))

Vue.use(BootstrapVue)
Vue.component('BIconChevronCompactLeft', BIconChevronCompactLeft)
Vue.component('BIconChevronCompactRight', BIconChevronCompactRight)
Vue.component('BIconCalendarPlus', BIconCalendarPlus)

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
