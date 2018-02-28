import { fetch, create, remove, update } from "../services/user";
const queryString = require("query-string");

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
    *fetch({ payload: { page = 1 } }, { select, call, put }) {
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
      yield put({ type: "reload" });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(remove, id);
      yield put({ type: "reload" });
    },
    *update({ payload: { id, value } }, { call, put }) {
      yield call(update, id, value);
      yield put({ type: "reload" });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.user.page);
      yield put({ type: "fetch", payload: { page } });
    }
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
        const query = queryString.parse(history.location.search);
        if (pathname === "/user") {
          dispatch({
            type: "fetch",
            payload: query
          });
        }
      });
    }
  }
};
