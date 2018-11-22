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
    <div>
      {props.loading ? <Icon type="loading" size="lg" style={{position:'absolute',top:'47%',left:'47%'}}/> : null}
      {props.children}
    </div>
  );
}

export default connect(mapStateToProps)(BasicLayout);