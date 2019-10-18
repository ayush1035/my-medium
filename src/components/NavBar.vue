<template>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">My Medium</router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link  class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="nav-link"
                :to="{ name: 'article-edit' }"
            >
                New Article
            </router-link>
        </li>
           <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/signup">Sign up</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" @click="logout" >Logout</a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import { LOGOUT } from "@/store/actionType";

export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

