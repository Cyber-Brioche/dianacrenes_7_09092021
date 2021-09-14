<template>
  <div v-bind="$attrs">
    <div class="comments">Commenter ce gif</div>
    <form>
      <div class="box-comment">
        <label for="content">Commentaire :</label>
        <textarea
          v-bind="$attrs"
          name="content"
          ref="content"
          placeholder="Ecrire ici!"
        ></textarea>
        <button
          v-bind="$attrs"
          type="submit"
          class="submit"
          @click="postComment($attrs)"
          ref="comment"
        >
          Publier
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "postComment",

  data() {
    return {
      gif: {},
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      gifId: "",
      content: "",
    };
  },

  methods: {
    postComment($attrs) {
      axios
        .post("http://localhost:3001/api/comments", {
          gifId: this.$refs.comment.id,
          userId: localStorage.getItem("userId"),
          content: this.$refs.content.value,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },
  },
};
</script>
<style></style>
