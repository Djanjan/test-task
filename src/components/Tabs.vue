<template>
  <div class="tabs">
    <div class="tabs__group" role="tablist">
      <div
        v-for="tab in tabs"
        :key="tab"
        role="tab"
        :aria-selected="currentTab === tab"
        :class="['tab ', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        <span>{{ tab.title }}</span>
      </div>
    </div>
    <div class="tab__content">
      <template v-for="tab in tabs" :key="tab">
        <slot v-if="currentTab === tab" :name="tab.component"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

import { ComponentTab } from '@/type/index';

export default defineComponent({
  name: 'Tabs',
  components: {},
  props: {
    componentsTabs: {
      type: Object as PropType<Array<ComponentTab>>,
      required: true,
    },
  },
  setup(props) {
    const currentTab = ref<ComponentTab>();
    const tabs = ref(props.componentsTabs);

    const currentTabComponent = computed(() => {
      return currentTab.value?.component;
    });

    onMounted(() => {
      tabs.value = props.componentsTabs;
      currentTab.value = props?.componentsTabs[0];
    });

    return {
      currentTab,
      tabs,
      currentTabComponent,
    };
  },
});
</script>

<style scoped>
.tabs__group {
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
  border-bottom: 5px solid var(--color-secondary);
}
</style>
