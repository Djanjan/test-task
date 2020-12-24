<template>
  <div class="filter">
    <div class="filter__content">
      <text-box v-model="inputText" :placeholder="'Поиск...'"></text-box>
      <i class="material-icons">search</i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { useGeneticVariantsStore } from '@/composables/GeneticVariantsStore';
import TextBox from '@/components/TextBox.vue';

export default defineComponent({
  name: 'Filter',
  components: {
    'text-box': TextBox,
  },
  setup() {
    const { filter } = useGeneticVariantsStore();
    const inputText = ref('');

    watch(inputText, () => {
      filter(inputText.value);
    });

    return {
      inputText,
    };
  },
});
</script>

<style scoped>
.filter {
  display: flex;
  align-items: center;
}

.filter > div > span {
  font-size: 0.875rem;
  height: 48px;
  text-align: center;
}

.filter__content {
  align-items: center;
  color: inherit;
  display: flex;
  margin-bottom: 8px;
  min-height: inherit;
  position: relative;
  width: 100%;
}
</style>
