<template>
  <div>
    <!--<div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />-->
    <genetic-variants></genetic-variants>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GeneticVariants from "./views/GeneticVariants.vue";

export default defineComponent({
  name: "app",
  components: {
    "genetic-variants": GeneticVariants
  }
});
</script>
