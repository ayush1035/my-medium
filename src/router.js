import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: "",
          name: "homeGlobal",
          component: () => import("@/views/GlobalFeed")
        },
        {
          path: "ownFeed",
          name: "homeOwnFeed",
          component: () => import("@/views/OwnFeed")
        },
        {
          path: "tag/:tag",
          name: "homeTag",
          component: () => import("@/views/TagFeed")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import("@/views/Login.vue")
    },
    {
      path: '/signup',
      name: 'signup',
      component: ()=> import("@/views/SignUp.vue")
    },
    {
      path: '/settings',
      name: 'settings',
      component: ()=> import("@/views/Settings.vue")
    },
    {
      
      name: 'article-edit',
      path: '/editor/:slug?',
      component: ()=> import("@/views/ArticleEdit.vue")
    },
    {
      name: "article",
      path: "/articles/:slug",
      component: () => import("@/views/Article"),
      props: true
    },
    {
      path: '/:username',
      name: 'profile',
      component: ()=> import("@/views/Profile.vue")
    },
    
  ]
})
