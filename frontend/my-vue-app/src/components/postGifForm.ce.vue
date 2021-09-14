<template>
  <div class="posting-box">
    <h2 class>Publier un gif</h2>
    <form
      id="form"
      class=""
      @submit.prevent="postGif()"
      enctype="multipart/form-data"
    >
      <div class="statut">
        <label for="statusText" class="">Statut :</label>
        <input
          type="statusText"
          class=""
          id="statusText"
          placeholder="votre message..."
        />
      </div>
      <div class="statut">
        <label for="gif">Gif :</label>
        <input
          type="file"
          class=""
          id="gif"
          name="gif"
          ref="gif"
          v-on:change="handleFileUpload()"
        />
      </div>
      <button type="submit" class="submit" @click.prevent="postGif">
        Publier
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "postGifForm",

  data() {
    return {
      userId: localStorage.getItem("userId"),
      statusText: "",
      imageUrl: "",
      gif: "",
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    handleFileUpload() {
      this.gif = this.$refs.gif.files[0];
      this.imageUrl = URL.createObjectURL(this.gif);
    },

    postGif() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append(
        "statusText",
        document.getElementById("statusText").value
      );
      formData.append("gif", this.gif);

      axios
        .post("http://localhost:3001/api/gifs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },
  },
};
</script>
<style></style>
