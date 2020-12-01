/**
 *
 * <p>Title: BONC - React </p>
 *
 * <p>Description:  </p>
 *
 * <p>Copyright: Copyright BONC(c) 2019 - 2025 </p>
 *
 * <p>Company: 北京东方国信科技股份有限公司 </p>
 *
 * @author  yinlingyun
 * @date 2020/7/23
 */
import React, { PureComponent } from 'react';
import styles from './index.less';

class SelectTab extends PureComponent {
  static defaultProps = {
    data: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      clickId: '',
    };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data && data && data.length > 0) {
      this.setState({
        clickId: data[0].tabId,
      });
    }
  }

  tabClickFunction = id => {
    this.setState({
      clickId: id,
    });
  };

  creatTabsDom = (data, id) => {
    return data.map((item, index) => {
      return (
        <div
          key={item.tabId + index}
          className={styles.tabItem}
          style={
            item.tabId === id
              ? { backgroundColor: '#c91717', color: '#fff' }
              : {}
          }
          onClick={() => this.tabClickFunction(item.tabId)}
        >
          {item.tabName}
        </div>
      );
    });
  };

  render() {
    const { data, title } = this.props;
    const { clickId } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.head}>{title}</div>
        {data && data.length > 0 && (
          <div className={styles.tabs}>{this.creatTabsDom(data, clickId)}</div>
        )}
      </div>
    );
  }
}
export default SelectTab;
