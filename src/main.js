import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BIconChevronCompactLeft, BIconChevronCompactRight } from 'bootstrap-vue'
// import './assets/_custom.scss'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.component('BIconChevronCompactLeft', BIconChevronCompactLeft)
Vue.component('BIconChevronCompactRight', BIconChevronCompactRight)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
