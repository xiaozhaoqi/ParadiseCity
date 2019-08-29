import { TabBar, Toast } from 'antd-mobile';
import { connect } from 'dva';
import React from 'react';
import ArticleList from './articleList/articleList';
import News from './news/index';
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
    articleList: any;
  },
  {}
  > {
  constructor(props) {
    super(props);
    Toast.info('Welcome to Paradise City', 1);
    this.props.dispatch({
      type: 'global/getUserInfo',
    });
    if (this.props.articleList.length === 0) {
      this.props.dispatch({
        type: 'global/getCurrentArticleList',
      });
    }
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
            title="热搜"
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
            }}
          >
            <News />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <img src={require('../../assets/tab2close.png')} width="21px" height="21px" alt="" />
            }
            selectedIcon={
              <img src={require('../../assets/tab2open.png')} width="21px" height="21px" alt="" />
            }
            title="原创"
            key="write"
            selected={this.props.tabSelected == 2}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 2,
              });
            }}
          >
            <ArticleList />
            {/* <CreateNewArticle /> */}
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
            title="关于"
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
    articleList: state.global.articleList
  };
}

export default connect(mapStateToProps)(BasicLayout);
