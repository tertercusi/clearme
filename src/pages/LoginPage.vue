<template>
  <q-page class="q-pa-md column q-gutter-md">
    <q-card flat>
      <q-card-section class="row justify-center">
        <logo-image></logo-image>
      </q-card-section>
      <q-card-section class="column q-gutter-md">
        <span class="text-h4 text-center">Login</span>

        <q-input label="Email" v-model="email"></q-input>
        <q-input v-model="password" label="Password" type="password"></q-input>
        <q-btn color="primary" label="Sign In" @click="login"></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import LogoImage from "components/LogoImage.vue";
import { ref } from "vue";
import { useFirebaseAuth, useFirestore } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";

const auth = useFirebaseAuth();
const db = useFirestore();
const router = useRouter();

const email = ref("");
const password = ref("");

async function login() {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const userDoc = await getDoc(doc(db, "users", user.user.uid));
    const isStudent = userDoc.get("isStudent");

    if (isStudent) {
      router.push("/");
    } else {
      router.push("/admin");
    }
  } catch (e) {
    alert(e.message);
  }
}
</script>
