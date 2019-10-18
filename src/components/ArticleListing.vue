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
            <Pagination :pages="pages" :currentPage.sync="currPage" />
        </div> 
    </div>
</template>

<script>
import {
  GET_GLOBAL_ARTICLES,
  GET_PROFILE_ARTICLES,
  GET_TAG_ARTICLES
} from "@/store/actionType";
import ArticleListItem from "./ArticleListItem";
import store from "@/store/index.js";
import Pagination from "./Pagination";

export default {
  name: "ArticleListing",
  components: {
    ArticleListItem,
    Pagination
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
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currPage: 1
    };
  },
  watch: {
    $route(to, from) {
      this.resetPagination();
    },
    "$route.params": {
      handler(newValue) {
        if (this.$route.path.includes("myArticles")) {
          this.getMyArticles();
        }
        if (this.$route.path.includes("favorites")) {
          this.getFavArticles();
        }
        if (this.$route.path.includes("tag")) {
          this.getTagArticles();
        }
      },
      immediate: true
    },
    currPage(newValue) {
      this.pagingInfo.offset = (newValue - 1) * this.itemsPerPage;
      if (this.$route.path.includes("myArticles")) {
        this.getMyArticles();
      } else if (this.$route.path.includes("favorites")) {
        this.getFavArticles();
      } else if (this.$route.path.includes("tag")) {
        this.getTagArticles();
      } else {
        if (this.version != undefined) {
          if (this.$route.params.username == undefined) {
            this.getGlobalArticles();
          }
        }
      }
    }
  },
  computed: {
    pagingInfo: function() {
      return {
        offset: (this.currPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
    },
    articles: function() {
      return this.$store.getters.articles;
    },

    isLoading: function() {
      return this.$store.getters.isLoading;
    },
    pages: function() {
      if (
        this.isLoading ||
        this.$store.getters.totalArticles <= this.itemsPerPage
      ) {
        return [];
      }
      return [
        ...Array(
          Math.ceil(this.$store.getters.totalArticles / this.itemsPerPage)
        ).keys()
      ].map(e => e + 1);
    }
  },
  created() {
    if (this.$route.path.includes("tag")) {
        this.getTagArticles();
    }
    else if (this.version != undefined) {
      if (this.$route.params.username == undefined) {
        this.getGlobalArticles();
      }
    }
  },
  methods: {
    getGlobalArticles() {
      this.$store.dispatch(GET_GLOBAL_ARTICLES, {
        version: this.version,
        limit: this.pagingInfo.limit,
        offset: this.pagingInfo.offset
      });
    },
    getMyArticles() {
      this.$store.dispatch(GET_PROFILE_ARTICLES, {
        author: this.username || this.favourite,
        limit: this.pagingInfo.limit,
        offset: this.pagingInfo.offset
      });
    },
    getFavArticles() {
      this.$store.dispatch(GET_PROFILE_ARTICLES, {
        favorited: this.username || this.favourite,
        limit: this.pagingInfo.limit,
        offset: this.pagingInfo.offset
      });
    },
    getTagArticles() {
      this.$store.dispatch(GET_TAG_ARTICLES, {
        tag: this.tag,
        limit: this.pagingInfo.limit,
        offset: this.pagingInfo.offset
      });
    },
    resetPagination() {
      this.pagingInfo.offset = 0;
      this.currPage = 1;
    }
  }
};
</script>

<style>
</style>
