import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
class Info extends React.Component<
  {
    dispatch: any;
  },
  {}
> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
  };
}

export default connect(mapStateToProps)(Info);
