// import Link from 'umi/link';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Crumb from './crumb';
const styles = require('./index.css');
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// PC entry
class PCLayout extends React.Component<
  {
    loading: any;
    history: any;
    dispatch: any;
    userInfo: any;
  },
  {
    crumb: any;
  }
  > {
  constructor(props: any) {
    super(props);
    this.state = {
      crumb: <Breadcrumb.Item>IO Board</Breadcrumb.Item>,
    };
    this.props.dispatch({
      type: 'global/getUserInfo',
    });
  }

  render() {
    return (
      <>
        <Content style={{ padding: '0 50px' }}>
          <div style={{
            border: '1px solid #e8e8e8',
            borderTop: '0',
            padding: '20px'
          }}>
            <Crumb />
          </div>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff', overflow: 'auto' }}>
              <Link to="/pc">
                <img
                  src={this.props.userInfo.avatar_url}
                  alt=""
                  style={{
                    border: '2px solid gray',
                    width: '200px',
                    borderRadius: '5px',
                    minHeight: '200px'
                  }}
                />
              </Link>
              <div
                style={{
                  border: '1px solid gray',
                  width: '200px',
                  borderRadius: '5px',
                  height: '75px',
                  textAlign: 'center'
                }}
              >
                <h2>{this.props.userInfo.login}</h2>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}>
                <Link to="/pc"><Button className={styles.siderBtn}>主页</Button></Link>
                <Link to="/pc/about"><Button className={styles.siderBtn}>介绍</Button></Link>
                <Link to="/pc/cardList"><Button className={styles.siderBtn}>留言卡片</Button></Link>
                <Link to="/pc/write"><Button className={styles.siderBtn}>编辑器</Button></Link>

              </div>
            </Sider>
            <Content style={{ padding: '0 32px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#fff' }}>IO Board ©2018 Created by zhaoqi.xiao</Footer>
      </>
    );
  }
}

export default connect(state => ({
  loading: state.loading.global,
  userInfo: state.global.userInfo
}))(PCLayout);
