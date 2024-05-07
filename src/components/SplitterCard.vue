<template>
  <q-card class="col" bordered flat>
    <q-card-section class="column full-height">
      <q-splitter
        v-model="splitterModel"
        class="full-height"
        :limits="[30, 50]"
      >
        <template #before>
          <slot name="left"></slot>
        </template>
        <template #after>
          <slot name="right"></slot>
        </template>
      </q-splitter>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const splitterModel = ref(30);
</script>
