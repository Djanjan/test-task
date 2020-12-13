import { computed, ref, watch } from 'vue';

export type HGVS = {
  g: string;
  c: string;
  p: string;
};

export type ExternalSource = {
  [key: string]: any;
  id: string;
  link?: string;
  name?: string;
  significance?: string;
  version?: string;
};

export type GeneticVariant = {
  [key: string]: any;
  id: string;
  name?: string;
  significance?: string;
  genotype?: string;
  hgvs?: HGVS;
  externalSourceEntries?: Array<ExternalSource>;
};

type State = {
  variants: Array<GeneticVariant>;
  variantsFiltered: Array<GeneticVariant>
};

const stateRef = ref<State>({
  variants: [],
  variantsFiltered: []
});

const state = stateRef.value;

function createArray(variants: GeneticVariant) {
  state.variants = state.variants.concat(variants);
}

async function create(variant: GeneticVariant) {
  let obj: GeneticVariant = { id: "0" };

  for (const key in variant) {
    obj[key] = variant[key];
  }

  state.variants.push(obj);
}

function edit(variant: GeneticVariant) {
  const index = state.variants.findIndex((item: { id: string; }) => item.id === variant.id);
  state.variants[index] = variant;
}

function remove(id: string) {
  state.variants = state.variants.filter((item: { id: string; }) => item.id !== id);
}


watch(state.variants, () => {
  state.variantsFiltered = [...state.variants]
})

function filter(typeProperty: string, value: string) {
  state.variantsFiltered = state.variants.filter((item) => {
    if(typeof item[typeProperty] === "object") {
      return JSON.stringify(item[typeProperty]).includes(value)
    }
    return (item[typeProperty] as string).includes(value)
});
}

export function useGeneticVariantsStore() {
  return {
      createArray,
      create,
      edit,
      remove,
      filter,
      getFilteredItems: computed(() => state.variantsFiltered),
      state: computed(() => state),
      variants: computed(() => state.variants)
  };
}
