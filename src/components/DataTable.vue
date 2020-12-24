<template>
  <div class="data-table">
    <data-table-content :fixed="isFixed">
      <template v-slot:headers>
        <tr>
          <th
            role="columnheader"
            scope="col"
            v-for="(item, index) in headers"
            :key="index"
            :aria-label="item.name"
            :style="{ width: item.columWidth }"
          >
            <span>{{ item.name }}</span>
          </th>
        </tr>
      </template>
      <template v-if="items" v-slot:default>
        <tr class v-for="(item, index) in itemsDisplay" :key="index">
          <td role="cell" v-for="(prop, index) in headers" :key="index" :aria-label="prop.value">
            <template v-if="isSlot(prop.value)"><slot :name="prop.value" :item="item"></slot></template>
            <template v-else>{{ item[prop.value] }}</template>
          </td>
        </tr>
      </template>
    </data-table-content>
    <div class="data-footer mt-2">
      <div class="data-footer__select mr-1">
        Отображемые строки:
        <combo-box class="ml-1" v-model="limitPage" :items="getDisplayedData"></combo-box>
      </div>

      <div class="data-footer__pagination mr-2 ml-2">
        {{ `${page}-${getLimitPageFix} of ${maxPage}` }}
      </div>

      <div class="data-footer__navigation">
        <button
          aria-label="first-page"
          class="md-btn-icon md-btn-round"
          style="color: var(--color-secondary)"
          @click="firstPage"
        >
          <i class="material-icons">first_page</i>
        </button>
        <button
          aria-label="previous-page"
          class="md-btn-icon md-btn-round ml-1"
          style="color: var(--color-secondary)"
          @click="previousPage"
        >
          <i class="material-icons">keyboard_arrow_left</i>
        </button>
        <button
          aria-label="next-page"
          class="md-btn-icon md-btn-round ml-1"
          style="color: var(--color-secondary)"
          @click="nextPage"
        >
          <i class="material-icons">keyboard_arrow_right</i>
        </button>
        <button
          aria-label="last-page"
          class="md-btn-icon md-btn-round ml-1"
          style="color: var(--color-secondary)"
          @click="lastPage"
        >
          <i class="material-icons">last_page</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onUpdated, ref } from 'vue';

import DataTableContent from '@/components/DataTableContent.vue';
import ComboBox from '@/components/ComboBox.vue';

import { usePagination } from '@/composables/GeneticVariantsPagination';

export default defineComponent({
  name: 'DataTable',
  components: {
    'data-table-content': DataTableContent,
    'combo-box': ComboBox,
  },
  props: {
    headers: {
      type: Array,
    },
    items: {
      type: Array,
      default: Array.from([]),
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const itemsDisplay = ref<Array<any>>(props.items);

    const pagination = usePagination();

    function init() {
      pagination.maxPage.value = props.items.length;

      itemsDisplay.value = pagination.getDisplayPages(props.items);
    }

    onUpdated(init);

    onBeforeMount(init);

    const getDisplayedData = computed(() => {
      if (pagination.maxPage.value < 5) {
        return ['5'];
      }

      const mass: Array<number> = [];
      let kof = 1;

      for (let i = 0; i < Math.floor(pagination.maxPage.value / 10); i += 1) {
        kof *= 5;
        if (kof >= pagination.maxPage.value) return mass;
        mass.push(kof);
      }

      return mass;
    });

    const getLimitPageFix = computed(() => {
      const page = pagination.page.value;
      const limitPage = pagination.limitPage.value;
      return page + limitPage > pagination.maxPage.value ? pagination.maxPage.value : page + limitPage;
    });

    function getObjectKeys(value: Record<string, never>) {
      if (value === null || value === undefined) return;
      return Object.keys(value);
    }

    function isSlot(name: string) {
      if (slots[name]) return true;
      return false;
    }

    return {
      isSlot,
      getObjectKeys,
      maxPage: pagination.maxPage,
      limitPage: pagination.limitPage,
      page: pagination.page,
      nextPage: () => pagination.nextPage(),
      previousPage: () => pagination.previousPage(),
      firstPage: () => pagination.firstPage(),
      lastPage: () => pagination.lastPage(),
      getDisplayedData,
      getLimitPageFix,
      itemsDisplay,
    };
  },
});
</script>

<style scoped>
.data-table {
  padding: 1.5rem 2rem;
}

.data-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 0.875rem;
}

.data-footer__select {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  flex: 0 0 0;
  justify-content: flex-end;
  white-space: nowrap;
}

.data-footer__pagination {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
</style>
