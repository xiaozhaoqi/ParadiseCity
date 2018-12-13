import { Icon, TabBar, Toast } from 'antd-mobile';
import { connect } from 'dva';
import React from 'react';
import ArticleList from './articleList/articleList';
import CreateNewArticle from './write/createNewArticle';
import PhotoList from './photo/photoList';
import Info from './info/info';

/*
移动端根节点组件
*/
class BasicLayout extends React.Component<
  {
    dispatch: any;
    loading: any;
    tabSelected: number;
    isTabBarHidden: boolean;
  },
  {}
> {
  constructor(props) {
    super(props);
    Toast.info('欢迎来到xiaozhaoqi.github.io', 1);
  }

  render() {
    return (
      <div style={{ height: '100%', position: 'fixed', bottom: '0', width: '100%' }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.props.isTabBarHidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="文章"
            key="article"
            icon={
              <img src={require('../../assets/tab1close.png')} width="21px" height="21px" alt="" />
            }
            selectedIcon={
              <img src={require('../../assets/tab1open.png')} width="21px" height="21px" alt="" />
            }
            selected={this.props.tabSelected == 1}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 1,
              });
              this.props.dispatch({
                type: 'global/getCurrentArticleList',
              });
            }}
          >
            <ArticleList />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <img src={require('../../assets/tab2close.png')} width="21px" height="21px" alt="" />
            }
            selectedIcon={
              <img src={require('../../assets/tab2open.png')} width="21px" height="21px" alt="" />
            }
            title="记录"
            key="write"
            selected={this.props.tabSelected == 2}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 2,
              });
            }}
          >
            <CreateNewArticle />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <img src={require('../../assets/tab3close.png')} width="21px" height="21px" alt="" />
            }
            selectedIcon={
              <img src={require('../../assets/tab3open.png')} width="21px" height="21px" alt="" />
            }
            title="相册"
            key="photo"
            selected={this.props.tabSelected == 3}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 3,
              });
              this.props.dispatch({
                type: 'global/getCurrentPhotoList',
              });
            }}
          >
            <PhotoList />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <img src={require('../../assets/tab4close.png')} width="21px" height="21px" alt="" />
            }
            selectedIcon={
              <img src={require('../../assets/tab4open.png')} width="21px" height="21px" alt="" />
            }
            title="我的"
            key="my"
            selected={this.props.tabSelected == 4}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 4,
              });
            }}
          >
            <Info />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    tabSelected: state.global.tabSelected,
    isTabBarHidden: state.global.isTabBarHidden,
  };
}

export default connect(mapStateToProps)(BasicLayout);
