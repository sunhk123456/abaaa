import echarts, { EChartOption } from 'echarts';
import React from 'react';
import isEqual from 'lodash/isEqual';
import EchartFontSize from '../echartFontSize';
import styles from './lineEchart.less';

interface chartType {
  name: string;
  value: Array<string>;
  unit: string;
  type: string;
}

interface Props {
  specialName?: string;
  stack?: boolean;
  timeEchartArea?: boolean;
  vertical?: boolean;
  colors?: Array<string>;
  echartId?: string;
  chartData?: {
    title?: string;
    yName?: string;
    xName?: string;
    chartX: Array<string>;
    chart: Array<chartType>;
  };
}

interface State {}
class LineEchart extends React.PureComponent<Props, State> {
  public chartDom: React.RefObject<any>;
  static defaultProps: Props = {
    specialName: '家庭视图',
    stack: false, // 柱图是否堆叠
    timeEchartArea: false,
    vertical: false,
    colors: ['#5dd4e2'],
    echartId: 'HomeBasisBarEchart',
    chartData: {
      title: '单宽,融合家庭数量对比',
      yName: '户',
      xName: 'x户',
      chartX: [
        '1月xx',
        '2xx222',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      chart: [
        {
          name: '移网',
          value: ['-', '154', '223', '135', '289', '158'],
          unit: '户',
          type: 'line',
        },
      ],
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
    this.chartDom = React.createRef();
  }

  componentDidMount(): void {
    const chartData = this.props['chartData'];
    if (chartData) {
      this.createChart(chartData);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const chartData = this.props['chartData'];
    if (chartData && !isEqual(prevProps['chartData'], chartData)) {
      this.createChart(chartData);
    }
  }

  // 处理数据格式
  formatData = (data: string) =>
    data.indexOf(',') === -1
      ? parseFloat(data)
      : parseFloat(data.replace(/,/g, ''));

  // 渲染echart
  createChart: (data: Props['chartData']) => void = data => {
    if (!data) {
      return null;
    }
    if (!data.chartX) {
      return null;
    }
    const { colors, stack, timeEchartArea } = this.props;
    const fontsize = EchartFontSize();
    const {
      xAxisSize,
      yAxisSize,
      tooltipSize,
      legendSize,
      titleSize,
      titleWeight,
    } = fontsize;
    const newChart = data.chart.map(item => ({
      type: item.type,
      name: item.name,
      value: item.value.map(item1 => ({
        value: this.formatData(item1),
        normalData: item1,
        unit: item.unit,
      })),
    }));
    const seriesData = newChart.map(item => {
      if (timeEchartArea) {
        return {
          stack: stack ? 'one' : null,
          type: item.type,
          name: item.name,
          data: item.value,
          smooth: false,
          symbolSize: 1,
          itemStyle: {
            color: '#FD9F82',
            lineStyle: {
              // #D7D8DE
              color: '#D7D8DE',
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)',
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)',
              },
            ]),
          },
        };
      }
      return {
        stack: stack ? 'one' : null,
        type: item.type,
        name: item.name,
        data: item.value,
        smooth: false,
        symbolSize: 8,
        symbol: 'emptyCircle',
        itemStyle: {
          color: colors,
          lineStyle: {
            // #D7D8DE
            color: '#D7D8DE',
          },
        },
      };
    });
    const chartXData = data.chartX;
    const legendData = data.chart.map(item => item.name);

    const option: any = {
      color: colors, // 柱状图颜色
      title: {
        show: false,
        text: data.title,
        padding: [15, 0, 0, 8],
        textStyle: {
          fontSize: titleSize,
          // color: "#000000a6", // 主标题文字颜色
          fontWeight: titleWeight,
        },
      },
      grid: {
        top: 50,
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        confine: true, // 限制在图标区域内
        show: true,
        textStyle: {
          fontSize: tooltipSize,
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(86,84,86,0.2)',
          },
        },
        formatter(params: any) {
          let showTip = '';
          params.forEach((par: any) => {
            if (par.axisDim === 'x') {
              showTip += `${par.marker} ${par.seriesName} : ${
                par.data.normalData
              }  ${par.data.normalData === '-' ? '' : par.data.unit}  <br/>`;
            }
          });
          return `${params[0].axisValue} <br/> ${showTip}`;
        },
      },
      legend: {
        show: true,
        data: legendData,
        top: '50px',
        right: '20px',
        textStyle: {
          fontSize: legendSize,
        },
        itemWidth: 25, // 间距
      },
      xAxis: {
        type: 'category',
        name: data.xName,
        nameTextStyle: {
          color: '#333',
        },
        data: chartXData,
        axisTick: { show: false }, // 不显示刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: '#d7d7d7',
          },
        }, // 不显示轴线
        axisLabel: {
          show: true, // y轴坐标标签展示
          fontSize: xAxisSize,
          color: '#333',
        },
      },
      yAxis: [
        {
          type: 'value',
          name: data.yName,
          nameTextStyle: {
            color: '#333',
          },
          axisTick: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#d7d7d7',
            },
          },
          min: 'dataMin',
          axisLabel: {
            textStyle: {
              color: '#333',
              fontSize: yAxisSize,
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#EEEFF1',
              width: 1,
            },
          },
        },
      ],
      series: seriesData,
    };

    const myChart = echarts.init(this.chartDom.current);

    // 检测屏幕宽度发生变化时,重新渲染
    myChart.clear();
    myChart.resize();
    myChart.setOption(option);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    return null;
  };

  render(): React.ReactNode {
    return (
      <div className={styles.pieComponent}>
        <div className={styles.chart} ref={this.chartDom} />
      </div>
    );
  }
}

export default LineEchart;
