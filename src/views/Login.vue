<template>
    <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign in</h1>
        <p class="text-xs-center">
          <router-link to="/signup">Need an account?</router-link>
        </p>

        <div >
          <fieldset class="form-group">
            <input class="form-control form-control-lg" v-model="email" type="email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" v-model="password" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right" @click="login(email,password)" type="button">
            Sign in
          </button >
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { LOGIN } from "@/store/actionType";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
