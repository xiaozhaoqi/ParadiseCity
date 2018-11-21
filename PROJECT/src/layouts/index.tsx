import styles from './index.css';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
// import Redirect from 'umi/redirect';

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
  };
}

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
}

export default connect(mapStateToProps)(BasicLayout);