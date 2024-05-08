<template>
  <q-btn
    label="Add Student"
    unelevated
    color="primary"
    icon="add"
    @click="() => (showForm = true)"
  >
  </q-btn>

  <q-dialog v-model="showForm">
    <q-card style="min-width: 600px" class="">
      <q-card-actions align="right">
        <q-btn icon="close" flat @click="closeForm"></q-btn>
      </q-card-actions>
      <q-card-section>
        <q-scroll-area style="height: 75vh">
          <StudentForm @complete="closeForm" class="q-pr-md"></StudentForm>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import StudentForm from "components/StudentForm.vue";

import { ref } from "vue";

const showForm = ref(false);

function closeForm() {
  showForm.value = false;
}
</script>
