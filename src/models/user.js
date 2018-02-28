import { fetch, create, remove } from "../services/user";
const queryString = require('query-string')

export default {
  namespace: "user",
  state: {
    list: [],
    total: null,
    loading: true,
    current: null,
    currentItem: {},
    modalVisible: false,
    modalType: "create"
  },

  effects: {
    *fetch({ payload: { page } }, { select, call, put }) {
      yield put({ type: "showLoading" });
      const { data, headers } = yield call(fetch, { page });
      yield put({
        type: "save",
        payload: {
          list: data,
          total: parseInt(headers["x-total-count"], 10),
          page: parseInt(page, 10)
        }
      });
    },
    *create({ payload: value }, { call, put }) {
      yield call(create, value);
    },
    *del({ payload: id }, { call, put }) {
      yield call(remove, id);
      yield put({ type: "reload" });
    },
    *update() {}
  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    showModal() {},
    hideModal() {},
    createSuccess() {},
    deleteSuccess() {},
    updateSuccess() {},
    save(state, { payload: { list, total, page } }) {
      return { ...state, list, total, page };
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(history.location.search)
        if (pathname === "/user") {
          dispatch({
            type: "fetch",
            payload: query ? query : 1
          });
        }
      });
    }
  }
};
