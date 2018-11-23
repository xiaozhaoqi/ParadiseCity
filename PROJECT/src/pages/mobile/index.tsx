import { Icon, TabBar } from 'antd-mobile';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
import ArticleList from './articleList/articleList';
import CreateNewArticle from './write/createNewArticle';
// import Redirect from 'umi/redirect';

/*
移动端根节点组件
*/
class BasicLayout extends React.Component<{
  dispatch: any;
  loading: any;
  tabSelected: number;
  isTabBarHidden: boolean;
}, {
  }>{
  constructor(props) {
    super(props);
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.props.dispatch({
              type: 'global/hideTabBar',
              payload: !this.props.isTabBarHidden
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: window.screen.height }}>
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
            icon={<img src={require("../../assets/tab1close.png")} width="21px" height="21px" />}
            selectedIcon={<img src={require("../../assets/tab1open.png")} width="21px" height="21px" />}
            selected={this.props.tabSelected == 1}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 1
              })
              this.props.dispatch({
                type: 'global/getCurrentArticleList'
              })
            }}
          >
            <ArticleList />
          </TabBar.Item>
          <TabBar.Item
            icon={<img src={require("../../assets/tab1close.png")} width="21px" height="21px" />}
            selectedIcon={<img src={require("../../assets/tab1open.png")} width="21px" height="21px" />}
            title="记录"
            key="write"
            selected={this.props.tabSelected == 2}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 2
              })
            }}
          >
            <CreateNewArticle />
          </TabBar.Item>
          <TabBar.Item
            icon={<img src={require("../../assets/tab1close.png")} width="21px" height="21px" />}
            selectedIcon={<img src={require("../../assets/tab1open.png")} width="21px" height="21px" />}
            title="相册"
            key="photo"
            selected={this.props.tabSelected == 3}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 3
              })
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={<img src={require("../../assets/tab4close.png")} width="21px" height="21px" />}
            selectedIcon={<img src={require("../../assets/tab4open.png")} width="21px" height="21px" />}
            title="我的"
            key="my"
            selected={this.props.tabSelected == 4}
            onPress={() => {
              this.props.dispatch({
                type: 'global/changeTabSelected',
                payload: 4
              })
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
        {this.props.loading ? <Icon type="loading" size="lg" style={{ position: 'absolute', top: '47%', left: '47%' }} /> : null}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    tabSelected: state.global.tabSelected,
    isTabBarHidden: state.global.isTabBarHidden
  };
}

export default connect(mapStateToProps)(BasicLayout);