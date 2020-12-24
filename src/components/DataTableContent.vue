<template>
  <div class="data-content">
    <table :class="fixed ? 'fixed' : ''">
      <thead>
        <slot name="headers"></slot>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DataTableContent',
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
table.fixed {
  table-layout: fixed;
}
table.fixed td {
  overflow: hidden;
}
</style>
