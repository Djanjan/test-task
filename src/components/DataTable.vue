<template>
  <div class="data-table">
    <data-table-content>
      <template v-slot:headers>
        <tr>
          <th
            role="columnheader"
            scope="col"
            v-for="(item, index) in headers"
            :key="index"
            :aria-label="item.name"
          >
            <span>{{ item.name }}</span>
          </th>
        </tr>
      </template>
      <template v-slot:default>
        <tr class v-for="(item, index) in items" :key="index">
          <td v-for="(prop, index) in headers" :key="index">
            <template v-if="prop.isExpansion">
              <details>
                <summary>
                  <ul>
                    <li class="titleName">
                      Просмотреть внешнии источники
                    </li>
                  </ul>
                </summary>
                <div class="content">
                  <data-table-content style="border: 1px solid black;">
                    <template v-slot:headers>
                      <tr>
                        <th
                          role="columnheader"
                          scope="col"
                          v-for="(itemHead, index) in getObjectKeys(
                            item[prop.value][0]
                          )"
                          :key="index"
                          :aria-label="itemHead"
                        >
                          <span>{{ itemHead }}</span>
                        </th>
                      </tr>
                    </template>
                    <template v-slot:default>
                      <tr
                        v-for="(expItem, index) in item[prop.value]"
                        :key="index"
                      >
                        <td
                          v-for="(expItemProp, index) in expItem"
                          :key="index"
                        >
                          {{ expItemProp }}
                        </td>
                      </tr>
                    </template>
                  </data-table-content>
                </div>
              </details>
            </template>

            <template v-else>{{ item[prop.value] }}</template>
          </td>
        </tr>
      </template>
    </data-table-content>
    <data-table-footer :maxPage="items.length"></data-table-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DataTableFooter from "./DataTableFooter.vue";
import DataTableContent from "./DataTableContent.vue";

export default defineComponent({
  name: "DataTableContent",
  components: {
    "data-table-footer": DataTableFooter,
    "data-table-content": DataTableContent
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      default: []
    },
    isExpansionPanel: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    function getObjectKeys(value: Object) {
      if (value === null || value === undefined) return;
      return Object.keys(value);
    }

    return {
      getObjectKeys
    };
  }
});
</script>

<style scoped>
.data-table {
  padding: 1.5rem 2rem;
}

details {
  background: #fff;
  font-size: 16px;
  display: flex;
}

details div.content {
  padding: 0px 24px 24px 24px;
}

details[open] summary:after {
  color: #9e9e9e;
  content: "expand_less";
  font-family: "Material Icons";
}
details[open] {
  margin-top: 16px;
  margin-bottom: 16px;
  border: none;
  border-radius: 2px;
}
details[open]:first-child {
  margin-top: 0;
  margin-bottom: 16px;
  border: none;
}
details[open]:last-child {
  margin-top: 16px;
  margin-bottom: 0px;
  border: none;
}

summary {
  outline: none;
  cursor: pointer;
  padding: 16px 24px;
  color: #212121;
  position: relative;
  font-size: 15px;
}
summary:hover {
  background: #eeeeee;
}

details[open] summary:hover {
  background: none;
}
summary ul {
  padding-left: 0;
  list-style: none;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
summary ul li {
  flex: 1 100%;
  flex-flow: row wrap;
}
summary ul li span {
  display: block;
  font-size: 12px;
  margin-top: 6px;
  opacity: 0.75;
}
summary::-webkit-details-marker {
  display: none;
}
summary::after {
  content: "expand_more";
  font-family: "Material Icons";
  color: #9e9e9e;
  font-size: 1.5em;
  padding: 0;
  text-align: center;
  margin-top: 0;
  position: absolute;
  top: calc(50% - 12px);
  bottom: 0;
  right: 0;
  width: 6%;
}
</style>
