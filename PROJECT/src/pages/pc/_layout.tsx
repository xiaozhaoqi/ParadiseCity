// import Link from 'umi/link';
import React from 'react';
import { Layout, Menu, Breadcrumb, List, Button, BackTop } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
const styles = require('./index.css');
const { Content, Sider } = Layout;

// PC entry
class PCLayout extends React.Component<
  {
    loading: any;
    history: any;
    dispatch: any;
    userInfo: any;
    infoFromAPI: any;

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
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'weatherApi',
      search: 'city=北京',
    });
    this.getNews()
    this.getArticles()
  }

  getNews = () => {
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'journalismApi',
      search: '',
    });
  }

  getArticles = () => {
    this.props.dispatch({
      type: 'global/getCurrentArticleList',
    });
  }

  render() {
    const weather = this.props.infoFromAPI.weatherApi_city_北京 || null;

    return (
      <>
        <Content style={{ padding: '50px' }}>
          <Layout style={{ background: '#fff' }}>
            <Sider width={200} style={{
              background: '#fff',
              overflow: 'none',
              width: '200px'
            }}>
              <div
                style={{
                  width: '200px',
                  borderRadius: '5px',
                  height: '75px',
                  textAlign: 'center',
                }}
                id="tv"
              >
                <h3 style={{ marginTop: '10px' }}>
                  👫
                </h3>
                <h3>Jovi & Candy</h3>
              </div>
              {weather ?
                <div
                  style={{
                    width: '200px',
                    margin: '10px 0',
                    padding: '5px',
                    borderRadius: '5px',
                  }}
                >
                  {`今日气温${weather.data.wendu}℃，${weather.data.ganmao}`}
                </div>
                : null}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  overflow: 'none',
                  width: '200px'
                }}
              >
                <Link to="/pc">
                  <Button
                    className={`${styles.siderBtn} ${document.location.hash === '#/pc' ? styles.siderBtnActive : null}`}
                    onClick={this.getNews}
                  >
                    新闻
                  </Button>
                </Link>
                <Link to="/pc/cardList">
                  <Button
                    className={`${styles.siderBtn} ${document.location.hash === '#/pc/cardList' ? styles.siderBtnActive : null}`}
                    onClick={this.getArticles}
                  >
                    记录
                  </Button>
                </Link>
                <Link to="/pc/write">
                  <Button className={`${styles.siderBtn} ${document.location.hash === '#/pc/write' ? styles.siderBtnActive : null}`}>
                    写作
                  </Button>
                </Link>
                <Link to="/pc/about">
                  <Button className={`${styles.siderBtn} ${document.location.hash === '#/pc/about' ? styles.siderBtnActive : null}`}>
                    介绍
                  </Button>
                </Link>
                <div className={styles.flagcounter}></div>
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
  infoFromAPI: state.global.infoFromAPI,
}))(PCLayout);
