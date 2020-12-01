import React, { PureComponent } from 'react';
import styles from './index.less';

class Title extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { title } = this.props;
    return (
      <div className={styles.header}>
        <div className={styles.part} />
        {title}
      </div>
    );
  }
}
export default Title;
