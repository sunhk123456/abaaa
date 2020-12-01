import * as React from 'react';
import styles from './index.less';
interface Props {
  title?:string
}

const SpecialName=(props:Props) =>{
  return (
    <div className={styles.componentTitleWrapper}>
      <div className={styles.componentTitleText}>
        {props.title || ""}
      </div>
    </div>
  )
};
export default SpecialName
