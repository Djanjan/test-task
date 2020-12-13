<template>
  <div class="data-content">
    <table>
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "DataTableContent"
});
</script>
