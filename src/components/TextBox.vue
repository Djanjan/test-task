<template>
  <div class="md-imput">
    <input type="text" v-model="input" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { selectInput } from "../composables/SelectInput";

export default defineComponent({
  name: "TextBox",
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    return {
      input: selectInput(props, emit, "modelValue")
    };
  }
});
</script>

<style scoped>
.md-imput {
}
</style>
