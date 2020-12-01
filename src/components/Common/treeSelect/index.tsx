/**
 * @Description:
 *
 * @author: crn
 *
 * @需要参数：
 * 必传:
 * treeData：数据主体
 * onchange(value: string[],selectItem: Array<{ id: string; name: string }> | any): 选择改变回调函数
 * value: Array<string>：默认选中的key
 * 可选：
 * style: 样式对象
 * maxTagCount: 输入框最多展示几个选项
 *
 * @date: 2020/8/13
 */

import React from 'react';
import styles from './index.less';
import { message, TreeSelect } from 'antd';

interface Props {
  treeData: Array<any>;
  value: Array<string> | any;
  style?: Object;
  maxTagCount?: number;
  onChange: Function;
}

interface State {}

const { SHOW_PARENT } = TreeSelect;

class TreeSelector extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  // componentDidMount(): void {
  //   const { treeData } = this.props;
  //   this.initRequireList(
  //     JSON.parse(
  //       JSON.stringify(treeData)
  //         .replace(/name/g, 'title')
  //         .replace(/id/g, 'key')
  //         .replace(/value/g, 'children'),
  //     ),
  //   );
  // }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {}

  // // 初始化时生成默认需要的数组
  // initRequireList = (data: any) => {
  //   const { requiredListId } = this.props;
  //   const self = this;
  //   data.forEach((item: any) => {
  //     if (item.key === requiredListId) {
  //       const tempArray: any = [];
  //       item.children.forEach((item1: any) => {
  //         tempArray.push(item1.key);
  //       });
  //       self.setState({
  //         requireArray: tempArray,
  //       });
  //     }
  //     if (item.children && item.children.length) {
  //       this.initRequireList(item.children);
  //     }
  //   });
  // };

  // 树选择功能
  onSelectChange = (value: any, selectItem: any) => {
    console.log('value,selectItem');
    console.log(value, selectItem);
    const { onChange } = this.props;
    const formItem: Object = {
      id: value || '',
      name: selectItem[0] || '',
    };
    onChange(value || '', formItem);
  };

  // 处理树形结构数据递归
  renderTreeNodes = (data: Array<any>) => {
    const setData = data.map((item: any) => {
      item.value = item.key;
      if (item.children && item.children.length) {
        item.selectable = false;
        this.renderTreeNodes(item.children);
      }
      return item;
    });
    return setData;
  };

  render(): React.ReactNode {
    const { treeData, style, maxTagCount } = this.props;
    const tProps = {
      treeData: this.renderTreeNodes(
        JSON.parse(
          JSON.stringify(treeData)
            .replace(/name/g, 'title')
            .replace(/id/g, 'key')
            .replace(/value/g, 'children'),
        ),
      ),
      value: this.props.value,
      onChange: this.onSelectChange,
      showCheckedStrategy: SHOW_PARENT,
      maxTagCount: maxTagCount ? maxTagCount : 1,
      maxTagTextLength: 3,
      placeholder: '请选择',
      style: style
        ? style
        : {
            width: '150px',
          },
    };

    return (
      <div className={styles.outer} id="treeSelect">
        <TreeSelect
          {...tProps}
          // @ts-ignore
          getPopupContainer={() => document.getElementById('treeSelect')}
          allowClear
        />
      </div>
    );
  }
}

export default TreeSelector;
