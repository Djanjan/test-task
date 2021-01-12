<template>
  <template v-if="error !== null">
    <v-chips outline :color="'red'">Ошибка при получении данных</v-chips>
  </template>
  <Suspense v-else>
    <template #default>
      <genetic-variants-data-table></genetic-variants-data-table>
    </template>
    <template #fallback>
      <v-loader></v-loader>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onErrorCaptured, onMounted, ref } from 'vue';

import VChips from '@/components/VChips.vue';
import VLoader from '@/components/VLoader.vue';

import json from '@/json/variants.json';

import { useFetchData } from '@/composables/GeneticVariantsFetchData';

export default defineComponent({
  name: 'GeneticVariants',
  components: {
    'genetic-variants-data-table': defineAsyncComponent({
      loader: () => import('@/components/GeneticVariantsDataTable.vue'),
    }),
    'v-chips': VChips,
    'v-loader': VLoader,
  },
  setup() {
    const error = ref<any>(null);

    const fetchData = useFetchData(json);

    onMounted(() => {
      fetchData.getGenomVariants().catch((err) => {
        error.value = err;
        console.error(err);
      });
    });

    onErrorCaptured((err) => {
      error.value = err;
      console.error(err);
    });

    return {
      error,
      fetchData,
    };
  },
});
</script>
