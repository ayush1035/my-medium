import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import("@/views/Login.vue")
    },
    {
      path: '/singup',
      name: 'signip',
      component: ()=> import("@/views/SignUp.vue")
    }
    
  ]
})
