<template>
    <div class="article-preview">
          <div class="article-meta">
            <router-link :to="{ name: 'profile-articles', params: { username: article.author.username } }"><img :src="article.author.image" /></router-link>
            <div class="info">
               <router-link
                    :to="{ name: 'profile-articles', params: { username: article.author.username } }"
                    class="author"
                >
                {{ article.author.username }}
            </router-link>
              <span class="date">{{formatDate(article.createdAt) }}</span>
            </div>
            <button :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }" class="btn btn-sm pull-xs-right" @click="toggleFavourite" >
              <font-awesome-icon icon="heart" /> {{ article.favoritesCount }}
            </button>
          </div>
             <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
                <h1>{{article.title}}</h1>
                <p>{{article.description}}</p>
                <span>Read more...</span>
             </router-link>
        </div>
</template>

<script>
import moment from "moment";
import { FAVORITE_REMOVE, FAVORITE_ADD } from "@/store/actionType";

export default {
  name: "ArticleListItem",
  props: {
    article: {
      type: Object,
      required: false
    }
  },
  computed:{
    isLoggedIn: function(){
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    toggleFavourite() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: "login" });
        return;
      }
      const actionType = this.article.favorited
        ? FAVORITE_REMOVE
        : FAVORITE_ADD;
      this.$store.dispatch(actionType, this.article);
    }
  }
};
</script>

<style>
</style>
