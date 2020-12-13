<template>
  <div class="container">
    <div class="ml-1">
      <span>Фильтрация:</span>
      <text-box v-model="inputText"></text-box>
    </div>
    <div class="ml-2">
      <span>Критерии:</span>
      <combo-box v-model="selectFilter" :items="filterCriteria"></combo-box>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
  toRefs,
  watch,
} from "vue";

import ComboBox from "./ComboBox.vue";
import TextBox from "./TextBox.vue";

import {
  useGeneticVariantsStore,
  GeneticVariant,
} from "../composables/GeneticVariantsStore";

export default defineComponent({
  name: "Filter",
  components: {
    "combo-box": ComboBox,
    "text-box": TextBox,
  },
  props: {
    filterCriteria: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { filterCriteria } = toRefs(props);
    const { getFilteredItems, filter } = useGeneticVariantsStore();
    const inputText = ref("");
    const selectFilter = ref(<string>filterCriteria.value[0]);

    watch(selectFilter, () => (inputText.value = ""));
    watch(inputText, () => {
      filter(selectFilter.value, inputText.value);
    });

    return {
      inputText,
      filterCriteria,
      selectFilter,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}

.container > div > span {
  font-size: 0.875rem;
  height: 48px;
  text-align: center;
}
</style>
