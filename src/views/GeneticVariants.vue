<template>
  <genetic-variants-data-table></genetic-variants-data-table>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import GeneticVariantsDataTable from '@/components/GeneticVariantsDataTable.vue';

import { useFetchData } from '@/composables/GeneticVariantsFetchData';

export default defineComponent({
  name: 'GeneticVariants',
  components: {
    'genetic-variants-data-table': GeneticVariantsDataTable,
  },
  setup() {
    const fetchData = useFetchData();

    onMounted(() => {
      fetchData.getGenomVariants();
    });
  },
});
</script>
