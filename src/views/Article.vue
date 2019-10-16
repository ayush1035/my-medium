<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
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
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div>{{article.body}}</div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <!-- <RwvTag
                :name="tag"
                className="tag-default tag-pill tag-outline"
              ></RwvTag> -->
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
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
          </div>
        
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentEditor
            v-if="isLoggedIn"
            :slug="article.slug"
            :userImage="article.author.image"
          >
          </CommentEditor>
          <!-- <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
          </p> -->
          <Comment
            v-for="(comment, index) in comments"
            :slug="article.slug"
            :comment="comment"
            :key="index"
          >
          </Comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {GET_ARTICLE,GET_COMMENTS} from '@/store/actionType';
import Comment from "@/components/Comment";
import CommentEditor from "@/components/CommentEditor"
import moment from "moment";

export default {
    name:"Article",
    components:{
        Comment,
        CommentEditor
    },
    mounted(){
        this.$store.dispatch(GET_ARTICLE,this.$route.params);
        this.$store.dispatch(GET_COMMENTS,this.$route.params);
    },
    computed:{
        article:function(){return this.$store.getters.article},
        comments:function(){return this.$store.getters.comments},
        isLoggedIn: function(){return this.$store.getters.isLoggedIn}
    },
    methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
}
</script>
