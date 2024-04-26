<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="tab in tabList"
          :key="tab.label"
          :label="tab.label"
          :icon="tab.icon"
          :to="tab.to"
        >
        </q-route-tab>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
const tabList = [
  {
    label: "Home",
    icon: "home",
    to: "/",
  },
];
</script>
