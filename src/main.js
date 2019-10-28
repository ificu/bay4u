import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'

import './plugins/socketPlugin';


import BootstrapVue from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
