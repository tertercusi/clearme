<template>
  <q-form class="column q-gutter-md">
    <q-input v-model="number" label="ID Number" outlined></q-input>
    <q-input v-model="name" label="Name" outlined></q-input>
    <q-input v-model="email" label="Email" outlined></q-input>
    <q-select
      v-model="section"
      label="Course"
      outlined
      :options="sectionsSnapshot"
      option-label="section"
    ></q-select>

    <template v-if="section">
      <q-separator></q-separator>

      <q-toolbar>
        <q-toolbar-title> Departments </q-toolbar-title>
      </q-toolbar>
      <template v-for="(department, index) of section.departments" :key="index">
        <q-card flat bordered>
          <q-card-section class="column q-gutter-md">
            <div class="row items-center">
              <div class="col">{{ department }}</div>
              <q-select
                class="col"
                :options="clearStatusOptions"
                option-label="label"
                option-value="value"
                outlined
              ></q-select>
            </div>
            <q-input type="textarea" filled label="Message"></q-input>
          </q-card-section>
        </q-card>
      </template>
    </template>

    <q-separator></q-separator>
    <div class="row" inset>
      <q-btn
        flat
        label="Save"
        color="primary"
        class="col"
        @click="save"
      ></q-btn>
      <q-btn
        v-if="edit"
        flat
        label="Delete"
        color="negative"
        class="col"
        @click="del"
      ></q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

import { useCollection, useFirestore } from "vuefire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const props = defineProps(["edit"]);
const emit = defineEmits(["complete", "delete"]);

const name = ref("");
const section = ref("");
const records = ref([]);
const email = ref("");
const number = ref("");

const firestore = useFirestore();
const studentsCollection = collection(firestore, "students");
const sectionsCollection = collection(firestore, "sections");
const editDocRef = computed(() =>
  props.edit ? doc(studentsCollection, props.edit) : null
);

const sectionsSnapshot = useCollection(sectionsCollection);

watchEffect(async () => {
  if (editDocRef.value) {
    const editDoc = await getDoc(editDocRef.value);
    name.value = editDoc.get("section");
    section.value = editDoc.get("course");
    records.value = editDoc.get("departments");
  }

  console.log(sectionsSnapshot.value);
});

function save() {
  const newData = {
    section: name.value,
    course: section.value,
    departments: records.value,
  };

  if (editDocRef.value) {
    updateDoc(editDocRef.value, newData);
  } else {
    addDoc(sectionsCollection, newData);
  }

  emit("complete");
}

function del() {
  deleteDoc(editDocRef.value);
  emit("delete");
}

const clearStatusOptions = [
  { label: "None", value: 0 },
  { label: "Passed", value: 1 },
  { label: "Failed", value: 2 },
  { label: "Incomplete", value: 3 },
];
</script>
