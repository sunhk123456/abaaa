import React from 'react';
import { history } from 'umi';
import styles from './index.less';

console.log('index');

export default () => {
  return (
    <div className={styles.page}>
      <h1>产品评价系统我的评价项目</h1>
      <button
        onClick={() => {
          history.push('/myEvaluation');
        }}
      >
        跳转到短信管理
      </button>
    </div>
  );
};
