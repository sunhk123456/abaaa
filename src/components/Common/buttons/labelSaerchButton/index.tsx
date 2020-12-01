import * as React from 'react';
import styles from './index.less';


interface Props extends React.HTMLAttributes<HTMLElement>{
  content: string
}
const LabelSearchButton: React.FC<Props> = (props) => {
  return (
    <div className={styles.buttonWrapper} {...props}>
      <div className={styles.triangle} />
     <div className={styles.text}> {props.content}</div>
    </div>
  );
};
export  { LabelSearchButton };
