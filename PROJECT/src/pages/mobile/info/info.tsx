import React from 'react'
import { connect } from 'dva';
import About from '../../pc/about'

class Info extends React.Component<{
  userInfo: any
}, {}>{
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <About />
        <a href="https://github.com/xiaozhaoqi" target="_blank">
          <img
            style={{
              width: '200px',
              margin: '0 auto',
              display: 'block',
              borderRadius: '5px',
              height: '75px',
            }}
            src="https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/"
          />
        </a>
      </div>
    )
  }
}

export default connect(state => ({
  loading: state.loading.global,
  userInfo: state.global.userInfo,
}))(Info);
