import * as React from 'react';
import styles from './index.less';

interface Props {
  status: 'normal' | 'active' | 'disable';
  title: string;
  isfirst: 'true' | 'false';
}

interface ButtonType {
  normal?: JSX.Element;
  active?: JSX.Element;
  disable?: JSX.Element;
}

const QuestionPopupNavButton: React.FC<Props> = props => {
  const { status, isfirst } = props;
  const buttonDom: any = {};
  buttonDom['normal'] = (
    <div className={styles.buttonWrapper} {...props}>
      <div className={styles.triangleLeftWhite} />
      <div className={styles.triangleLeftRed} />
      <div className={styles.triangleRightWhite} />
      <div className={styles.triangleRightRed} />
      <div className={styles.button}>
        <div className={styles.text}> {props.title}</div>
      </div>
    </div>
  );
  buttonDom['active'] = (
    <div className={styles.buttonWrapperActive} {...props}>
      <div className={styles.triangleLeftWhite} />
      <div className={styles.triangleLeftRed} />
      <div className={styles.triangleRightWhite} />
      <div className={styles.triangleRightRed} />
      <div className={styles.button}>
        <div className={styles.text}> {props.title}</div>
      </div>
    </div>
  );
  buttonDom['disable'] = (
    <div className={styles.buttonWrapperDisable} {...props}>
      <div className={styles.triangleLeftWhite} />
      <div className={styles.triangleLeftRed} />
      <div className={styles.triangleRightWhite} />
      <div className={styles.triangleRightRed} />
      <div className={styles.button}>
        <div className={styles.text}> {props.title}</div>
      </div>
    </div>
  );

  const buttonDomFirst: ButtonType = {};
  buttonDomFirst['normal'] = (
    <div className={styles.buttonWrapper} {...props}>
      <div className={styles.triangleRightWhite} />
      <div className={styles.triangleRightRed} />
      <div className={styles.button}>
        <div className={styles.text}> {props.title}</div>
      </div>
    </div>
  );
  buttonDomFirst['active'] = (
    <div className={styles.buttonWrapperActive} {...props}>
      <div className={styles.triangleRightWhite} />
      <div className={styles.triangleRightRed} />
      <div className={styles.button}>
        <div className={styles.text}> {props.title}</div>
      </div>
    </div>
  );
  buttonDomFirst['disable'] = (
    <div className={styles.buttonWrapperDisable} {...props}>
      <div className={styles.triangleRightWhite} />
      <div className={styles.triangleRightRed} />
      <div className={styles.button}>
        <div className={styles.text}> {props.title}</div>
      </div>
    </div>
  );
  if (isfirst === 'true') {
    return buttonDomFirst[status];
  }
  return buttonDom[status];
};

export { QuestionPopupNavButton };
