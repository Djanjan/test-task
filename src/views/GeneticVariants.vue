<template>
  <div class="container">
    <tabs :componentsTabs="items">
      <template v-slot:GeneticVariantsDataTable>
        <genetic-variants-data-table></genetic-variants-data-table>
      </template>
    </tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import GeneticVariantsDataTable from '@/components/GeneticVariantsDataTable.vue';
import Tabs from '@/components/Tabs.vue';

import { useFetchData } from '@/composables/GeneticVariantsFetchData';

import { ComponentTab } from '@/type/index';

export default defineComponent({
  name: 'GeneticVariants',
  components: {
    'genetic-variants-data-table': GeneticVariantsDataTable,
    tabs: Tabs,
  },
  setup() {
    const items = ref<Array<ComponentTab>>([
      { title: 'Генетическая значимость', component: 'GeneticVariantsDataTable' },
    ]);

    const fetchData = useFetchData();

    onMounted(() => {
      fetchData.getGenomVariants();
    });

    return {
      items,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
}
</style>
