<template>
  <q-card flat bordered>
    <q-card-section class="row q-gutter-md items-center">
      <q-avatar icon="person" color="primary" text-color="white"></q-avatar>

      <div class="column q-gutter-xs">
        <span class="text-weight-medium text-weight">{{ name }}</span>
        <span class="text-grey-7">{{ timestamp }}</span>
      </div>
    </q-card-section>
    <q-card-section>
      <p class="text-body1">{{ message }}</p>
    </q-card-section>
    <q-card-actions>
      <q-btn
        flat
        color="negative"
        label="Delete"
        icon="delete"
        @click="remove"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { deleteDoc, doc } from "firebase/firestore";
import { DateTime } from "luxon";
import { computed } from "vue";
import { useFirestore } from "vuefire";

const props = defineProps(["name", "timestamp", "message", "id"]);
const timestamp = computed(() =>
  DateTime.fromSeconds(props.timestamp).toLocaleString(DateTime.DATETIME_SHORT)
);

const firestore = useFirestore();

function remove() {
  deleteDoc(doc(firestore, "notifications", props.id));
}
</script>
