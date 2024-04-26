<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer>
      <q-tabs active-bg-color="secondary" no-caps>
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

    <q-page-container
      :style="{
        background: `#FFFFFF url(${bgImage}) 70% 50% / cover no-repeat fixed`,
      }"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import bgImage from "assets/phoenix-background.png";

const tabList = [
  {
    label: "Home",
    icon: "home",
    to: "/",
  },
  {
    label: "Notifications",
    icon: "notifications",
    to: "/notifications",
  },
  {
    label: "Profile",
    icon: "person",
    to: "/profile",
  },
];
</script>
