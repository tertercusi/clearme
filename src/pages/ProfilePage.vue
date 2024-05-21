<template>
  <q-page class="q-pa-md column q-gutter-md">
    <student-card></student-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">Account Settings</div>
      </q-card-section>
      <q-card-section class="column q-gutter-md">
        <q-input
          v-model="password"
          class="col"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #append>
            <q-btn
              flat
              :icon="showPassword ? 'visibility_off' : 'visibility'"
              @click="showPassword = !showPassword"
            ></q-btn>
          </template>
        </q-input>
        <q-btn
          class="col"
          label="Change password"
          color="primary"
          @click="changePassword"
        ></q-btn>
      </q-card-section>
    </q-card>
    <q-btn color="primary" label="Sign Out" @click="logout"></q-btn>
  </q-page>
</template>

<script setup>
import StudentCard from "components/StudentCard.vue";
import { signOut, updatePassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser, useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const router = useRouter();
const user = useCurrentUser();
function logout() {
  signOut(auth);
  router.push("/login");
}

const password = ref("");
const showPassword = ref(false);

async function changePassword() {
  await updatePassword(user.value, password.value);
  alert("Password changed");
}
</script>
