<template>
  <div v-bind="$attrs">
    <p>
      <strong>Prénom:</strong>
      {{ $attrs.firstName }}
    </p>
    <p>
      <strong>Nom:</strong>
      {{ $attrs.lastName }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ $attrs.email }}
    </p>
    <p v-if="$attrs.isAdmin === true"><strong>Rôle:</strong> Admin</p>
    <p v-else><strong>Rôle:</strong> Utilisateur</p>
    <div>
      <img :src="$attrs.avatarUrl" alt="avatar" />
    </div>
    <button
      class="submit"
      v-if="$attrs.isAdmin !== true"
      @click.prevent="setUserAdmin($attrs.id)"
    >
      Promouvoir admin
    </button>
  </div>
  <div>
    <form
      id="form"
      enctype="multipart/form-data"
      @submit.prevent="adminModifyAvatar($attrs.id)"
    >
      <div>
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
          @click.prevent="adminModifyAvatar($attrs.id)"
        >
          Modifier
        </button>
      </div>
    </form>
    <span>
      <button
        class="submit"
        v-bind="user"
        @click.prevent="adminDeleteUser($attrs.id)"
      >
        Supprimer ce compte
      </button>
    </span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "user",

  data() {
    return {
      users: [],
      user: {
        isAdmin: localStorage.getItem("isAdmin"),
      },
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    adminDeleteUser(id) {
      axios
        .delete(`http://localhost:3001/api/users/admin/del/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },

    handleFileUpload() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },

    adminModifyAvatar(id) {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);

      axios
        .put(`http://localhost:3001/api/users/admin/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },

    setUserAdmin(id) {
      axios
        .put(`http://localhost:3001/api/users/new/admin/${id}`, {
          userId: localStorage.getItem("userId"),
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
