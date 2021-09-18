<template>
  <div class="posting-box">
    <div>
      <h2>Inscription réussie</h2>
      <p>
        Vous allez être redirigé(e) vers la page d'accueil dans 5 secondes pour
        pouvoir vous connecter.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => this.$router.push({ path: "/" }), 5000);
  },
};
</script>

<style></style>
