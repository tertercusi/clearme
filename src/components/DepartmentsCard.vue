<template>
  <q-card bordered flat>
    <q-card-section class="column q-gutter-md">
      <div class="text-h6 text-center text-weight-medium">Your Departments</div>
      <q-list>
        <template v-for="(d, index) in departments" :key="d.name">
          <q-expansion-item
            group="departments"
            :icon="statusIcons[d.status]"
            :label="d.name"
            :header-class="`text-${statusColor[d.status]}`"
          >
            <q-card>
              <q-card-section>
                <p>{{ d.message }}</p>
                <span>
                  <span class="text-weight-medium">Last Updated:</span>
                  {{ d.updated }}
                </span>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator v-if="index < departments.length - 1"></q-separator>
        </template>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
const statusIcons = ["", "check", "close", "question_mark"];
const statusColor = ["black", "positive", "negative", "warning"];

const departments = [
  {
    name: "Tortured Poets",
    message: "Down Bad",
    status: 1,
    updated: Date.now(),
  },
  {
    name: "Tortured Poets",
    message: "Down Bad",
    status: 1,
    updated: Date.now(),
  },
];
</script>
