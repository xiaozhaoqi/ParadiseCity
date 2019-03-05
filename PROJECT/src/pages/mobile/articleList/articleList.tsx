import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace, Icon, Toast } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
import SkeletonScreen from './skeletonScreen';
import router from 'umi/router';
const Markdown = require('react-markdown/with-html');

class ArticleList extends React.Component<
  {
    loading: boolean;
    articleList: Array<{
      title: string;
      content: string;
      time: number;
    }>;
    dispatch: any;
    isSuccessRemove: boolean;
  },
  {}
  > {
  constructor(props) {
    super(props);
    props.dispatch({
      type: 'global/getCurrentArticleList',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccessRemove) {
      Toast.success('移除成功', 2);
      this.props.dispatch({
        type: 'global/getCurrentArticleList',
      });
      this.props.dispatch({
        type: 'global/changeRemoveState',
        payload: false,
      });
    }
  }
  handleRemoveCard = e => {
    Toast.info('正在移除...', 1);
    this.props.dispatch({
      type: 'global/removeArticle',
      payload: e.target.getAttribute('data-time'),
    });
  };
  switchCardBody = (e) => {
    // try {
    //   if (e.target.parentNode.parentNode.nextSibling.style.display === 'block') {
    //     e.target.parentNode.parentNode.nextSibling.style.display = 'none';
    //   } else {
    //     e.target.parentNode.parentNode.nextSibling.style.display = 'block';
    //   }
    // } catch (error) { }
    router.push('/mobile/wxArticle?title=' + encodeURI(e.target.innerHTML))
  }
  render() {
    return (
      <div>
        {this.props.loading ? <SkeletonScreen /> : null}
        {this.props.articleList && !this.props.loading
          ? this.props.articleList.map((item, index) => {
            let time = new Date(item.time).toLocaleString();
            return (
              <WingBlank
                size="lg"
                key={index}
              >
                <WhiteSpace size="md" />
                <Card style={{ minHeight: 'auto' }}>
                  <Card.Header
                    title={<div onClick={this.switchCardBody} style={{ fontSize: '15px' }}>{item.title}</div>}
                    extra={
                      document.location.search === '?delete' ?
                        <span onClick={this.handleRemoveCard} data-time={item.time}>
                          ×
                        </span> : null
                    }
                  />
                  {/* <Card.Body className={styles.cardBody}>
                    <Markdown source={item.content} escapeHtml={false} />
                  </Card.Body> */}
                  <Card.Footer content={time} />
                </Card>
              </WingBlank>
            );
          })
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    articleList: state.global.articleList,
    isSuccessRemove: state.global.isSuccessRemove,
  };
}

export default connect(mapStateToProps)(ArticleList);
