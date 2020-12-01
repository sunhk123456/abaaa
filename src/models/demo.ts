/**
 * @Description: models 例子文件
 *
 * @author: 喵帕斯
 *
 * @date: 2020/7/23
 */

import { queryDemoData } from '@/services/demo';

import { Reducer, Effect } from '@@/plugin-dva/connect';

export interface demoModelsState {
  demoData: object;
}

export interface demoModelsType {
  namespace: string;
  state: demoModelsState;
  effects: {
    fetchDemoData: Effect;
  };
  reducers: {
    saveDemoData: Reducer<{ demoData: object }>;
  };
}

const demo: demoModelsType = {
  namespace: 'demoModels',
  state: {
    demoData: {},
  },
  effects: {
    //  请求模块数据
    *fetchDemoData({ payload, callback }, { call, put }) {
      const response = yield call(queryDemoData, payload);
      yield put({
        type: 'saveDemoData',
        payload: response.data,
      });
    },
  },
  reducers: {
    // 保存模块数据
    saveDemoData(state, { payload }) {
      return {
        ...state,
        demoData: payload,
      };
    },
  },
};

export default demo;
