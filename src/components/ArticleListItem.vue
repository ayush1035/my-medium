<template>
    <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"><img :src="article.author.image" /></a>
            <div class="info">
               <router-link
                    :to="{ name: 'profile', params: { username: article.author.username } }"
                    class="author"
                >
                {{ article.author.username }}
            </router-link>
              <span class="date">{{formatDate(article.createdAt) }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> {{ article.favoritesCount }}
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
export default {
  name: "ArticleListItem",
  props: {
    article: {
      type: Object,
      required: false,
      default: {}
    }
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>

<style>
</style>
