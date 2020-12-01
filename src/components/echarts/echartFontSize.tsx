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
 * @author: xingxiaodong
 * @date: 2019-11-11
 */

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

const EchartFontSize: () => EchartFontSizeType = () => {
  const screenWidth = window.screen.width;
  const titleWeight = 'normal';
  let titleSize = 18; // 标题
  let xAxisSize = 12; // x轴
  let legendSize = 12; // 图例
  let yAxisSize = 12; // y轴
  let tooltipSize = 12; // tooltip
  let pietextSize = 12; // 饼图的文字
  let downloadSize = 'small'; // 下载按钮大小
  if (screenWidth > 760 && screenWidth < 960) {
    // 800
    titleSize = 14;
    xAxisSize = 12;
    legendSize = 12;
    yAxisSize = 12;
    tooltipSize = 12;
    pietextSize = 12;
    downloadSize = 'small';
  } else if (screenWidth > 961 && screenWidth < 1100) {
    // 1024
    titleSize = 14;
    xAxisSize = 12;
    legendSize = 12;
    yAxisSize = 12;
    tooltipSize = 12;
    pietextSize = 12;
    downloadSize = 'small';
  } else if (screenWidth > 1101 && screenWidth < 1315) {
    // 1280
    titleSize = 16;
    xAxisSize = 12;
    legendSize = 12;
    yAxisSize = 12;
    tooltipSize = 14;
    pietextSize = 12;
    downloadSize = 'small';
  } else if (screenWidth > 1316 && screenWidth < 1389) {
    // 1366
    titleSize = 18;
    xAxisSize = 12;
    legendSize = 12;
    yAxisSize = 12;
    tooltipSize = 14;
    pietextSize = 12;
    downloadSize = 'small';
  } else if (screenWidth > 1390 && screenWidth < 1869) {
    // 1440
    titleSize = 18;
    xAxisSize = 12;
    legendSize = 12;
    yAxisSize = 12;
    tooltipSize = 14;
    pietextSize = 12;
    downloadSize = 'default';
  } else if (screenWidth > 1870) {
    // 1920
    titleSize = 23;
    xAxisSize = 12;
    legendSize = 14;
    yAxisSize = 12;
    tooltipSize = 20;
    pietextSize = 15;
    downloadSize = 'large';
  }
  return {
    titleSize,
    xAxisSize,
    legendSize,
    yAxisSize,
    tooltipSize,
    pietextSize,
    downloadSize,
    titleWeight,
  };
};
export default EchartFontSize;
