<template>
  <q-btn
    label="Add Section"
    unelevated
    color="primary"
    icon="add"
    @click="() => (showForm = true)"
  >
  </q-btn>

  <q-dialog v-model="showForm">
    <q-card style="min-width: 600px" class="">
      <q-card-actions align="right">
        <q-btn icon="close" flat @click="() => (showForm = false)"></q-btn>
      </q-card-actions>
      <q-card-section>
        <section-form class="q-pr-md"></section-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import SectionForm from "components/SectionForm.vue";

import { ref } from "vue";

const showForm = ref(false);
</script>
