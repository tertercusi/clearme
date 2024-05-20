<template>
  <q-page class="q-pa-md column q-gutter-md">
    <q-card flat>
      <q-card-section class="row justify-center">
        <logo-image></logo-image>
      </q-card-section>
      <q-card-section class="column q-gutter-md">
        <span class="text-h4 text-center">Login</span>

        <q-input label="Email"></q-input>
        <q-input label="Password" type="password"></q-input>
        <q-btn color="primary" label="Sign In"></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import LogoImage from "components/LogoImage.vue";
</script>
