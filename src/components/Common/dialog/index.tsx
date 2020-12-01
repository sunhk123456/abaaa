import * as React from 'react';
import ReactDOM from 'react-dom';
import { Fragment, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { CloseOutlined } from '@ant-design/icons/lib';
import { DialogButton } from '@/components/Common/buttons/dialogButton';

interface Props {
  zIndex?: number;
  className?: any;
  visible: boolean;
  style?: any;
  onClose: React.MouseEventHandler;
  onOk?: React.MouseEventHandler;
  mask?: boolean;
  closeOnClickMask?: boolean;
  children?: ReactElement;
  title?: string;
  footer?: boolean;
}
const Dialog: React.FunctionComponent<Props> = props => {
  const onClickMask: React.MouseEventHandler = e => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };
  const onClickClose: React.MouseEventHandler = e => {
    props.onClose(e);
  };
  const returnNode = props.visible && (
    <Fragment>
      {props.mask && (
        <div
          className={styles.dialogMask}
          onClick={onClickMask}
          // style={{ zIndex: props.zIndex || 1 }}
        />
      )}
      <div
        className={styles.dialogPageWrapper}
        // style={{ zIndex: props.zIndex || 1 }}
      >
        <div
          className={classNames(styles.dialogPage, props.className)}
          style={props.style}
        >
          <div className={styles.dialogClose} onClick={onClickClose}>
            <CloseOutlined />
          </div>
          <div className={styles.popupPage}>
            {props.title && (
              <header className={styles.header}>{props.title}</header>
            )}
            <div className={styles.content}>{props.children}</div>
            {props.footer && (
              <footer className={styles.footer}>
                <div className={styles.buttonWrapper}>
                  <DialogButton
                    type="close"
                    title={'取消'}
                    onClick={props.onClose}
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <DialogButton title={'确定'} onClick={props.onOk} />
                </div>
              </footer>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
  return ReactDOM.createPortal(returnNode || null, document.body);
};
Dialog.defaultProps = {
  closeOnClickMask: true,
  mask: true,
};
export default Dialog;
