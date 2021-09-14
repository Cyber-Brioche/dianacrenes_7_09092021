<template>
  <div class="posting-box">
    <div>
      <div>
        <h2>Inscription</h2>
        <signupForm class="box-comment" />
      </div>
      <router-link to="/">Retour</router-link>
    </div>
  </div>
</template>

<script setup>
import signupForm from "../components/signupForm.ce.vue";
</script>
<style></style>
