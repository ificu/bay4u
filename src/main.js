import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import VueCookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'

import './plugins/socketPlugin';

import BootstrapVue from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Directives from './plugins/directives';
import VueScrollStop from 'vue-scroll-stop'

import './utils/filters';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)
Vue.use(Directives)
Vue.use(VueCookies)
Vue.use(VueScrollStop)

Vue.prototype.$EventBus = new Vue();

VueCookies.config('1d')

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')