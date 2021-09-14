<template>
  <div>
    <form
      id="form"
      class=""
      @submit.prevent="login()"
      method="post"
      novalidate="true"
    >
      <div class="padding-home">
        <label for="email" class="">Adresse mail:</label>
        <input type="email" class="" name="email" id="email" />
      </div>
      <div class="padding-home">
        <label for="password" class="">Mot de passe :</label>
        <input type="password" class="" name="password" id="password" />
      </div>

      <button type="submit" class="submit" @click.prevent="login">
        Se connecter
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.errorAlert = false;

      axios
        .post("http://localhost:3001/api/users/login", {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          this.$router.push("/gifs");
        })
        .catch(() => {
          this.errorAlert = true;
        });
    },
  },
};
</script>
<style></style>
