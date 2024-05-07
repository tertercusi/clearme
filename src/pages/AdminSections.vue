<template>
  <q-page padding class="column q-gutter-md">
    <q-card class="col-auto" bordered flat>
      <q-card-actions>
        <q-toolbar>
          <add-section-button></add-section-button>
        </q-toolbar>
      </q-card-actions>
    </q-card>

    <splitter-card class="col">
      <template #left>
        <q-virtual-scroll
          style="max-height: 100%; box-sizing: border-box"
          separator
          v-slot="{ item, index }"
        >
          <q-item :key="index">
            <q-item-section>
              <q-item-label>{{ item.Name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-virtual-scroll>
      </template>
      <template #right>
        <div class="q-pa-md" style="overflow: auto; max-height: 100%">
          <section-form edit="true"> </section-form>
        </div>
      </template>
    </splitter-card>
  </q-page>
</template>

<script setup>
import AddSectionButton from "src/components/AddSectionButton.vue";
import SplitterCard from "src/components/SplitterCard.vue";
import SectionForm from "components/SectionForm.vue";
</script>
