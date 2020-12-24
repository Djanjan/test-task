<template>
  <tabs :componentsTabs="items">
    <template v-slot:GeneticVariantsDataTable>
      <genetic-variants></genetic-variants>
    </template>
  </tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import GeneticVariants from '@/views/GeneticVariants.vue';
import Tabs from '@/components/Tabs.vue';
import { ComponentTab } from '@/type/index';

export default defineComponent({
  name: 'app',
  components: {
    'genetic-variants': GeneticVariants,
    tabs: Tabs,
  },
  setup() {
    const items = ref<Array<ComponentTab>>([
      { title: 'Генетическая значимость', component: 'GeneticVariantsDataTable' },
    ]);

    return {
      items,
    };
  },
});
</script>

<style scoped>
.main__wrap {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
}
</style>
