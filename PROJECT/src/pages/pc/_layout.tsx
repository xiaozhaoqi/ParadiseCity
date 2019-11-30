// import Link from 'umi/link';
import React from 'react';
import { Layout, message, BackTop } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Router from 'umi/router';

const styles = require('./index.css');
const { Content, Sider } = Layout;

// PC entry
class PCLayout extends React.Component<
  {
    loading: any;
    history: any;
    dispatch: any;
    userInfo: any;
    articlesLoading: boolean;
  }
  > {
  constructor(props: any) {
    super(props);
    this.props.dispatch({
      type: 'global/getUserInfo',
    });
    this.getArticles()
  }

  getArticles = () => {
    if (this.props.articlesLoading) {
      message.info('正在找最新的文章呢...')
    } else {
      this.props.dispatch({
        type: 'global/getCurrentArticleList',
      });
    }
  }

  render() {

    return (
      <>
        <Content style={{ padding: '50px' }}>
          <Layout style={{ background: '#fff' }}>
            <Sider width={200} style={{
              background: '#fff',
              overflow: 'none',
              width: '200px',
              textAlign: 'center',
            }}>
              <div onClick={() => { Router.push('/') }}>
                <h3 title="一个奇怪的emoji图标，在不同系统中会被渲染成灰色或彩色的两个手拉手的人">👫</h3>
                <h3 title="两个人的“用户名”">Jovi & Candy</h3>
              </div>
              <div className={styles['sider-menu']}>
                <Link to="/pc/" onClick={this.getArticles}>
                  <ruby>记录<rt>ji lu</rt></ruby>
                </Link>
                <Link to="/pc/write">
                  <ruby>写作<rt>xie zuo</rt></ruby>
                </Link>
                <Link to="/pc/about">
                  <ruby>关于<rt>guan yu</rt></ruby>
                </Link>
                <div className={styles.flagcounter} title="一个简单的访问量统计"></div>
              </div>
            </Sider>
            <Content style={{ padding: '0 32px', minHeight: 280 }}>{this.props.children}</Content>
            <BackTop />
          </Layout>
        </Content>
      </>
    );
  }
}

export default connect(state => ({
  loading: state.loading.global,
  userInfo: state.global.userInfo,
  articlesLoading: state.loading.effects['global/getCurrentArticleList']
}))(PCLayout);
