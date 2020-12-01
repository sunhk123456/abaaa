import * as React from 'react';
import styles from './index.less';
import { DatePicker, Select, TreeSelect } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { DialogButton } from '@/components/Common/buttons/dialogButton';
import ProCity from '@/components/Common/proCity';
import { getInputWidth } from '@/utils/tool';
import TreeSelector from '@/components/Common/treeSelect';
const { Option } = Select;

interface AreaDataItem {
  proId: string;
  proName: string;
  city: Array<{ cityId: string; cityName: string }>;
}

interface FormDomData {
  span: string;
  key: string;
  name: string;
  value: string | string[];
  type: string;
  children: Array<{ id: string; name: string }>;
  maxDate?: string;
  areaData?: Array<AreaDataItem>;
}

interface FormData {
  [K: string]: string | string[] | { [k: string]: string };
}

interface FormRule {
  key: string;
  name: string;
  required?: boolean;
}

interface Props {
  formDomData: Array<FormDomData>;
  formData: FormData;
  formRules: Array<FormRule>;
  onChange: Function;
  onSubmit: React.MouseEventHandler;
}
const Form: React.FC<Props> = props => {
  const OnChange = (
    key: string,
    value: string | string[] | { [k: string]: string },
    type: string,
    name: string | string[],
    item: FormDomData,
  ) => {
    props.onChange(key, value, type, name, item);
  };

  const disabledDate = (current: any, maxDate: string) => {
    const dateFormat = 'YYYY-MM-DD';
    return current && current > moment(maxDate || '2100-01-01', dateFormat);
  };

  const disabledMonthDate = (current: any, maxDate: string) => {
    const dateFormat = 'YYYY-MM';
    return current && current > moment(maxDate || '2100-01-01', dateFormat);
  };

  const doubleSelectItem = (items: Array<{ id: string; name: string }>) => {
    const dom = items.map(selectItem => (
      <Option value={selectItem.id} key={selectItem.id}>
        {selectItem.name}
      </Option>
    ));
    return dom;
  };

  const singleSelectItem = (items: Array<{ id: string; name: string }>) => {
    const dom = items.map(selectItem => (
      <Option value={selectItem.id} key={selectItem.id}>
        {selectItem.name}
      </Option>
    ));
    return dom;
  };

  const { formDomData, formData, formRules } = props;

  const formDom = formDomData.map(formItem => {
    const width = getInputWidth();
    if (formItem.type === 'date') {
      const dateFormat = 'YYYY-MM-DD';
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
          id={formItem.key}
        >
          <div className={styles.labelTime}>{formItem.name}：</div>
          <DatePicker
            style={{ width: width }}
            disabledDate={(current: any) =>
              disabledDate(current, formItem.maxDate || '2100-01-01')
            }
            allowClear={false}
            onChange={(date: any, dateString: string) =>
              OnChange(
                formItem.key,
                dateString,
                formItem.type,
                dateString,
                formItem,
              )
            }
            value={moment(formData[formItem.key], dateFormat)}
            className={styles.contentTime}
            // @ts-ignore
            getPopupContainer={() => document.getElementById(formItem.key)}
          />
        </div>
      );
    } else if (formItem.type === 'month') {
      const dateFormat = 'YYYY-MM';
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
          id={formItem.key}
        >
          <div className={styles.labelTime}>{formItem.name}：</div>
          <DatePicker
            style={{ width: width }}
            picker="month"
            disabledDate={(current: any) =>
              disabledMonthDate(current, formItem.maxDate || '2100-01')
            }
            allowClear={false}
            onChange={(date: any, dateString: string) =>
              OnChange(
                formItem.key,
                dateString,
                formItem.type,
                dateString,
                formItem,
              )
            }
            value={moment(formData[formItem.key], dateFormat)}
            className={styles.contentTime}
            // @ts-ignore
            getPopupContainer={() => document.getElementById(formItem.key)}
          />
        </div>
      );
    } else if (formItem.type === 'pro') {
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
        >
          <ProCity
            areaData={formItem.children}
            type="pro"
            selectPro={
              formData['selectPro'] as { proId: string; proName: string }
            }
            selectCity={
              formData['selectCity'] as { cityId: string; cityName: string }
            }
            onChange={(selectItem: {
              key: string;
              value: { [k: string]: string };
            }) => {
              OnChange(
                selectItem.key,
                selectItem.value,
                formItem.type,
                formItem.name,
                formItem,
              );
            }}
          />
        </div>
      );
    } else if (formItem.type === 'city') {
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
        >
          <ProCity
            areaData={formItem.children}
            type="city"
            selectPro={
              formData['selectPro'] as { proId: string; proName: string }
            }
            selectCity={
              formData['selectCity'] as { cityId: string; cityName: string }
            }
            onChange={(selectItem: {
              key: string;
              value: { [k: string]: string };
            }) => {
              OnChange(
                selectItem.key,
                selectItem.value,
                formItem.type,
                formItem.name,
                formItem,
              );
            }}
          />
        </div>
      );
    } else if (formItem.type === 'doubleSelect') {
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
          id={formItem.key}
        >
          <div className={styles.labelTime}>{formItem.name}：</div>
          <Select
            mode="multiple"
            // @ts-ignore
            style={{
              width: width,
              height: '35px',
              maxHeight: '35px',
              whiteSpace: 'nowrap',
            }}
            value={formData[formItem.key]}
            onChange={(value: string, selectItem: any) => {
              OnChange(
                formItem.key,
                selectItem.map((item: any) => item.value),
                formItem.type,
                selectItem,
                formItem,
              );
            }}
            // @ts-ignore
            getPopupContainer={() => document.getElementById(formItem.key)}
          >
            {doubleSelectItem(formItem.children)}
          </Select>
        </div>
      );
    } else if (formItem.type === 'singleSelect') {
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
          id={formItem.key}
        >
          <div className={styles.labelTime}>{formItem.name}：</div>
          <Select
            // @ts-ignore
            style={{
              width: width,
              height: '35px',
              maxHeight: '35px',
              whiteSpace: 'nowrap',
            }}
            value={formData[formItem.key]}
            onChange={(value: string, selectItem: any) => {
              OnChange(
                formItem.key,
                selectItem.value,
                formItem.type,
                selectItem.children,
                formItem,
              );
            }}
            // @ts-ignore
            getPopupContainer={() => document.getElementById(formItem.key)}
          >
            {singleSelectItem(formItem.children)}
          </Select>
        </div>
      );
    } else if (formItem.type === 'singleSelectTree') {
      return (
        <div
          className={styles.formItem}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
        >
          <div className={styles.labelTime}>{formItem.name}：</div>
          <TreeSelector
            style={{
              width: width,
              height: '35px',
              maxHeight: '35px',
              whiteSpace: 'nowrap',
            }}
            treeData={formItem.children}
            value={formData[formItem.key]}
            onChange={(
              value: string[],
              selectItem: Array<{ id: string; name: string }> | any,
            ) => {
              OnChange(
                formItem.key,
                value,
                formItem.type,
                selectItem,
                formItem,
              );
            }}
          />
        </div>
      );
    } else if (formItem.type === 'submit') {
      return (
        <div
          className={styles.formOnSubmit}
          key={formItem.key}
          style={{ flexBasis: '25%' }}
        >
          <div className={styles.onSubmit} onClick={props.onSubmit}>
            <DialogButton title={'查询'} />
          </div>
        </div>
      );
    }
    return <div>错误筛选条件</div>;
  });
  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>{formDom}</div>
    </div>
  );
};
export { Form };
