<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="$q.platform.is.desktop"
      class="bg-primary column q-gutter-md"
      :breakpoint="0"
    >
      <logo-image class="self-center"></logo-image>
      <div class="text-h5 text-center text-white">CCA Clearance System</div>
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
    <q-footer v-if="!$q.platform.is.desktop">
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
      <router-view class="limit-width q-mx-auto" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import bgImage from "assets/phoenix-background.png";
import LogoImage from "src/components/LogoImage.vue";
import { useQuasar } from "quasar";

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

const $q = useQuasar();
</script>

<style lang="scss">
.limit-width {
  max-width: $breakpoint-xs-max;
}
</style>
