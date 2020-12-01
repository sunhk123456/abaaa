/**
 * @Description:
 *
 * @author: 风信子
 *
 * @date: 2020/7/22
 */
import { stringify } from 'qs';
import {
  fakeAccountLogin,
  getFakeCaptcha,
  getReChecklogin,
  fakeAccountSsoLogin,
  haheiuie,
} from '@/services/login/index';

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response !== undefined) {
        if (callback) callback(response);
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    // 云门户登录
    *GetCloud({ payload, callback }, { call, put }) {
      const response = yield call(getReChecklogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response !== undefined) {
        callback(response);
      }
    },

    // 单点登录
    *GetSsoLogin({ payload, callback }, { call, put }) {
      const response = yield call(fakeAccountSsoLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response !== undefined) {
        callback(response);
      }
    },
  },

  reducers: {},
};
