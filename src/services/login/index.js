/**
 * @Description:
 *
 * @author: 风信子
 *
 * @date: 2020/7/22
 */
import Url from '../url';
import { toFormData } from '@/utils/tool';
import request from '@/utils/request';

// 验证码
export async function getFakeCaptcha(params) {
  return request(Url.login.url + '/captcha', {
    method: 'POST',
    body: params,
  });
}

// 云门户
export async function getReChecklogin(params) {
  const param = {
    token: params.token,
    userId: params.userId,
  };
  return request(`http://10.249.216.${params.ip}:8105/reChecklogin`, {
    method: 'POST',
    body: param,
  });
}

// 单点登录
export async function fakeAccountSsoLogin(params) {
  return request(Url.login.url + '/sso/login', {
    method: 'POST',
    body: toFormData(params),
  });
}

// 系统登录
export async function fakeAccountLogin(params) {
  return request(Url.login.url + '/login', {
    method: 'POST',
    body: toFormData(params),
  });
}
