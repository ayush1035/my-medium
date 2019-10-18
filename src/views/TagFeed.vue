<template>
  <div class="home-tag"><ArticleListing :tag="tag"></ArticleListing></div>
</template>

<script>
import ArticleListing from "@/components/ArticleListing";

export default {
  name: "TagFeed",
  components: {
    ArticleListing
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
