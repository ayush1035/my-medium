<template>
    <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title"  v-model="article.title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?"  v-model="article.description">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)"  v-model="article.body"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tags">
                    <div class="tag-list">
                        <span class="tag-default tag-pill"
                            v-for="(tag, index) of article.tagList"
                            :key="tag + index"
                        >
                    {{ tag }}
                  </span>
                    </div>
            </fieldset>
            <button @click="publishArticle(article.slug)" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {
  GET_ARTICLE,
  UPDATE_ARTICLE,
  CREATE_ARTICLE,
  RESET_ARTICLE,
  REMOVE_TAG,
  ADD_TAG
} from "../store/actionType";
export default {
  name: "ArticleCU",
  created() {
    if (this.article.slug) {
      this.$store.dispatch(RESET_ARTICLE);
    }
    if (this.$route.params.slug !== undefined) {
      this.$store.dispatch(GET_ARTICLE, this.$route.params);
    }
  },
  data() {
    return {
      tags: null
    };
  },
  computed: {
    article: function() {
      return this.$store.getters.article;
    }
  },
  methods: {
    publishArticle(slug) {
      let actionType = slug ? UPDATE_ARTICLE : CREATE_ARTICLE;
      //adding tags
      let arr = this.tags.split(' ');
      this.article.tagList = this.article.tagList.concat(arr);
      this.$store
        .dispatch(actionType, this.article)
        .then(({ data }) => {
          this.$router.push({
            name: "article",
            params: { slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
        });
    },
  }
};
</script>

