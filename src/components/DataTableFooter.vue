<template>
  <div class="data-footer mt-2">
    <div class="data-footer-pagination mr-1">
      {{ maxPage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DataTableFooter",
  props: {
    maxPage: {
      type: Number,
      required: true,
      default: 1
    }
  },
  setup() {}
});
</script>

<style scoped>
.data-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 0.875rem;
}

.data-footer-pagination {
  display: flex;
  align-self: flex-end;
  font-size: 0.875rem;
}
</style>
