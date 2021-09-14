<template>
  <div class="home">
    <div>
      <h2>Connexion</h2>
      <loginForm />
      <br />
      <div class="connexion">
        <router-link to="/signup"
          >Pas encore inscrit ? Cliquez ici pour rejoindre vos collègues
          !</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "../components/loginForm.ce.vue";

export default {
  name: "Home",

  components: {
    loginForm,
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },

  methods: {},
};
</script>

<style></style>
