import { computed, ref, watch } from 'vue';

import { GeneticVariant } from '@/type/index';

type State = {
  variants: Array<GeneticVariant>;
  variantsFiltered: Array<GeneticVariant>;
};

const stateRef = ref<State>({
  variants: [],
  variantsFiltered: [],
});

const state = stateRef.value;

function combinesArray(variants: Array<GeneticVariant>) {
  state.variants = state.variants.concat(variants);
}

function push(variant: GeneticVariant) {
  const obj: GeneticVariant = { id: '' };

  for (const key in variant) {
    if (key) {
      obj[key] = variant[key];
    }
  }

  state.variants.push(obj);
}

function edit(variant: GeneticVariant) {
  const index = state.variants.findIndex((item: { id: string }) => item.id === variant.id);
  state.variants[index] = variant;
}

function remove(id: string) {
  state.variants = state.variants.filter((item: { id: string }) => item.id !== id);
}

watch(state.variants, () => {
  state.variantsFiltered = [...state.variants];
});

function filter(value: string) {
  state.variantsFiltered = state.variants.filter((item) => {
    if (item.genotype?.includes(value)) return true;
    if (JSON.stringify(item.hgvs).includes(value)) return true;
    for (const key in item) {
      if (key !== 'id') {
        const element = item[key];

        if (element.type !== undefined) {
          if ((element.text as string).includes(value)) return true;
          return false;
        }

        if ((element as string).includes(value)) return true;
      }
    }
    return false;
  });
}

export function useGeneticVariantsStore() {
  return {
    combinesArray,
    push,
    edit,
    remove,
    filter,
    getFilteredItems: computed(() => stateRef.value.variantsFiltered),
    state: computed(() => state),
    variants: computed(() => state.variants),
    variantsFiltered: computed({
      get: () => state.variantsFiltered,
      set: (value) => (state.variantsFiltered = value),
    }),
  };
}
