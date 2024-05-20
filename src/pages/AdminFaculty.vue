<template>
  <q-page padding class="column q-gutter-md">
    <q-card class="col-auto" bordered flat>
      <q-card-actions>
        <q-toolbar>
          <AddFacultyButton></AddFacultyButton>
        </q-toolbar>
      </q-card-actions>
    </q-card>

    <splitter-card class="col">
      <template #left>
        <q-virtual-scroll
          style="height: 75vh"
          separator
          v-slot="{ item, index }"
          :items="snapshot"
          class="q-pa-md"
        >
          <q-item
            :key="index"
            clickable
            v-ripple
            :active="currentEdit == item.id"
            @click="() => setEditView(item.id)"
          >
            <q-item-section>
              <q-item-label> {{ item.name }} ({{ item.number }}) </q-item-label>
            </q-item-section>
          </q-item>
        </q-virtual-scroll>
      </template>
      <template #right>
        <q-scroll-area class="q-pa-md" style="height: 75vh">
          <FacultyForm
            v-if="currentEdit"
            :edit="currentEdit"
            class="q-pr-md"
            @delete="() => setEditView(null)"
          >
          </FacultyForm>
          <div v-else class="text-center text-grey-6">No section selected.</div>
        </q-scroll-area>
      </template>
    </splitter-card>
  </q-page>
</template>

<script setup>
import AddFacultyButton from "src/components/AddFacultyButton.vue";
import SplitterCard from "src/components/SplitterCard.vue";
import FacultyForm from "components/FacultyForm.vue";

import { useCollection, useFirestore } from "vuefire";
import { collection, query, where } from "firebase/firestore";
import { ref } from "vue";

const firestore = useFirestore();
const facultiesCollection = collection(firestore, "users");
const snapshot = useCollection(
  query(facultiesCollection, where("isStudent", "==", false))
);

const currentEdit = ref(null);
function setEditView(id) {
  currentEdit.value = id;
}
</script>
