<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      <router-link
        class="comment-author"
        :to="{ name: 'profile', params: { username: comment.author.username } }"
      >
        &nbsp;{{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{formatDate(comment.createdAt) }}</span>
      <span class="mod-options">
        <i class="ion-trash-a" v-on:click="deleteComment(slug, comment.id)">Remove</i>
      </span>
    </div>
  </div>
</template>

<script>
import { COMMENT_DELETE } from "@/store/actionType";
import moment from "moment";

export default {
  name: "Comment",
  props: {
    slug: { type: String, required: true },
    comment: { type: Object, required: true }
  },
  computed: {
    
  },
  methods: {
    deleteComment(slug, commentId) {
      this.$store.dispatch(COMMENT_DELETE, { slug, commentId });
    },
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
