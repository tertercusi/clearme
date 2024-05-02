<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="$q.platform.is.desktop"
      class="bg-primary column q-gutter-md text-white"
    >
      <logo-image class="self-center"></logo-image>
      <div class="text-h5 text-center">CCA Clearance System</div>
      <div class="text-h6 text-center">Admin Hub</div>
      <q-list>
        <q-item
          v-for="tab in tabList"
          :key="tab.label"
          clickable
          :to="tab.to"
          exact
          active-class="bg-secondary"
          class="text-white"
        >
          <q-item-section avatar>
            <q-icon :name="tab.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ tab.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container
      :style="{
        background: `#FFFFFF url(${bgImage}) 70% 50% / cover no-repeat fixed`,
      }"
    >
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import bgImage from "assets/phoenix-background.png";
import LogoImage from "src/components/LogoImage.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const tabList = [
  {
    label: "Students",
    icon: "school",
    to: "/admin",
  },
  {
    label: "Faculties",
    icon: "assignment_ind",
    to: "/admin/faculty",
  },
  {
    label: "Sections",
    icon: "groups",
    to: "/admin/sections",
  },
];
</script>
