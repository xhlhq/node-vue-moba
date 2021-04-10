import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 5.x)
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

import './assets/styles/style.scss'

import './assets/iconfont/iconfont.css'

import router from './router'

import Card from './components/Card/Card.vue'
import ListCard from './components/ListCard/ListCard.vue'
Vue.component('my-card',Card)
Vue.component('my-list-card',ListCard)

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
