<template>
  <div class="box-comment" v-bind="user">
    <p>
      <strong>Prénom:</strong>
      {{ user.firstName }}
    </p>
    <p>
      <strong>Nom:</strong>
      {{ user.lastName }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ user.email }}
    </p>
    <p v-if="user.isAdmin === true"><strong>Rôle:</strong> Admin</p>
    <p v-else><strong>Rôle:</strong> Utilisateur</p>
    <div>
      <img :src="user.avatarUrl" alt="avatar" />
    </div>
  </div>
  <div v-if="userId == user.id">
    <form
      id="form"
      enctype="multipart/form-data"
      @submit.prevent="modifyAvatar()"
    >
      <div class="statut">
        <label for="avatar">Changer d'avatar</label>
        <input
          type="file"
          name="image"
          id="image"
          ref="image"
          v-on:change="handleFileUpload()"
        />
        <button
          type="submit"
          name="submitAvatar"
          id="submitAvatar"
          @click.prevent="modifyAvatar"
        >
          Modifier
        </button>
      </div>
    </form>
    <span>
      <button class="submit" v-bind="user" @click.prevent="deleteUser(user.id)">
        Supprimer votre compte
      </button>
    </span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",

  props: {
    user: {},
  },

  created() {
    axios
      .get(`http://localhost:3001/api/users/${this.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.user = res.data.user;
      });
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      user: {},
      image: "",
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },

    modifyAvatar() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);
      axios
        .put(`http://localhost:3001/api/users/${this.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },

    deleteUser(id) {
      axios
        .delete(`http://localhost:3001/api/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.push("/logout"));
    },
  },
};
</script>

<style></style>
