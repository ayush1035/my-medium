<template>
    <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">My Medium</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="isLoggedIn">
              <router-link class="nav-link" 
              :to="{ name: 'homeOwnFeed' }"
               active-class="active"
            >Your Feed</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link"  
                 active-class="active" 
                 :to="{ name: 'homeGlobal' }"
                  exact>Global Feed</router-link>
            </li>
            <li class="nav-item" v-if="tag">
                <router-link
                  :to="{ name: 'homeTag', params: { tag } }"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="ion-pound"></i> {{ tag }}
                </router-link>
              </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <Tag v-for="(tag, index) in tags" :name="tag" :key="index" ></Tag>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import Tag from "@/components/Tag";
import {GET_TAGS} from "@/store/actionType"
export default {
  name: "home",
  components:{
    Tag
  },
  mounted(){
    this.$store.dispatch(GET_TAGS)
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    tags: function(){
      return this.$store.getters.tags;
    },
    tag:function(){
      return this.$route.params.tag;
    }
  }
};
</script>

