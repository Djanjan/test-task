<template>
  <div class="md-imput">
    <select v-model="input">
      <option :aria-label="item" v-for="(item, index) in items" :key="index" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { selectInput } from '../composables/SelectInput';

export default defineComponent({
  name: 'ComboBox',
  props: {
    modelValue: [String, Number],
    items: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {
      input: selectInput(props, emit, 'modelValue'),
    };
  },
});
</script>
