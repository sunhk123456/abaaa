/**
 * @Description: qiankun 全局数据状态事件统一处理
 *
 * @author: liuxiuqian
 *
 * @date: 2020/07/14
 */

function emptyAction(args: any) {
  console.warn('Current execute action is empty!');
}

// 应用单独运行时的假数据

const initState = {
  timeout: '/timeout', // 超时页面
  // @ts-ignore
  origin: window.document.location.origin, //
};

class Actions {
  private isqiankun: boolean;
  constructor() {
    this.isqiankun = false; // 是否注册 qiankun
  }

  actions = {
    getGlobalState: emptyAction,
    setGlobalState: emptyAction,
    delGlobalState: emptyAction,
  };

  // 注册事件方法，一般在入口文件 调用一次
  setActions(actions: {
    getGlobalState: () => void;
    setGlobalState: () => void;
    delGlobalState: () => void;
  }) {
    this.isqiankun = true;
    this.actions = actions;
  }

  getGlobalState(args: string | any[] | undefined) {
    // @ts-ignore
    const globalState = this.actions.getGlobalState();
    if (this.isqiankun) {
      // 判断是否为空 为空直接返回所有数据
      // eslint-disable-next-line no-void
      if (args === void 0) {
        return globalState;
      }
      // 获取单个值
      if (typeof args === 'string') {
        // @ts-ignore
        return args in globalState ? globalState[args] : '';
      }
      // 多参数数组的形式传入
      if (Array.isArray(args)) {
        const reObj = {};
        args.forEach(item => {
          // @ts-ignore
          if (item in globalState) {
            // @ts-ignore
            reObj[item] = globalState[item];
          }
        });
        return reObj;
      }
      // 查不到返回空
      return '';
    } else {
      // 判断是否为空 为空直接返回所有数据
      // eslint-disable-next-line no-void
      if (args === void 0) {
        return initState;
      }
      // 获取单个值
      if (typeof args === 'string') {
        // @ts-ignore
        return args in initState ? initState[args] : '';
      }
      // 多参数数组的形式传入
      if (Array.isArray(args)) {
        const reObj = {};
        args.forEach(item => {
          // @ts-ignore
          if (item in initState) {
            // @ts-ignore
            reObj[item] = initState[item];
          }
        });
        return reObj;
      }
      // 查不到返回空
      return '';
    }
  }

  setGlobalState(args: any) {
    if (this.isqiankun) {
      this.actions.setGlobalState(args);
    } else {
      console.warn('globalState no register');
    }
  }

  // 清除全局数据或者某个数据  清空传 all 删除某个传 key
  delGlobalState(args: string) {
    this.actions.delGlobalState(args);
  }
}

const actions = new Actions();
export default actions;
