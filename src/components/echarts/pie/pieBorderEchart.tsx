import echarts, { EChartOption } from 'echarts';
import React from 'react';
import isEqual from 'lodash/isEqual';
import EchartFontSize from '../echartFontSize';
import styles from './pieEchart.less';

interface EchartFontSizeType {
  titleSize?: number;
  xAxisSize?: number;
  legendSize?: number;
  yAxisSize?: number;
  tooltipSize?: number;
  pietextSize?: number;
  downloadSize?: string;
  titleWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | '100'
    | '200'
    | '300'
    | '400';
}

interface chartType {
  name: string;
  value: Array<string>;
  unit: string;
  type: string;
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  condition: {
    showTitle?: boolean;
    colors?: Array<string>;
    centerData?: Array<string>;
    isRosePie?: boolean;
    hasLegend?: boolean;
    hasBorder?: boolean;
    showLabel?: boolean;
    hasClockWise?: boolean;
    titlePosition?: 'left' | 'center' | 'right';
    styleSize?: EchartFontSizeType;
  };
  'chart-data': {
    title: string;
    chartX: Array<string>;
    chart: Array<chartType>;
    example: Array<string>;
  };
}

interface State {}
class PieEchart extends React.PureComponent<Props, State> {
  public chartDom: React.RefObject<any>;
  static defaultProps: Props = {
    condition: {
      showTitle: true,
      titlePosition: 'left',
      hasClockWise: true, // 是否顺时针
      hasLegend: true, // 是否展示图例
      isRosePie: false, // 是否南丁格尔图
      hasBorder: false, // 是否有边框
      showLabel: true,
      centerData: ['50%', '50%'],
      colors: [
        '#5CD5E3',
        '#DC69AB',
        '#61ADDD',
        '#DE9462',
        '#91C7AE',
        '#919BC6',
        '#C391C6',
        '#DC6868',
        '#B6DC6B',
        '#D0C862',
      ],
      styleSize: {},
    },
    'chart-data': {
      title: '多层堆积图',
      chartX: ['2019年1月', '2019年02月', '2019年03月'],
      chart: [
        {
          name: '多层堆积图',
          value: ['230', '210', '220'],
          unit: '万元',
          type: 'pie',
        },
      ],
      example: ['2019年1月', '2019年02月', '2019年03月'],
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
    this.chartDom = React.createRef();
  }

  componentDidMount(): void {
    const chartData = this.props['chart-data'];
    if (chartData) {
      this.createChart(chartData);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const chartData = this.props['chart-data'];
    if (!isEqual(prevProps['chart-data'], chartData)) {
      this.createChart(chartData);
    }
  }

  // 处理数据格式
  formatData = (data: string) =>
    data.indexOf(',') === -1
      ? parseFloat(data)
      : parseFloat(data.replace(/,/g, ''));

  createChart: (data: Props['chart-data']) => void = data => {
    const myChart = echarts.init(this.chartDom.current);
    myChart.clear();
    if (!data) {
      return null;
    }
    if (!data.chartX) {
      return null;
    }

    const { condition } = this.props;
    const {
      hasLegend,
      colors,
      isRosePie,
      centerData,
      hasClockWise,
      hasBorder,
      showLabel,
      styleSize,
      showTitle,
    } = condition;

    const fontsize = EchartFontSize();
    const {
      titleSize,
      titleWeight,
      tooltipSize,
      legendSize,
      pietextSize,
    }: EchartFontSizeType = Object.assign({}, fontsize, styleSize);
    const newChart = data.chart.map(item => ({
      name: item.name,
      value: item.value.map((item1, index) => ({
        value: this.formatData(item1),
        normalData: item1,
        unit: item.unit,
        name: data.chartX[index],
      })),
      type: item.type,
    }));
    const seriesData = newChart[0].value;
    const legendData = data.example;
    const { title } = data;
    const tooltip: any = {
      trigger: 'item',
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
      formatter(params: {
        data: { normalData: string; unit: string };
        name: string;
        marker: any;
      }) {
        return `${params.marker}${params.name}:${params.data.normalData}${params.data.unit}`;
      },
    };
    const option: EChartOption = {
      title: {
        show: showTitle,
        text: title,
        top: 5,
        left: 'left',
        textStyle: {
          fontSize: titleSize,
          fontWeight: titleWeight,
          align: 'center',
        },
      },
      grid: {
        top: 60,
        left: '10%',
        right: '10%',
        bottom: 60,
        containLabel: true,
      },
      tooltip,
      legend: {
        show: hasLegend || false,
        data: legendData,
        icon: 'rect',
        bottom: '5%',
        textStyle: {
          fontSize: legendSize,
        },
      },
      color: colors,
      series: [
        {
          type: 'pie',
          roseType: isRosePie ? 'radius' : '',
          radius: [isRosePie ? '20%' : '35%', '55%'],
          center: centerData || ['50%', '50%'], // 圆心位置
          clockwise: hasClockWise || true, // 是否顺时针分布
          itemStyle: {
            borderWidth: hasBorder ? 10 : 0,
            borderColor: '#FFFFFF',
          },
          data: seriesData,
          labelLine: {
            show: showLabel || false,
            length: 10,
            length2: 30,
            lineStyle: {
              width: 1,
            },
          },
          label: {
            show: showLabel || false,
            height: 70,
            fontSize: pietextSize,
            align: 'center',
            formatter: (data: any) => {
              return `${data.percent}%`;
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  };

  render(): React.ReactNode {
    const { className, ...rest } = this.props;
    return (
      <div className={[styles.pieComponent, className].join(' ')} {...rest}>
        <div className={styles.chart} ref={this.chartDom} />
      </div>
    );
  }
}

export default PieEchart;
