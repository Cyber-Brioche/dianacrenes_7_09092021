<template>
  <navBar></navBar>
  <div id="profile" class="posting-box">
    <div class="">
      <h2 class="">Informations de profil</h2>
      <profileInfos></profileInfos>
      <br />
      <div class="">
        <router-link to="/gifs">Retour aux publications</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import profileInfos from "../components/profileInfos.ce.vue";
import navBar from "../components/NavBar.ce.vue";

export default {
  name: "profile",

  components: {
    profileInfos,
    navBar,
  },

  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
};
</script>

<style></style>
