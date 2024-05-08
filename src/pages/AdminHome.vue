<template>
  <q-page padding class="column q-gutter-md">
    <q-card class="col-auto" bordered flat>
      <q-card-actions>
        <q-toolbar>
          <add-student-button></add-student-button>
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
              <q-item-label>
                {{ item.section }} - {{ item.course }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-virtual-scroll>
      </template>
      <template #right>
        <q-scroll-area class="q-pa-md" style="height: 75vh">
          <student-form
            v-if="currentEdit"
            :edit="currentEdit"
            class="q-pr-md"
            @delete="() => setEditView(null)"
          >
          </student-form>
          <div v-else class="text-center text-grey-6">No section selected.</div>
        </q-scroll-area>
      </template>
    </splitter-card>
  </q-page>
</template>

<script setup>
import AddStudentButton from "src/components/AddStudentButton.vue";
import SplitterCard from "src/components/SplitterCard.vue";
import StudentForm from "components/StudentForm.vue";

import { useCollection, useFirestore } from "vuefire";
import { collection } from "firebase/firestore";
import { ref } from "vue";

const firestore = useFirestore();
const sectionsCollection = collection(firestore, "sections");
const snapshot = useCollection(sectionsCollection);

const currentEdit = ref(null);
function setEditView(id) {
  currentEdit.value = id;
}
</script>
