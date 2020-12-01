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
import echarts from 'echarts';
import styles from './sunriseEcharts.less';
import isEqual from 'lodash/isEqual';
import { formatData } from '../../../utils/tool';

class SunriseEcharts extends PureComponent {
  static defaultProps = {
    color: ['#82B1FF', '#3492D1', '#3C79E5', '#0E51A8', '#20477F'],
    chartData: [
      {
        name: '竞争有利',
        value: 20,
        children: [
          {
            name: '探索期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '成长期',
            value: 5,
            children: [],
          },
          {
            name: '成熟期',
            value: 5,
            children: [],
          },
          {
            name: '衰退期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
        ],
      },
      {
        name: '实力维持',
        value: 20,
        children: [
          {
            name: '探索期',
            value: 5,
            children: [],
          },
          {
            name: '成长期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '成熟期',
            value: 5,
            children: [],
          },
          {
            name: '衰退期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
        ],
      },
      {
        name: '产品较强',
        value: 20,
        children: [
          {
            name: '探索期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '成长期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '成熟期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '衰退期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
        ],
      },
      {
        name: '主导',
        value: 20,
        children: [
          {
            name: '探索期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '成长期',
            value: 5,
            children: [],
          },
          {
            name: '成熟期',
            value: 5,
            children: [],
          },
          {
            name: '衰退期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
        ],
      },
      {
        name: '脆弱',
        value: 20,
        children: [
          {
            name: '探索期',
            value: 5,
            children: [],
          },
          {
            name: '成长期',
            value: 5,
            children: [],
          },
          {
            name: '成熟期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
          {
            name: '衰退期',
            value: 5,
            children: [
              {
                value: 2.5,
              },
              {
                value: 2.5,
              },
            ],
          },
        ],
      },
    ],
  };
  constructor(props) {
    super(props);
    this.chartDom = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    const { chartData } = this.props;
    this.createChart(chartData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { chartData } = this.props;
    if (!isEqual(chartData, prevProps.chartData)) {
      this.createChart(chartData);
    }
  }

  dataFormat = (data, parentValue = 0) => {
    const { color } = this.props;
    if (data && data.length > 0) {
      return data.map((item, index) => {
        let value = formatData(item.value);
        if (!item.value) {
          value = Math.floor((parentValue / data.length) * 100) / 100;
        }
        return {
          // name: item.name,
          // value: item.value,
          ...item,
          value,
          tooltipValue: item.value,
          children: this.dataFormat(
            item.children,
            formatData(item.value, true),
          ),
          itemStyle: {
            color: color[this.getLittleNum(index)],
          },
        };
      });
    }
  };

  // 取余函数
  getLittleNum = length => {
    const { color } = this.props;
    let output;
    if (length >= color.length) {
      output = length - color.length;
      if (output >= color.length) {
        output = this.getLittleNum(output);
        return output;
      } else {
        return output;
      }
    } else {
      output = length;
      return output;
    }
  };

  /*
   * 绘制旭日图
   * */
  createChart = data => {
    const { color } = this.props;
    const { chartData, productIncomeUnit, productLcUnit, unit } = data;
    const chartData2 = this.dataFormat(chartData);
    const option = {
      backgroundColor: '#f7f8fc',
      tooltip: {
        show: true,
        formatter(params) {
          const {
            marker,
            data: { name, productIncomeValue, productLcValue, tooltipValue },
          } = params;
          let str = `产品收入值：${productIncomeValue}${productIncomeUnit}<br /> 产品时期值：${productLcValue}${productLcUnit} `;
          if (productIncomeValue === '' && productIncomeValue === '') {
            str = `占比：${tooltipValue}${unit}`;
          }
          return `${marker} ${name}<br />${str}`;
        },
      },
      series: {
        radius: ['0%', '95%'],
        type: 'sunburst',
        sort: null,
        highlightPolicy: 'none',
        data: chartData2,
        label: {
          rotate: 0,
        },
        nodeClick: false, // 取消节点点击事件
        levels: [
          {
            // 留给数据下钻点的空白配置
          },
          {
            // 最靠内测的第一层
            label: {
              fontSize: 10,
            },
          },
          {
            // 第二层
            label: {
              rotate: 'radial',
            },
          },
          {
            // 第三层
            itemStyle: {
              color: color[0],
            },
          },
        ],
        itemStyle: {
          color: '#ddd',
          borderWidth: 2,
        },
      },
    };
    const myChart = echarts.init(this.chartDom.current);
    myChart.clear();
    myChart.resize();
    myChart.setOption(option);
  };

  render() {
    const { domId } = this.props;
    return (
      <div className={styles.page}>
        <div id={domId} ref={this.chartDom} className={styles.chartWrapper} />
      </div>
    );
  }
}
export default SunriseEcharts;
