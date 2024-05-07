<template>
  <q-form class="column q-gutter-md">
    <q-input v-model="code" label="Name" outlined></q-input>
    <q-input v-model="course" label="Course" outlined></q-input>
    <q-separator></q-separator>
    <q-toolbar>
      <q-toolbar-title> Departments </q-toolbar-title>
      <q-space></q-space>
      <q-btn
        color="primary"
        icon="add"
        label="Add Department"
        flat
        @click="addDepartment"
      ></q-btn>
    </q-toolbar>
    <template v-if="departments.length">
      <q-input
        v-for="(department, index) in departments"
        v-model="departments[index]"
        :key="index"
        :label="`Department ${index + 1}`"
        outlined
      >
        <template #after>
          <q-btn
            flat
            icon="remove"
            color="negative"
            @click="() => removeDepartment(index)"
          ></q-btn>
        </template>
      </q-input>
    </template>
    <span v-else class="text-center text-grey-4">No departments.</span>
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

import { useFirestore } from "vuefire";
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

const code = ref("");
const course = ref("");
const departments = ref([]);

function addDepartment() {
  departments.value.push("");
}

function removeDepartment(index) {
  departments.value.splice(index, 1);
}

const firestore = useFirestore();
const sectionsCollection = collection(firestore, "sections");
const editDocRef = computed(() =>
  props.edit ? doc(sectionsCollection, props.edit) : null
);

watchEffect(async () => {
  if (editDocRef.value) {
    const editDoc = await getDoc(editDocRef.value);
    code.value = editDoc.get("section");
    course.value = editDoc.get("course");
    departments.value = editDoc.get("departments");
  }
});

function save() {
  const newData = {
    section: code.value,
    course: course.value,
    departments: departments.value,
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
</script>
