<template>
  <q-form class="column q-gutter-md">
    <q-input
      v-model="number"
      label="ID Number"
      outlined
      :readonly="!!edit"
    ></q-input>
    <q-input v-model="name" label="Name" outlined></q-input>
    <q-input v-model="email" label="Email" outlined></q-input>
    <q-select
      v-if="!edit"
      v-model="section"
      label="Course"
      outlined
      :options="sectionsSnapshot"
      option-label="section"
    ></q-select>
    <q-input
      v-else
      v-model="section"
      label="Section"
      outlined
      readonly
    ></q-input>

    <template v-if="section">
      <q-separator></q-separator>

      <q-toolbar>
        <q-toolbar-title> Departments </q-toolbar-title>
      </q-toolbar>
      <template v-if="!edit">
        <q-card
          v-for="(department, index) of section.departments"
          :key="index"
          flat
          bordered
        >
          <q-card-section class="column q-gutter-md">
            <div class="row items-center">
              <div class="col">{{ department }}</div>
              <q-select
                v-model="records[department].status"
                class="col"
                :options="clearStatusOptions"
                option-label="label"
                option-value="value"
                outlined
                emit-value
                map-options
              ></q-select>
            </div>
            <q-input
              v-model="records[department].message"
              type="textarea"
              filled
              label="Message"
            ></q-input>
          </q-card-section>
        </q-card>
      </template>

      <template v-else>
        <q-card
          v-for="(record, department) in records"
          :key="department"
          flat
          bordered
        >
          <q-card-section class="column q-gutter-md">
            <div class="row items-center">
              <div class="col">{{ department }}</div>
              <q-select
                v-model="records[department].status"
                class="col"
                :options="clearStatusOptions"
                option-label="label"
                option-value="value"
                outlined
                emit-value
                map-options
              ></q-select>
            </div>
            <q-input
              v-model="records[department].message"
              type="textarea"
              filled
              label="Message"
            ></q-input>
          </q-card-section>
        </q-card>
      </template>
    </template>

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

import {
  useCollection,
  useFirebaseAuth,
  useFirestore,
  useCurrentUser,
} from "vuefire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { DateTime } from "luxon";

const props = defineProps(["edit"]);
const emit = defineEmits(["complete", "delete"]);
const auth = useFirebaseAuth();
const user = useCurrentUser();

const name = ref("");
const section = ref("");
const records = ref({});
const email = ref("");
const number = ref("");
const course = ref("");
const userId = ref("");

const firestore = useFirestore();
const studentsCollection = collection(firestore, "users");
const sectionsCollection = collection(firestore, "sections");
const editDocRef = computed(() =>
  props.edit ? doc(studentsCollection, props.edit) : null
);

const sectionsSnapshot = useCollection(sectionsCollection);
watchEffect(async () => {
  if (editDocRef.value) {
    const editDoc = await getDoc(editDocRef.value);
    name.value = editDoc.get("name");
    section.value = editDoc.get("section");
    records.value = editDoc.get("records");
    email.value = editDoc.get("email");
    number.value = editDoc.get("number");
    course.value = editDoc.get("course");
    userId.value = editDoc.get("userId");
  }

  if (section.value && !props.edit) {
    for (const record of section.value.departments) {
      records.value[record] = {};
      records.value[record].status = 0;
      records.value[record].message = "";
    }
  }
});

async function save() {
  const newData = {
    section: props.edit ? section.value : section.value.section,
    course: props.edit ? course.value : section.value.course,
    email: email.value,
    number: number.value,
    name: name.value,
    records: records.value,
    isStudent: true,
    dateUpdated: DateTime.now().toSeconds(),
  };

  if (!editDocRef.value) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      number.value
    );
    await updateProfile(credential.user, { displayName: name.value });

    newData.userId = credential.user.uid;
    const newDocRef = doc(studentsCollection, credential.user.uid);
    await setDoc(newDocRef, newData);

    await notify(
      credential.user.uid,
      user.value.displayName,
      "Your record has been created."
    );
  } else {
    await updateDoc(editDocRef.value, newData);
    await notify(
      editDocRef.value.id,
      user.value.displayName,
      "Your record has been updated."
    );
  }

  emit("complete");
}

async function notify(id, name, message) {
  await addDoc(collection(firestore, "notifications"), {
    for: id,
    name: name,
    date: DateTime.now().toSeconds(),
    message: message,
  });
}

async function del() {
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
