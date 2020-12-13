<template>
  <div class="container">
    <div class="tabs mb-2">
      <div class="tabs-group">
        <div class="tab active" role="tab">
          <span>Генетические варианты</span>
        </div>
        <div class="tab" role="tab">
          <span>Другие варианты</span>
        </div>
      </div>
    </div>
    <genetic-variants-data-table></genetic-variants-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GeneticVariantsDataTable from "../components/GeneticVariantsDataTable.vue";

export default defineComponent({
  name: "GeneticVariants",
  components: {
    "genetic-variants-data-table": GeneticVariantsDataTable
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
}

.tabs-group {
  display: flex;
  flex: 1 0 auto;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
}

.tab {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 0 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.0892857143em;
  line-height: normal;
  min-width: 6.4em;
  min-height: 2.6em;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: none;
}

.tab.active {
  color: var(--color-secondary);
  caret-color: var(--color-secondary);
  border-bottom: 5px solid var(--color-secondary);
}
</style>
