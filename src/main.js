import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'


import './assets/main.css'
import HttpService from './shared/http.service';
Vue.config.productionTip = false

HttpService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
