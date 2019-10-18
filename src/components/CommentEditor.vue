<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit(slug, comment)">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="comment"
          placeholder="Write a comment..."
          rows="3"
        >
        </textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" >Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import { COMMENT_CREATE } from "../store/actionType.js";

export default {
  name: "CommentEditor",
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null,
    };
  },
  methods: {
    onSubmit(slug, comment) {
      if(this.comment == '' ||this.comment == null){
         this.$toasted.show('Comment cannot be empty');
      }
      else{
        this.$store
        .dispatch(COMMENT_CREATE, { slug, comment })
        .then(() => {
          this.comment = null;
        })
        .catch(({ response }) => {
         console.log(response.data.errors)
        });
      }
      
    }
  }
};
</script>
