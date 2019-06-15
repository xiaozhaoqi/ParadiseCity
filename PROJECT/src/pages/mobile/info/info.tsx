import React from 'react'
import { connect } from 'dva';
import About from '../../pc/about'

class Info extends React.Component<{
  userInfo: any
}, {}>{
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <img
          src={this.props.userInfo.avatar_url}
          alt=""
          style={{
            border: '2px solid gray',
            width: '75px',
            borderRadius: '5px',
            minHeight: '75px',
          }}
        />
        <span style={{ margin: '10px 0 0 20px' }}>
          <a href="https://github.com/xiaozhaoqi" target="_blank"><strong>github.com/xiaozhaoqi</strong></a>
        </span>
        <h3 style={{ marginTop: '30px', fontFamily: 'KaiTi', textAlign: 'center' }}>{'>>> 仅用于学习 <<<'}</h3>
        <h1>站点介绍</h1>
        <About />
      </div>
    )
  }
}

export default connect(state => ({
  loading: state.loading.global,
  userInfo: state.global.userInfo,
}))(Info);
