<template>
  <div class="nav-bar">
    <div class="">
      <router-link to="/gifs" class="padding-icone">
        Publications
        <i class="fas fa-images"></i>
      </router-link>
      <router-link to="/profile" class="padding-icone">
        Profil
        <i class="fas fa-user"></i>
      </router-link>
      <span v-if="isAdmin === 'true'">
        <router-link to="/admin" class="padding-icone">
          Administration
          <i class="fas fa-cog"></i>
        </router-link>
      </span>
      <router-link to="/logout" class="">
        Déconnexion
        <i class="fas fa-sign-out-alt"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
};
</script>

<style></style>
