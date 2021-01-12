<template>
  <v-card class="pt-1 mt-1">
    <app-filter class="mt-1 ml-2"></app-filter>

    <template v-if="variantsFiltered.length !== 0">
      <data-table :headers="headers" :items="variantsFiltered" :isFixed="true">
        <template v-slot:genotype="{ item }">
          <v-chips :outline="true" style="width: 60px">{{ item.genotype }}</v-chips>
        </template>

        <template v-slot:significance="{ item }">
          <v-chips :color="item['significance'].color">{{ item['significance'].text }}</v-chips>
        </template>

        <template v-slot:hgvs="{ item }">
          <v-chips :outline="true" style="width: 120px">{{ item.hgvs.g }}</v-chips>
          <v-chips :outline="true" style="width: 120px">{{ item.hgvs.c }}</v-chips>
          <v-chips :outline="true" style="width: 120px">{{ item.hgvs.p }}</v-chips>
        </template>

        <template v-slot:externalSourceEntries="{ item }">
          <div class="contaiter_v-chips">
            <v-chips
              v-for="(expItem, index) in item['externalSourceEntries']"
              :key="index"
              :outline="true"
              :color="expItem['significance'].color"
            >
              <a class="mr-1 ml-1" :href="expItem['link']">{{ expItem['name'] }}</a
              ><span class="mr-1">{{ expItem['significance'].text }}</span>
            </v-chips>
          </div>
        </template>
      </data-table>
    </template>
    <template v-else>
      <div class="pa-1 pl-2">Нечего не найдено</div>
    </template>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import VCard from '@/components/VCard.vue';
import VChips from '@/components/VChips.vue';
import { Header } from '@/type/index';
import DataTable from '@/components/DataTable.vue';
import Filter from '@/components/GeneticVariantsFilters.vue';

import { useGeneticVariantsStore } from '@/composables/GeneticVariantsStore';

export default defineComponent({
  name: 'GeneticVariantsDataTable',
  components: {
    'data-table': DataTable,
    'app-filter': Filter,
    'v-card': VCard,
    'v-chips': VChips,
  },
  setup() {
    const { variantsFiltered } = useGeneticVariantsStore();

    const headers = ref<Array<Header>>([
      { name: 'Название', columWidth: '50px', value: 'name' },
      {
        name: 'Значение значимости',
        columWidth: '80px',
        value: 'significance',
      },
      { name: 'Генотип', columWidth: '50px', value: 'genotype' },
      { name: 'HGVS номенклатура', columWidth: '90px', value: 'hgvs' },
      {
        name: 'Внешнии источники',
        columWidth: '320px',
        value: 'externalSourceEntries',
      },
    ]);

    return {
      variantsFiltered,
      headers,
    };
  },
});
</script>

<style scoped>
.contaiter_v-chips {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
}
</style>
