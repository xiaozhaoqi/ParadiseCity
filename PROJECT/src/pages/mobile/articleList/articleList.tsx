import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace, Icon, Toast } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
import SkeletonScreen from './skeletonScreen';
import router from 'umi/router';
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
  render() {
    return (
      <div>
        {this.props.loading ? <SkeletonScreen /> : null}
        {this.props.articleList && !this.props.loading
          ? this.props.articleList.map((item, index) => {
              let time = new Date(item.time).toLocaleString();
              return (
                <WingBlank size="lg">
                  <WhiteSpace size="md" />
                  <Card>
                    <Card.Header
                      title={item.title}
                      extra={
                        <span onClick={this.handleRemoveCard} data-time={item.time}>
                          ×
                        </span>
                      }
                    />
                    <Card.Body className={styles.cardBody}>
                      <p>{item.content}</p>
                    </Card.Body>
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
