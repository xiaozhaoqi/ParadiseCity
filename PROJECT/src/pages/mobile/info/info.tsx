import React from 'react'
import { connect } from 'dva';
import About from '../../pc/about'

class Info extends React.Component<{
  userInfo: any
}, {}>{
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <a href="https://github.com/xiaozhaoqi" target="_blank">
          <img
            src={this.props.userInfo.avatar_url}
            style={{
              border: '2px solid gray',
              width: '75px',
              borderRadius: '5px',
              height: '75px',
              margin: '0 10px 20px 0'
            }}
          />
          <img
            style={{
              border: '2px solid gray',
              width: window.innerWidth - 130,
              borderRadius: '5px',
              height: '75px',
              marginTop: '-20px'
            }}
            src="https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/"
          />
        </a>
        <About />
      </div>
    )
  }
}

export default connect(state => ({
  loading: state.loading.global,
  userInfo: state.global.userInfo,
}))(Info);
