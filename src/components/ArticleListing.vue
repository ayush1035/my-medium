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
import { GET_GLOBAL_ARTICLES } from "@/store/actionType";
import ArticleListItem from "./ArticleListItem";

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
    }
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
    this.getGlobalArticles();
  },
  methods: {
    getGlobalArticles() {
      this.$store.dispatch(GET_GLOBAL_ARTICLES, {version:this.version});
    }
  }
};
</script>

<style>
</style>
