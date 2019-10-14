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
      path: '/signup',
      name: 'signip',
      component: ()=> import("@/views/SignUp.vue")
    },
    {
      path: '/settings',
      name: 'settings',
      component: ()=> import("@/views/Settings.vue")
    },
    {
      path: '/editor',
      name: 'editor_add',
      component: ()=> import("@/views/ArticleCreate.vue")
    },
    {
      path: '/editor/:article',
      name: 'editor_edit',
      component: ()=> import("@/views/ArticleEdit.vue")
    },
    // {
    //   path: '/editor/:article',
    //   name: 'editor_view',
    //   component: ()=> import("@/views/Article.vue")
    // },
    {
      path: '/:usernmae',
      name: 'profile',
      component: ()=> import("@/views/Profile.vue")
    },
    
  ]
})
