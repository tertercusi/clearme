<template>
  <q-card flat bordered class="student-card">
    <q-card-section class="column q-gutter-xs items-center">
      <q-avatar
        icon="person"
        color="primary"
        text-color="white"
        size="6em"
        class="q-mb-lg"
      ></q-avatar>
      <span class="text-weight-medium" style="font-size: 1.5em">
        Terence Cusi
      </span>
      <span>BSCS C202</span>
      <span class="text-weight-medium text-grey-7" style="font-size: 1em">
        22-0529
      </span>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.student-card {
  border-bottom: 0.25em solid $primary;
}
</style>
