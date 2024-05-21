<template>
  <q-card flat bordered class="accent-border">
    <q-card-section class="column q-gutter-xs items-center">
      <q-avatar
        icon="person"
        color="primary"
        text-color="white"
        size="6em"
        class="q-mb-lg"
      ></q-avatar>
      <span class="text-weight-medium" style="font-size: 1.5em">
        {{ userSnapshot?.name }}
      </span>
      <span> {{ userSnapshot?.email }} </span>
      <template v-if="userSnapshot?.isStudent">
        <span> {{ userSnapshot?.course }} {{ userSnapshot?.section }} </span>
        <span class="text-weight-medium text-grey-7" style="font-size: 1em">
          {{ userSnapshot?.number }}
        </span>
      </template>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { doc } from "firebase/firestore";
import { computed } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";

const user = useCurrentUser();
const firestore = useFirestore();
const userRef = computed(() =>
  user.value?.uid ? doc(firestore, "users", user.value.uid) : null
);
const userSnapshot = useDocument(userRef);
</script>
