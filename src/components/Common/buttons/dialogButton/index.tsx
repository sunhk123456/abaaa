import * as React from 'react';
import styles from './index.less';

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  type?: 'normal' | 'close';
}
const DialogButton: React.FC<Props> = props => {
  return (
    <div
      className={
        props.type === 'close'
          ? styles.buttonWrapperClose
          : styles.buttonWrapper
      }
      {...props}
    >
      <div className={styles.text}> {props.title}</div>
    </div>
  );
};
export { DialogButton };
