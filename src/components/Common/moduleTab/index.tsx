// import React ,{ Component, Fragment } from 'react';
// import styles from './index.less'
//
// class ModuleTabs extends Component {
//   static defaultProps={
//     arrayData:[{id:"D",name:"日"},{id:"M",name:"月"}],
//     selectIndex:"M",
//     callback:(id)=>{
//       console.log(id)
//     }
//   };
//
//   constructor(props) {
//     super(props);
//     this.state = {
//
//     }
//   }
//
//   itemClicked=(index)=>{
//     const {callback} = this.props;
//     callback(index)
//   };
//
//
//   render() {
//     const { arrayData,selectIndex} = this.props;
//     const liItem = arrayData.map((item) => (
//       <div className={selectIndex===item.id?styles.itemSelected:styles.item} key={item.id} onClick={()=>this.itemClicked(item.id)}>{item.name}</div>
//     ));
//     return (
//       <Fragment>
//         <div className={styles.page}>
//           {liItem}
//         </div>
//       </Fragment>
//     );
//   }
// }
//
// export default ModuleTabs;

import * as React from 'react';
import styles from './index.less';

interface ModuleItem {
  moduleId: string;
  moduleName: string;
}

interface Props {
  moduleData?: Array<ModuleItem>;
  selectId?: string;
  callback: Function;
}

const ModuleTabs = (props: Props) => {
  const { moduleData, selectId, callback } = props;
  const tab =
    moduleData &&
    moduleData.map(item => (
      <div
        key={item.moduleId}
        className={
          selectId === item.moduleId ? styles.active : styles.tableItem
        }
        onClick={() => callback(item)}
      >
        {item.moduleName}
      </div>
    ));
  return <div className={styles.tableWrapper}>{tab}</div>;
};
export default ModuleTabs;
