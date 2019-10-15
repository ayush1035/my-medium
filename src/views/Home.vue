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
          </ul>
        </div>
        <router-view></router-view>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a href="" class="tag-pill tag-default">programming</a>
            <a href="" class="tag-pill tag-default">javascript</a>
            <a href="" class="tag-pill tag-default">emberjs</a>
            <a href="" class="tag-pill tag-default">angularjs</a>
            <a href="" class="tag-pill tag-default">react</a>
            <a href="" class="tag-pill tag-default">mean</a>
            <a href="" class="tag-pill tag-default">node</a>
            <a href="" class="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "home",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

