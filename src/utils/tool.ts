/**
 * @date: 2019/8/13
 * @author 风信子
 * @Description: 工具类方法
 */

import { history } from 'umi';
import Cookie from './cookie';
import actions from '@/utils/globalStateActions';

/**
 * @date: 2019/8/13
 * @author 风信子
 * @Description: 跳转页面传参数
 * @method routerState
 * @param {string} 参数：url 参数描述：跳转的地址
 * @param {object} 参数：state 参数描述：跳转的参数
 * @param {string} 参数：keyName 参数描述：key 名称
 * @return {返回值类型} 返回值说明
 */

export const routerState = (
  url: string,
  state: {} = {},
  keyName: string = 'routerState',
) => {
  sessionStorage.setItem(keyName, JSON.stringify(state));
  history.push({
    pathname: url,
    state,
  });
};

/**
 * @date: 2019/8/13
 * @author 风信子
 * @Description: 获取路由参数  解决刷新页面后state丢失问题
 * @method getRouterState
 * @param {this} 参数：self 参数描述：页面的props
 * @return {any} 参数返回
 */
export function getRouterState(
  props: any,
  keyName: string = 'routerState',
): any {
  const {
    location: { state },
  } = props;
  // @ts-ignore
  return state || JSON.parse(sessionStorage.getItem(keyName));
}

/**
 * @date: 2019/11/14
 * @author 风信子
 * @Description: 处理表格下载字段数据
 * @method handleDownloadTableValue
 * @param {object[]} 参数：data 参数描述：表格数据
 * @param {} 参数：data 参数描述：字段顺序
 * @return {返回值类型} 返回值说明
 */
export function handleDownloadTableValue(
  data: any,
  fieldOrder: string[] = Object.keys(data[0]),
) {
  const table = data.map((item: { [x: string]: any }) => {
    const tableList = fieldOrder.map(itemList => item[itemList]);
    return tableList;
  });
  return table;
}

/**
 * @date: 2020/5/12
 * @author 风信子
 * @Description: 方法说明 处理表格数据 里边是对象的形式
 * @method 方法名 handleDownloadTableObjectValue
 * @param {object[]} 参数：data 参数描述：表格数据
 * @param {array} 参数：data 参数描述：字段顺序
 * @return {返回值类型} 返回值说明
 */
export function handleDownloadTableObjectValue(
  data: any,
  fieldOrder: string[] = Object.keys(data[0]),
) {
  const table = data.map((item: { [x: string]: { value: any } }) => {
    const tableList = fieldOrder.map(itemList => item[itemList].value);
    return tableList;
  });
  return table;
}

export function toFormData(params: any) {
  const formdata = new FormData();
  for (const key in params) {
    if (typeof params[key] !== 'undefined') {
      formdata.append(key, params[key]);
    }
  }
  return formdata;
}

/**
 * @date: 2020/8/07
 * @author Yzh
 * @Description: 方法说明 去除字符串开始与结束的空格，保留中间空格
 * @method 方法名 removeAllSpace
 * @param {string} 参数：str 参数描述：传入字符串
 * @return {返回值类型} 返回值说明
 */
export function removeStartAndEndSpace(str: string): string {
  return str.replace(/^\s*|\s*$/g, '');
}

//
/**
 * @date: 2020/8/19
 * @author 风信子
 * @Description: 方法说明 处理数据格式 去逗号
 * @method 方法名 formatData
 * @param {string} 参数名 data  参数说明 包含逗号的数据
 * @return {number | string } 返回值说明 去逗号之后的数据
 */
export function formatData(
  data: string,
  roToZero: boolean = false,
): number | string {
  if (roToZero && data === '-') {
    return 0;
  } else if (data !== '-') {
    return data.indexOf(',') === -1
      ? parseFloat(data)
      : parseFloat(data.replace(/,/g, ''));
  } else {
    return data;
  }
}

/**
 * @date: 2020/08/31
 * @author 喵帕斯
 * @Description: 配置不同分辨率下input宽度
 * @method getInputWidth
 * @return {返回值类型} 返回值说明
 */
export const getInputWidth = () => {
  const screenWidth = window.screen.width;
  const configWidthArray = ['120px', '150px', '200px'];
  let width = configWidthArray[0];
  if (screenWidth <= 1300) {
    width = configWidthArray[0];
  } else if (1300 < screenWidth && screenWidth < 1800) {
    width = configWidthArray[1];
  } else if (screenWidth >= 1800) {
    width = configWidthArray[2];
  }
  return width;
};

/**
 * @date: 2020/9/17
 * @author 风信子
 * @Description: 方法说明 获取菜单信息
 * @method 方法名 getMarkInfo
 * @param {参数类型} 参数名 参数说明
 * @return {返回值类型} 返回值说明
 */
export function getMarkInfo() {
  // @ts-ignore
  const globalState = actions.getGlobalState();
  const originUrl = window.location.pathname;
  if (globalState.url && originUrl === globalState.url) {
    const { markType, name, url, dateType } = globalState;
    return {
      markType,
      name,
      url,
      dateType,
    };
  }
  return {};
}
