// import Link from 'umi/link';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Crumb from '../../utils/crumb';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// PC entry
class PCLayout extends React.Component<
  {
    loading: any;
    history: any;
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
  }

  render() {
    return (
      <>
        <Content style={{ padding: '0 50px' }}>
          <Crumb />
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff', overflow: 'auto' }}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                defaultOpenKeys={['1', '2']}
              >
                <SubMenu
                  key="1"
                  title="文字"
                >
                  <Menu.Item>
                    <Link to="/pc/cardList">留言卡片</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/pc/write">编辑器</Link>
                  </Menu.Item>
                </SubMenu>
                {/* <SubMenu
                  key="2"
                  title="图片"
                >
                  <Menu.Item>
                    <Link to="/pc/photoList">相册</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/pc/upload">上传</Link>
                  </Menu.Item>
                </SubMenu> */}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
  loading: state.loading.global
}))(PCLayout);
