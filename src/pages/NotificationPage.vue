<template>
  <q-page class="q-pa-md column q-gutter-md">
    <notification-card
      v-for="n of notificationList"
      :key="n.id"
      :id="n.id"
      :name="n.name"
      :message="n.message"
      :timestamp="n.date"
    ></notification-card>
  </q-page>
</template>

<script setup>
import NotificationCard from "components/NotificationCard.vue";
import { collection, query, where } from "firebase/firestore";
import { computed } from "vue";
import { useCollection, useCurrentUser, useFirestore } from "vuefire";

const firestore = useFirestore();
const currentUser = useCurrentUser();

const notificationQuery = computed(() =>
  query(
    collection(firestore, "notifications"),
    where("for", "==", currentUser.value.uid)
  )
);

const notificationList = useCollection(notificationQuery);
</script>
