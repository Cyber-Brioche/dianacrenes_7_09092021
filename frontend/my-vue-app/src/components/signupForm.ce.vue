<template>
  <div>
    <form id="form" @submit.prevent="signup()" method="post">
      <div class="statut">
        <label for="firstName">Prénom :</label>
        <input type="firstName" name="firstName" id="firstName" />
      </div>
      <div class="statut">
        <label for="lastName">Nom :</label>
        <input type="lastName" name="lastName" id="lastName" />
      </div>
      <div class="statut">
        <label for="email">Adresse mail (pro):</label>
        <input type="email" name="email" id="email" />
      </div>
      <div class="statut">
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" id="password" />
      </div>
      <button class="submit" type="submit" @click.prevent="signup">
        Enregistrer les informations
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      this.errorAlert = false;

      axios
        .post("http://localhost:3001/api/users/signup", {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        })
        .then(() => {
          this.$router.push("/registered");
        })
        .catch(() => {
          this.errorAlert = true;
        });
    },
  },
};
</script>
<style></style>
