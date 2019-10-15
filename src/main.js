import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import {CHECK_USER} from './store/actionType.js'
import './assets/main.css'
import HttpService from './shared/http.service';
Vue.config.productionTip = false

HttpService.setup();

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_USER)]).then(next)
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
