<template>
  <navBar></navBar>
  <div class="posting-box">
    <div>
      <h2>Administration</h2>
      <h3>Cliquer sur le bouton pour afficher la section correspondante</h3>
      <div>
        <button
          class="submit admin-margin"
          @click="profileIsShow = !profileIsShow"
        >
          Profils
          <i class="fas fa-users"></i>
        </button>
        <div v-if="profileIsShow">
          <div
            class="box-comment"
            id="allProfiles"
            v-for="user in users"
            :key="user"
            v-bind="user"
          >
            <allProfiles v-bind="user"></allProfiles>
          </div>
        </div>

        <button class="submit admin-margin" @click="gifIsShow = !gifIsShow">
          Gifs
          <i class="fas fa-images"></i>
        </button>
        <div v-if="gifIsShow" id="allgifs">
          <div
            class="box-comment"
            v-for="gif in gifs.slice().reverse()"
            :key="gif.id"
          >
            <figure>
              <figcaption>
                {{ gif.statusText }}
              </figcaption>
              <p
                v-for="user in users.filter((user) => {
                  return user.id == gif.userId;
                })"
              >
                publié par
                <strong>{{ user.firstName }} {{ user.lastName }}</strong>
              </p>
              <img class="gifbox" :src="gif.imageUrl" alt="image" />
            </figure>
            <button
              class="submit"
              v-bind="gif"
              @click.prevent="adminDeleteGif(gif.id)"
            >
              Supprimer le gif
            </button>
            <div v-if="comments">
              <div
                v-for="comment in comments.filter((comment) => {
                  return comment.gifId == gif.id;
                })"
                :key="comment.id"
              >
                <p>
                  {{ comment.content }}
                  <span
                    v-for="user in users.filter((user) => {
                      return user.id == comment.userId;
                    })"
                  >
                    par
                    <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                  </span>
                </p>
                <button
                  class="submit"
                  @click.prevent="adminDeleteComment(comment.id)"
                >
                  Effacer le commentaire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navBar from "../components/NavBar.ce.vue";
import allProfiles from "../components/allProfiles.ce.vue";

export default {
  name: "admin",

  components: {
    navBar,
    allProfiles,
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
      gifIsShow: false,
      commentIsShow: false,
      profileIsShow: false,
      gifs: [],
      gif: {},
      comments: [],
      comment: {},
      content: {},
      users: [],
      user: {},
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    adminDeleteGif(id) {
      axios
        .delete(`http://localhost:3001/api/gifs/admin/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },

    adminDeleteComment(id) {
      axios
        .delete(`http://localhost:3001/api/comments/admin/${id}`, {
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
