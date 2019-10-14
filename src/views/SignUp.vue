<template>
    <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <a href="">Have an account?</a>
        </p>

        <ul class="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" v-model="name" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" v-model="email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" v-model="password" placeholder="Password">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" v-model="password_confirmation" placeholder="Confirm Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right" @click="register">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>

import { REGISTER } from "@/store/actionType";
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },

  methods: {
    register: function() {
      let data = {
        username: this.name,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch(REGISTER, data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

