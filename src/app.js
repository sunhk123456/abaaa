/**
 * @Description: qinakun 生命周期函数
 *
 * @author: liuxiuqian
 *
 * @date: 2020/7/22
 */
import ReactDOM from 'react-dom';
import actions from '@/utils/globalStateActions';
import './utils/publicPath';
import Cookie from './utils/cookie';

export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('应用加载之前', props);
    if (props) {
      actions.setActions(props.globalStateActions);
      console.log(actions.getGlobalState());
      Cookie.setCookie(
        'loginStatus',
        actions.getGlobalState('loginStatus'),
        null,
      );
    }
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('应用 render 之前触发', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    ReactDOM.unmountComponentAtNode(props.container);
  },
};
