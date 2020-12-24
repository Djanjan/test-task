<template>
  <div class="container">
    <genetic-variants></genetic-variants>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import GeneticVariants from './views/GeneticVariants.vue';

export default defineComponent({
  name: 'app',
  components: {
    'genetic-variants': GeneticVariants,
  },
});
</script>
