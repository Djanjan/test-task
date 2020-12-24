<template>
  <div class="v-card elevation-2">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VCard',
});
</script>

<style scoped>
.v-card {
  border-radius: 4px 4px 4px 4px;
  border: 0px solid #000000;
  background-color: var(--color-contrast-lower);
}
</style>
