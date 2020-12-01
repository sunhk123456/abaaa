/**
 * @Description: loading组件
 *
 * @author: liuxiuqian
 *
 * @date: 2019/03/26
 */
import React, { PureComponent } from 'react';
import styles from './loading.less';

import loadingImg from '@/assets/images/loading/loadingIcon.gif';
import ReactDOM from 'react-dom';

class Loading extends PureComponent {
  static defaultProps = {
    cssStyle: {},
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { cssStyle } = this.props;
    const returnNode = (
      <div className={styles.loading} style={cssStyle}>
        <div className={styles.container}>
          <img src={loadingImg} alt="加载中" />
          <div className={styles.text}>loading...</div>
        </div>
      </div>
    );
    return ReactDOM.createPortal(returnNode || null, document.body);
  }
}

export default Loading;
