import * as React from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { getInputWidth } from '@/utils/tool';
interface Props {
  areaData: Array<any>;
  type: 'pro' | 'city';
  selectPro: {
    proId: string;
    proName: string;
  };
  selectCity: {
    cityId: string;
    cityName: string;
  };
  onChange: Function;
}
const ProCity = (props: Props) => {
  document.onclick = () => {
    setShow(false);
  };
  const [show, setShow] = useState(false);
  const { areaData } = props;
  const dataCityList = areaData;
  const { type, selectPro, selectCity } = props;
  const selectItem = {
    id: type === 'pro' ? selectPro.proId : selectCity.cityId,
    name: type === 'pro' ? selectPro.proName : selectCity.cityName,
  };
  const lableName = {
    pro: '省分：',
    city: '地市：',
  };
  /*
   * 处理选中某个省
   * index 索引
   *
   * */
  const handleProList = (index: number, proId: string, proName: string) => {
    const selectPro = {
      proId,
      proName,
    };
    setShow(false);
    if (areaData.length === 1 && areaData[0].city.length === 1) {
      return null; // 地市用户操作选择省份，无反应。
    }
    props.onChange({ key: 'selectPro', value: selectPro });
  };
  /*
   * 处理选中地市个省
   * index 索引
   *
   * */
  const handleCityList = (index: number, cityId: string, cityName: string) => {
    const selectCity = {
      cityId,
      cityName,
    };
    setShow(false);
    props.onChange({ key: 'selectCity', value: selectCity });
  };

  if (
    dataCityList !== undefined &&
    dataCityList.length > 0 &&
    selectPro.proId
  ) {
    const proList = dataCityList.map((data, index) => (
      <li
        key={data.proId}
        title={data.proName}
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation();
          e.stopPropagation(); // 阻止事件向上传播
          handleProList(index, data.proId, data.proName);
        }}
      >
        {data.proName}
      </li>
    ));
    const dataCity = dataCityList.find(item => selectPro.proId === item.proId);
    const cityList = dataCity.city.map((data: any, index: number) => (
      <li
        key={data.cityId}
        title={data.cityName}
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation();
          e.stopPropagation(); // 阻止事件向上传播
          handleCityList(index, data.cityId, data.cityName);
        }}
      >
        {data.cityName}
      </li>
    ));
    const list = type === 'pro' ? proList : cityList;
    const handleData = () => {
      setShow(true);
    };
    const width = getInputWidth();

    return (
      <div className={styles.page}>
        <div className={styles.proContent}>
          <span className={styles.name}>{lableName[type]}</span>
          <div
            style={{ width: width }}
            className={styles.cityFrame}
            onClick={e => {
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation(); // 阻止事件向上传播
              handleData();
            }}
          >
            <span
              className={classnames(
                styles.FrameName,
                show ? styles.FrameNameActive : styles.FrameNameNoActive,
              )}
            >
              {selectItem.name}
            </span>
            <i
              className={classnames(
                styles.triangle,
                show ? styles.triangleActive : styles.triangleNoActive,
              )}
            />
            <div
              className={classnames(
                styles.cityList,
                !show && styles.cityListNone,
              )}
            >
              <ul className={styles.cityUl}>{list}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export default ProCity;
