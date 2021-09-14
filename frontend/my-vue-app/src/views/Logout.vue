<template>
  <div class="posting-box">
    <div>
      <h2>Déconnecté(e)</h2>
      <p>Vous allez être redirigé(e) vers la page d'accueil dans 5 secondes.</p>
    </div>
  </div>
</template>

<script>
localStorage.clear();

export default {
  created() {
    setTimeout(() => this.$router.push({ path: "/" }), 5000);
  },
};
</script>

<style></style>
