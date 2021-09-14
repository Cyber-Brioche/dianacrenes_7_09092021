<template>
  <div class="posting-box" v-for="gif in gifs.slice().reverse()" :key="gif.id">
    <div>
      <div class="name-separation">
        <div
          v-for="user in users.filter((user) => {
            return user.id == gif.userId;
          })"
        >
          publié par
          <span class="username">{{ user.firstName }} {{ user.lastName }}</span>
        </div>
        <span v-if="userId == gif.userId">
          <button
            class="gif-supp"
            v-bind="gif"
            @click.prevent="deleteGif(gif.id)"
          >
            Supprimer le gif
          </button>
        </span>
      </div>
      <img class="gifbox" :src="gif.imageUrl" alt="gif" />
      <div class="statut-text">{{ gif.statusText }}</div>
    </div>
    <postComment v-bind="gif"></postComment>
    <div v-if="comments">
      <div
        v-for="comment in comments.filter((comment) => {
          return comment.gifId == gif.id;
        })"
        :key="comment.id"
        class="box-comment"
      >
        <p class="">
          "{{ comment.content }}"
          <span
            v-for="user in users.filter((user) => {
              return user.id == comment.userId;
            })"
          >
            par
            <strong>{{ user.firstName }} {{ user.lastName }}</strong>
          </span>
        </p>
        <span v-if="userId == comment.userId">
          <button class="submit" @click.prevent="deleteComment(comment.id)">
            Effacer le commentaire
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import postComment from "../components/postComment.ce.vue";

export default {
  name: "gif",

  components: {
    postComment,
  },

  created() {
    axios
      .get("http://localhost:3001/api/gifs", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.gifs = res.data.gifs;
      })
      .catch((err) => {
        console.log(err + "Utilisateur inconnu ou Posts indisponibles");
      });

    axios
      .get("http://localhost:3001/api/comments", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.comments = res.data;
      })
      .catch((err) => {
        console.log(err + "Utilisateur inconnu ou commentaires indisponibles");
      });
    axios
      .get("http://localhost:3001/api/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.users = res.data.users;
      })
      .catch((err) => {
        console.log(err + "Utilisateur inconnu ou profils indisponibles");
      });
  },

  data() {
    return {
      gifs: [],
      gif: {},
      comments: [],
      comment: {},
      content: {},
      userId: localStorage.getItem("userId"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    deleteGif(id) {
      axios
        .delete(`http://localhost:3001/api/gifs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },

    deleteComment(id) {
      axios
        .delete(`http://localhost:3001/api/comments/${id}`, {
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
