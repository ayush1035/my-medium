<template>
  <router-link :to="homeRoute" :class="className" v-text="name"></router-link>
</template>

<script>
export default {
  name: "Tag",
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: "tag-pill tag-default"
    }
  },

  computed: {
    homeRoute() {
      return { name: "homeTag", params: { tag: this.name } };
    }
  }
};
</script>
