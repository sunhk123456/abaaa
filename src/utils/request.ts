/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import Cookie from './cookie';
// import { history } from 'umi';
import actions from './globalStateActions';

interface codeMessageType {
  [K: string]: string;
}

const codeMessage: codeMessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  210: '登录超时。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求的资源未找到',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
interface Response2 {
  code: any;
  message: string;
}

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response; data: any }): Response2 => {
  const { response, data } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    const timeout = actions.getGlobalState('timeout'); // 超时路径
    if (status === 210 && timeout) {
      window.parent.location.href = timeout; // 超时页面
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url.substring(
          response.url.lastIndexOf('/'),
          response.url.indexOf('?'),
        )}`,
        description: errorText,
      });
    }
    return {
      code: status.toString(),
      message: errorText,
    };
  } else {
    notification.error({
      description: '连接异常，无法连接服务器',
      message: '连接异常',
    });
    return {
      code: 'error',
      message: '未知错误',
    };
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  const { body }: any = options;
  const CookieItem = Cookie.getCookie('loginStatus') || {
    token: '',
    userId: '',
  };
  let newOptions = {};
  let urlPath = url;
  if (url.lastIndexOf('login') === -1 && url.lastIndexOf('/captcha') === -1) {
    if (body instanceof FormData) {
      body.append('token', CookieItem.token);
      body.append('userId', CookieItem.userId);
    } else {
      body.token = CookieItem.token;
      body.userId = CookieItem.userId;
    }
    urlPath = `${url}?ticket=${
      CookieItem.token
    }&timestamp=${new Date().getTime()}&userId=${CookieItem.userId}`;
  }
  if (!(body instanceof FormData)) {
    newOptions = {
      ...options,
      body: JSON.stringify(body),
      headers: {
        ...options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        userId: CookieItem.userId ? CookieItem.userId : '',
      },
    };
  } else {
    newOptions = {
      ...options,
      body,
      headers: {
        ...options.headers,
        Accept: 'application/json',
        userId: CookieItem.userId ? CookieItem.userId : '',
      },
    };
  }
  return {
    url: urlPath,
    options: newOptions,
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async response => {
  if (response.status === 200) {
    return response;
  } else {
    // 失败异常处理
    let error = new Error('http error');
    error = {
      // @ts-ignore
      data: {
        error: codeMessage[response.status],
        message: codeMessage[response.status],
        status: response.status,
        path: response.url,
      },
      response,
    };
    throw error;
    return response;
  }
});

export default request;
