// import Link from 'umi/link';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import Crumb from '../../utils/crumb';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// PC entry
class PCLayout extends React.Component<
  {
    menuList: any;
    loading: any;
    history: any;
  },
  {
    crumb: any;
    menuList: any;
  }
  > {
  constructor(props: any) {
    super(props);
    this.state = {
      crumb: <Breadcrumb.Item>IO Board</Breadcrumb.Item>,
      menuList: props.menuList,
    };
  }

  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Crumb />
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff', overflow: 'auto' }}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
              >
                <SubMenu
                  key="1"
                  title="Hi"
                  onTitleClick={() => { router.push('/pc') }}
                >
                  <Menu.Item><Link to="/pc/cardList">留言卡片</Link></Menu.Item>
                  <Menu.Item><Link to="/pc/write">编辑器</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>IO Board ©2018 Created by zhaoqi.xiao</Footer>
      </Layout>
    );
  }
}

export default connect(state => ({
  loading: state.loading.global,
  menuList: state.pc.menuList,
}))(PCLayout);
