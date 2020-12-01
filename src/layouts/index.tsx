/*
 * 全局头部 和 一级菜单
 * */

import { IRouteComponentProps } from 'umi';
import * as React from 'react';
import { Fragment } from 'react';
// @ts-ignore
import PageLoading from '@/components/PageLoading/loading';
import styles from './index.less';
import { connect } from 'umi';
import { ConnectState, Loading } from '@/models/connect';
import Cookie from '../utils/cookie';
import actions from '../utils/globalStateActions';
interface Props extends IRouteComponentProps {
  loading: Loading;
  test?: string;
}

const Layout = (props: Props) => {
  const { loading, children, location, route, history, match, test } = props;
  const CookieItem = Cookie.getCookie('loginStatus');
  let loadingValue = loading.global;
  // 过滤掉非Loading请求。
  if (loading.effects['searchModels/getRecommendList']) {
    loadingValue = false;
  }
  if (!CookieItem) {
    history.push('/login');
    return null;
  } else {
    // const selectKey = `/${location.pathname.split('/')[1]}`;
    return (
      <Fragment>
        {loadingValue && <PageLoading />}
        <div className={styles.layoutsList}>{children}</div>
      </Fragment>
    );
  }
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading,
}))(Layout);
