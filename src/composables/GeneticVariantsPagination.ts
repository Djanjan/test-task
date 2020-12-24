import { computed, ref } from 'vue';

type State = {
  [key: string]: any;
  limitPage: number;
  page: number;
  maxPage: number;
};

function edit(state: State, item: { [x: string]: any }) {
  for (const key in item) {
    if (key) {
      state[key] = item[key];
    }
  }
}

function nextPage(state: State) {
  if (state.page < 0 || state.page > state.maxPage) return;
  if (state.page + state.limitPage >= state.maxPage) return;
  state.page += state.limitPage;
}

function previousPage(state: State) {
  if (state.page <= 0) return;
  if (state.page - state.limitPage < 0) return;
  state.page -= state.limitPage;
}

function firstPage(state: State) {
  if (state.page === 0) return;
  state.page = 0;
}

function lastPage(state: State) {
  if (state.page === state.maxPage || state.page >= state.maxPage) return;
  state.page = state.maxPage - state.limitPage;
}

function getDisplayPages(state: State, data: Array<any>) {
  let subarray = [];

  subarray = data.slice(state.page, state.page + state.limitPage);
  return subarray;
}

export function usePagination() {
  const stateRef = ref<State>({
    limitPage: 5,
    page: 0,
    maxPage: 1,
  });

  const state = stateRef.value;

  return {
    nextPage: () => nextPage(state),
    previousPage: () => previousPage(state),
    firstPage: () => firstPage(state),
    lastPage: () => lastPage(state),
    edit: (item: { [x: string]: any }) => edit(state, item),
    getDisplayPages: (data: Array<any>) => getDisplayPages(state, data),
    state: computed(() => state),
    page: computed(() => state.page),
    limitPage: computed({
      get: () => state.limitPage,
      set: (value) => (state.limitPage = value),
    }),
    maxPage: computed({
      get: () => state.maxPage,
      set: (value) => (state.maxPage = value),
    }),
  };
}
