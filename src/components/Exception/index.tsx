/**
 * @Description: 404  500 异常页面
 *
 * @author: Yzh
 *
 * @date: 2020/9/11
 */

import React from 'react';
import styles from './index.less';
import config from './typeConfig';

interface Props {
  type: string;
}

interface State {}

class Exception extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {}

  render(): React.ReactNode {
    const { type } = this.props;
    return (
      <div className={styles.exception}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${config[type].img})` }}
        />
        <div className={styles.content}>
          <h1>{config[type].title}</h1>
          <div className={styles.desc}>{config[type].desc}</div>
        </div>
      </div>
    );
  }
}

export default Exception;
