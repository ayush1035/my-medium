<template>
   <div class="profile-page"><ArticleListing :favourite="username" /></div>
</template>

<script>
import ArticleListing from "@/components/ArticleListing";

export default {
  name: "FavArticles",
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
