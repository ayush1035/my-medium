import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import {CHECK_USER} from './store/actionType.js'
import './assets/main.css'
import HttpService from './shared/http.service';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
Vue.config.productionTip = false

library.add(faHeart)
HttpService.setup();
// fa-icons
Vue.component('font-awesome-icon', FontAwesomeIcon);

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_USER)]).then(next)
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
