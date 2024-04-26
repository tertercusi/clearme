<template>
  <q-page class="column q-pa-md q-gutter-md">
    <student-card></student-card>
    <departments-card></departments-card>
  </q-page>
</template>

<script setup>
import StudentCard from "components/StudentCard.vue";
import DepartmentsCard from "components/DepartmentsCard.vue";

defineOptions({
  name: "IndexPage",
});
</script>
