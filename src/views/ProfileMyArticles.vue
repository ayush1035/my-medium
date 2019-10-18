<template>
   <div class="profile-page"><ArticleListing :username="username" /></div>
</template>

<script>
import ArticleListing from "@/components/ArticleListing";

export default {
  name: "MyArticles",
  components: {
    ArticleListing
  },
  computed: {
    username() {
      return this.$route.params.username;
    }
  }
};
</script>

<style>
</style>
