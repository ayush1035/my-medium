import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import home from "./home.module";
import profile from "./profile.module";
import article from "./article.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
     auth,
     home,
     profile,
     article
  }
});
