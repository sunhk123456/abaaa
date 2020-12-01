/**
 *
 * <p>Title: BONC - React </p>
 *
 * <p>Description:  标签查询专题-关系图查询小页面</p>
 *
 * <p>Copyright: Copyright BONC(c) 2019 - 2025 </p>
 *
 * <p>Company: 北京东方国信科技股份有限公司 </p>
 *
 * @author: yly
 * @date: 2020/7/6
 */
import React, { PureComponent } from 'react';
import styles from './displayItem.less';
import iconFont from '@/icon/Icons/iconfont';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: iconFont,
});

class DisplayItem extends PureComponent {
  static defaultProps = {
    info: [],
    span: '1',
  };
  constructor(props) {
    super(props);
    this.state = {
      popShow: false, // 详情弹窗是否出现
    };
  }

  /**
   * 弹窗弹出方法，先判断是否有内容
   * @param e
   */
  popOut = e => {
    const { info } = this.props;
    if (info.length > 0) {
      e.stopPropagation(); // 阻止冒泡
      e.preventDefault(); // 阻止事件捕获
      e.cancelBubble = true; // IE阻止冒泡
      this.setState({
        popShow: true,
      });
    }
  };

  /**
   * 弹窗隐藏方法
   */
  popNone = e => {
    e.stopPropagation(); // 阻止冒泡
    e.preventDefault(); // 阻止事件捕获
    e.cancelBubble = true; // IE阻止冒泡
    this.setState({
      popShow: false,
    });
  };

  render() {
    const { title, value, info, iconShow, span } = this.props;
    const popList = info.map(item => {
      return (
        <div className={styles.popItem} key={item.name}>
          <div className={styles.popName}>{item.name}：</div>
          <div className={styles.popValue}>{item.value}</div>
        </div>
      );
    });
    const { popShow } = this.state;
    return (
      <div
        className={styles.item}
        style={span === '1' ? {} : { width: '100%' }}
      >
        <div className={styles.title}>
          <span>{title}</span>
          <div className={styles.info}>
            {iconShow && (
              <IconFont
                className={styles.icon}
                type="iconwenhao"
                onMouseOver={this.popOut.bind(this)}
                onMouseOut={this.popNone.bind(this)}
              />
            )}
            {popShow && <div className={styles.popOut}>{popList}</div>}
          </div>
        </div>
        <div className={styles.value}>{value}</div>
      </div>
    );
  }
}
export default DisplayItem;
