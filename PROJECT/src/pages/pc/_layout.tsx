// import Link from 'umi/link';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

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
    if (/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)) {
      window.location.pathname = '/mobile';
    }
  }

  changeSubMenu = openKeys => {
    if (!openKeys.length) {
      router.push('/pc/board');
      this.setState({
        crumb: <Breadcrumb.Item>IO Board</Breadcrumb.Item>,
      });
    }
  };

  renderMenuList = () => {
    return this.state.menuList.map((item, index) => {
      let name = Object.keys(item)[0];
      return (
        <SubMenu key={'menuList' + index} title={<span>{name}</span>} onTitleClick={this.clickMenu}>
          {item[name].map((subitem, subindex) => {
            if (subitem instanceof Object) {
              let subname = Object.keys(subitem)[0];
              return (
                <SubMenu
                  key={'menuList' + index + '-submenuList' + subindex}
                  title={<span>{subname}</span>}
                  onTitleClick={this.clickMenu}
                >
                  {subitem[subname].map((subsubitem, subsubindex) => {
                    return (
                      <Menu.Item
                        key={
                          'menuList' + index + '-submenu' + subindex + '-subsubmenu' + subsubindex
                        }
                        onClick={this.clickMenu}
                      >
                        {subsubitem}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={'menuList' + index + '-submenu' + subindex}
                  onClick={this.clickMenu}
                >
                  {subitem}
                </Menu.Item>
              );
            }
          })}
        </SubMenu>
      );
    });
  };

  clickMenu = e => {
    let crumb;
    const menuList = this.state.menuList;
    const crumbList = e.key.split('-');
    let currentMenu;
    let firstCrumbName;
    let secondCrumbName;
    let thirdCrumbName;
    let depth = 0;
    e.key.replace(/menu/g, () => {
      depth++;
    });
    if (depth === 1) {
      crumb = (
        <Breadcrumb.Item>{Object.keys(menuList[e.key[e.key.length - 1]])[0]}</Breadcrumb.Item>
      );
    }
    if (depth === 2) {
      currentMenu = menuList[crumbList[0][crumbList[0].length - 1]];
      firstCrumbName = Object.keys(currentMenu)[0];
      secondCrumbName = currentMenu[firstCrumbName][crumbList[1][crumbList[1].length - 1]];
      if (secondCrumbName instanceof Object) {
        crumb = (
          <>
            <Breadcrumb.Item>{firstCrumbName}</Breadcrumb.Item>
            <Breadcrumb.Item>{Object.keys(secondCrumbName)[0]}</Breadcrumb.Item>
          </>
        );
      } else {
        crumb = (
          <>
            <Breadcrumb.Item>{firstCrumbName}</Breadcrumb.Item>
            <Breadcrumb.Item>{secondCrumbName}</Breadcrumb.Item>
          </>
        );
        // 二级菜单页面
        switch (secondCrumbName) {
          // 基础配置
          case '城市管理':
            router.push('/pc/basicConfig/cityManage');
            break;
          case '业务线配置':
            router.push('/pc/basicConfig/businessLineConfig');
            break;
          case '轮播图管理':
            router.push('/pc/basicConfig/carouselManage');
            break;
          case '产品配置':
            router.push('/pc/basicConfig/productConfig');
            break;
          case '广告配置':
            router.push('/pc/basicConfig/advertisementConfig');
            break;
          // 内容管理
          case '资讯管理':
            router.push('/pc/contentManage/newsManage');
            break;
          case '热门推荐管理':
            router.push('/pc/contentManage/hotManage');
            break;
          case '专题管理':
            router.push('/pc/contentManage/subjectManage');
            break;
          case '反馈管理':
            router.push('/pc/contentManage/feedbackManage');
            break;
          // 用户中心
          case '用户管理':
            router.push('/pc/userCenter/userManage');
            break;
          // 官网管理
          case '轮播图管理':
            router.push('/pc/websiteManage/carouselManage');
            break;
          case '网站用户管理':
            router.push('/pc/websiteManage/webUserManage');
            break;
          case '招聘管理':
            router.push('/pc/websiteManage/recruitmentManage');
            break;
          case '新闻管理':
            router.push('/pc/websiteManage/newsManage');
            break;
          case '下载地址管理':
            router.push('/pc/websiteManage/downloadManage');
            break;
          case '编辑':
            router.push('/pc/write/createNewArticle');
            break;
          default:
            break;
        }
      }
    }
    if (depth === 3) {
      currentMenu = menuList[crumbList[0][crumbList[0].length - 1]];
      firstCrumbName = Object.keys(currentMenu)[0];
      secondCrumbName = currentMenu[firstCrumbName][crumbList[1][crumbList[1].length - 1]];
      thirdCrumbName =
        secondCrumbName[Object.keys(secondCrumbName)[0]][crumbList[2][crumbList[2].length - 1]];
      crumb = (
        <>
          <Breadcrumb.Item>{firstCrumbName}</Breadcrumb.Item>
          <Breadcrumb.Item>{Object.keys(secondCrumbName)[0]}</Breadcrumb.Item>
          <Breadcrumb.Item>{thirdCrumbName}</Breadcrumb.Item>
        </>
      );
      switch (thirdCrumbName) {
        // 基础配置
        case '租贝配置':
          router.push('/pc/websiteManage/productManage/zubeiConfig');
          break;
        case '装贝配置':
          router.push('/pc/websiteManage/productManage/zhuangbeiConfig');
          break;
        case '住贝配置':
          router.push('/pc/websiteManage/productManage/zhubeiConfig');
          break;
        default:
          break;
      }
    }
    this.setState({ crumb });
  };

  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>{this.state.crumb}</Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff', overflow: 'auto' }}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                defaultOpenKeys={['menuList3']}
                defaultSelectedKeys={['menuList3-submenu6']}
                onOpenChange={this.changeSubMenu}
              >
                {this.renderMenuList()}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>{this.props.children}</Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>IOBoard ©2018 Created by zhaoqi.xiao</Footer>
      </Layout>
    );
  }
}

export default connect(state => ({
  loading: state.loading.global,
  menuList: state.pc.menuList,
}))(PCLayout);
