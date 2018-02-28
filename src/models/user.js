import { fetch, create, remove } from "../services/user";

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
    *query({ payload: { page = 1 } }, { select, call, put }) {
      yield put({ type: "showLoading" });
      const { data, headers } = yield call(fetch, { page });
      console.log(data, "99999");
      if (data) {
        yield put({
          type: "save",
          payload: {
            list: data.data,
            total: parseInt(headers["x-total-count"], 10),
            page: parseInt(page, 10)
          }
        });
      }
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
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    createSuccess() {},
    deleteSuccess() {},
    updateSuccess() {},
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname, query, "iiii");
        if (pathname === "/user") {
          dispatch({
            type: "fetch",
            payload: 1
          });
        }
      });
    }
  }
};
