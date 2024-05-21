<template>
  <q-card bordered flat>
    <q-card-section class="column q-gutter-md">
      <div class="text-h6 text-center text-weight-medium">Your Departments</div>
      <div class="row q-gutter-sm">
        <span class="text-weight-medium">Last Updated:</span>
        <span>{{ lastUpdate }}</span>
      </div>
      <q-list>
        <template
          v-for="(data, department) in userDoc?.records"
          :key="department"
        >
          <q-expansion-item
            group="departments"
            :icon="statusIcons[data.status]"
            :label="department"
            :header-class="`text-${statusColor[data.status]}`"
          >
            <q-card>
              <q-card-section>
                <p>{{ data.message }}</p>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator></q-separator>
        </template>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { doc } from "firebase/firestore";
import { DateTime } from "luxon";
import { computed } from "vue";
import { useCurrentUser, useDocument, useFirestore } from "vuefire";

const statusIcons = ["", "check", "close", "question_mark"];
const statusColor = ["black", "positive", "negative", "warning"];

const firestore = useFirestore();
const user = useCurrentUser();

const userRef = computed(() => doc(firestore, "users", user.value.uid));
const userDoc = useDocument(userRef);

const lastUpdate = computed(() =>
  DateTime.fromSeconds(userDoc.value?.lastUpdated ?? 0).toFormat(
    DateTime.DATETIME_MED
  )
);
</script>
