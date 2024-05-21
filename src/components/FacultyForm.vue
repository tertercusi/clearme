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

import { useFirebaseApp, useFirebaseAuth, useFirestore } from "vuefire";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const app = useFirebaseApp();
const auth = useFirebaseAuth();

const props = defineProps(["edit"]);
const emit = defineEmits(["complete", "delete"]);

const name = ref("");
const email = ref("");
const number = ref("");

const firestore = useFirestore();
const facultiesCollection = collection(firestore, "users");
const editDocRef = computed(() =>
  props.edit ? doc(facultiesCollection, props.edit) : null
);

watchEffect(async () => {
  if (editDocRef.value) {
    const editDoc = await getDoc(editDocRef.value);
    name.value = editDoc.get("name");
    email.value = editDoc.get("email");
    number.value = editDoc.get("number");
  }
});

async function save() {
  const newData = {
    email: email.value,
    number: number.value,
    name: name.value,
    isStudent: false,
  };

  if (editDocRef.value) {
    updateDoc(editDocRef.value, newData);
  } else {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      number.value
    );
    await updateProfile(credential.user, { displayName: name.value });

    newData.userId = credential.user.uid;
    setDoc(doc(facultiesCollection, credential.user.uid), newData);
  }

  emit("complete");
}

function del() {
  deleteDoc(editDocRef.value);
  emit("delete");
}
</script>
