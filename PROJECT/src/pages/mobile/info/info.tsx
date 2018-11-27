import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';

class Info extends React.Component<{
 
  dispatch: any;
}, {}>{
  constructor(props) {
    super(props);
    if (!/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)) {
      window.location.pathname = "/pc";
    }
  }
  render() {
    return (
      <div>
          
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
  };
}

export default connect(mapStateToProps)(Info);