<template>
     <div>
        <div v-if="isLoading" class="article-preview">Loading articles...</div>
        <div v-else>
            <div v-if="articles.length === 0" class="article-preview">
                No articles are here... yet.
            </div>
            <ArticleListItem
                v-for="(article, index) in articles"
                :article="article"
                :key="article.title + index"
            />
        </div> 
    </div>
</template>

<script>
import { GET_GLOBAL_ARTICLES, GET_PROFILE_ARTICLES } from "@/store/actionType";
import ArticleListItem from "./ArticleListItem";
import store from "@/store/index.js";

export default {
  name: "ArticleListing",
  components: {
    ArticleListItem
  },
  props: {
    version: {
      type: String,
      required: false,
      default: "global"
    },
    username: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    favourite: {
      type: String,
      required: false
    }
  },
  watch: {
    '$route.params': {
        handler(newValue) {
            if(this.$route.path.includes('myArticles')){
                this.getMyArticles();
            }
            if(this.$route.path.includes('favorites')){
                this.getFavArticles();
            }
        },
        immediate: true,
    },
    
  },
  computed: {
    articles: function() {
      return this.$store.getters.articles;
    },
    isLoading: function() {
      return this.$store.getters.isLoading;
    }
  },
  created() {
    if (this.version != undefined) {
      if (this.$route.params.username == undefined) {
        this.getGlobalArticles();
      }
    }
  },
  methods: {
    getGlobalArticles() {
      this.$store.dispatch(GET_GLOBAL_ARTICLES, { version: this.version });
    },
    getMyArticles() {
      this.$store.dispatch(GET_PROFILE_ARTICLES, { author: this.username || this.favourite });
    },
    getFavArticles() {
      this.$store.dispatch(GET_PROFILE_ARTICLES, { favorited: this.username || this.favourite });
    }
  }
};
</script>

<style>
</style>
