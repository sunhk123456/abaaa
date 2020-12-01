/**
 * @Description:
 *
 * @author: 风信子
 *
 * @date: 2020/7/22
 */

import React, { PureComponent } from 'react';
import { connect, history } from 'umi';

import MD5 from 'md5';
import Cookie from '@/utils/cookie';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, CodeOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

import styles from './index.less';

@connect(({ login }) => ({
  login,
}))
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRemember: false,
      showLogin: false,
      username: '',
      password: '',
      code: '',
      uuid: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (window.location.search != '') {
      const userId = this.GetQueryString('userId');
      const selectFirstId = this.GetQueryString('selectFirstId');
      const loginStatus = this.GetQueryString('loginStatus');
      if (userId) {
        let token = this.GetQueryString('token');
        let ip = this.GetQueryString('ip');
        this.GetCloud(token, userId, ip);
      } else {
        message.error('认证失败');
      }
    } else {
      this.setState({
        showLogin: true,
      });
      this.getVerificationCode();
    }
  }

  /*
   * 功能：获取url 携带的参数
   * */
  GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = this.props.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = '';
    if (r != null) context = r[2];
    reg = null;
    r = null;
    return context == null || context == '' || context == 'undefined'
      ? ''
      : context;
  }

  // 验证uuid和验证码
  uuidCommit = (uuid, captcha) => {
    const { dispatch } = this.props;
    const params = {
      uuid: uuid,
      captcha: captcha,
    };
    dispatch({
      type: 'login/getCaptcha',
      payload: params,
    });
  };

  // 随机生成验证码
  getVerificationCode = () => {
    const random = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let code = '';
    for (let i = 0; i < 4; i += 1) {
      const index = Math.floor(Math.random() * random.length);
      code = code + random[index];
    }
    const uuid = this.uuid(16, 16);
    this.setState({
      code,
      uuid,
    });
    this.uuidCommit(uuid, code);
  };

  // 生成uuid
  uuid = (len, radix) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
      '',
    );
    const uuid = [];
    let i;
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      let r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  };

  // 去空格
  strTrim = str => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  };

  handleSubmit = values => {
    const { code, uuid } = this.state;
    const username = this.strTrim(values.username);
    const password = MD5(this.strTrim(values.password)).toLocaleUpperCase();
    const captcha = this.strTrim(values.captcha);
    const code2 = code.toUpperCase();
    this.setState({
      username,
      password,
    });
    if (code2 === captcha.toUpperCase()) {
      this.loginSYS({ username, password, captcha: code2, uuid }); // 登录
    } else {
      message.error('验证码输入有误！！');
      this.getVerificationCode();
    }
  };

  loginSYS = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: params,
      callback: e => {
        console.log(e);
        if (e.code === '200') {
          const { isRemember } = this.state;
          const loginData = {
            token: e.token,
            userId: e.userId,
            realName: e.realName,
            power: e.power,
            provOrCityName: e.provOrCityName,
            provOrCityId: e.provOrCityId,
            deptName: e.deptName,
            homePage: e.homePage,
            isRemember,
          };
          Cookie.setCookie('loginStatus', loginData, null); // 如果用户选择"记住我"，则设置cookie过期时间
          history.push('/');
        } else {
          message.error(e.message);
          this.getVerificationCode();
        }
      },
    });
  };

  /**
   * 从云门户跳转时，获取登录的用户名密码
   */
  GetCloud(token, userId, ip) {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/GetCloud',
      payload: {
        token,
        userId,
        ip,
      },
      callback: e => {
        if (e.code === '200') {
          const { isRemember } = this.state;
          const loginData = {
            token: e.token,
            userId: e.userId,
            realName: e.realName,
            power: e.power,
            provOrCityName: e.provOrCityName,
            provOrCityId: e.provOrCityId,
            deptName: e.deptName,
            homePage: e.homePage,
            isRemember,
          };
          Cookie.setCookie('loginStatus', loginData, null); // 如果用户选择"记住我"，则设置cookie过期时间
          history.push('/');
        } else {
          message.error(e.message);
        }
      },
    });
  }

  render() {
    // const [form] = Form.useForm();
    const { code, showLogin } = this.state;
    if (!showLogin) {
      return <div>稍等</div>;
    } else {
      return (
        <div className={styles.login}>
          <div className={styles.title}>
            <h1>公共组件-指标页面</h1>
          </div>
          <Form
            onFinish={this.handleSubmit}
            className="login-form"
            // form={form}
          >
            <FormItem
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密&emsp;码"
              />
            </FormItem>
            <FormItem
              name="captcha"
              label="验证码"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Row gutter={8}>
                <Col span={16}>
                  <Input
                    prefix={
                      <CodeOutlined
                        type="code"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder="验证码"
                  />
                </Col>
                <Col span={8}>
                  <div
                    className={styles.code}
                    onClick={() => {
                      this.getVerificationCode();
                    }}
                  >
                    {code}
                  </div>
                </Col>
              </Row>
            </FormItem>
            <div className={styles.submit}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </div>
          </Form>
        </div>
      );
    }
  }
}

export default Login;
