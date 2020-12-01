/**
 *    废弃组件
 * */

import * as React from 'react';
import styles from './index.less';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
}
const FileInput: React.FC<Props> = props => {
  return (
    <div className={styles.xxdFileInput} {...props}>
      <div className={styles.text}>{props.title}</div>
    </div>
  );
};
export { FileInput };
