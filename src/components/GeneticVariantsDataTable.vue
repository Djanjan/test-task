<template>
  <div>
    <app-filter class="mt-1" :filterCriteria="getHeadersValue"></app-filter>

    <data-table
      class="mt-1"
      :headers="headers"
      :items="getFilteredItems"
    ></data-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import DataTable from "./DataTable.vue";
import Filter from "./GeneticVariantsFilters.vue";

import { useFetchData } from "../composables/GeneticVariantsFetchData";
import { useGeneticVariantsStore } from "../composables/GeneticVariantsStore";

export default defineComponent({
  name: "GeneticVariantsList",
  components: {
    "data-table": DataTable,
    "app-filter": Filter
  },
  setup() {
    const fetchData = useFetchData();
    const { getFilteredItems } = useGeneticVariantsStore();

    const headers = ref<Array<any>>([
      { name: "Название", isExpansion: false, value: "name" },
      {
        name: "Значение значимости",
        isExpansion: false,
        value: "significance"
      },
      { name: "Генотип", isExpansion: false, value: "genotype" },
      { name: "HGVS номенклатура", isExpansion: false, value: "hgvs" },
      {
        name: "Внешнии источники",
        isExpansion: true,
        value: "externalSourceEntries"
      }
    ]);

    const getHeadersValue = computed(() => {
      let headersValue = [];
      for (const item of headers.value) {
        if (!item["isExpansion"]) headersValue.push(item["value"]);
      }
      return headersValue;
    });

    onMounted(fetchData.getGenomVariants);

    return {
      getFilteredItems,
      headers,
      getHeadersValue
    };
  }
});
</script>

<style scoped>
.data-table {
}
</style>
