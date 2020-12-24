<template>
  <div class="v-imput">
    <input
      class="v-imput__control"
      id="text-box"
      type="text"
      v-model="input"
      :placeholder="placeholder"
      :aria-label="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { selectInput } from '../composables/SelectInput';

export default defineComponent({
  name: 'TextBox',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    return {
      input: selectInput(props, emit, 'modelValue'),
    };
  },
});
</script>

<style scoped>
.v-imput__control {
  border-style: none;
  border: none;
  border-bottom: 2px solid var(--color-secondary);
}
</style>
