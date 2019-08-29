import { Card, WingBlank, WhiteSpace, Toast, Tag } from 'antd-mobile';
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
      category: string;
    }>;
    dispatch: any;
    isSuccessRemove: boolean;
  },
  {
    category: string;
  }
  > {
  constructor(props) {
    super(props);
    this.state = {
      category: 'life'
    }
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
  switchCardBody = e => {
    router.push('/mobile/wxArticle?title=' + encodeURI(e.target.innerHTML));
  };
  render() {
    return (
      <div>
        {this.props.loading ? <SkeletonScreen /> : null}
        <div style={{ display: 'flex', margin: '15px 15px 5px 15px' }}>
          <Tag
            style={{ flex: '1' }}
            selected={this.state.category === 'life'}
            onChange={(selected) => { this.setState({ category: selected ? 'life' : '' }) }}
          >生活</Tag>
          <Tag
            style={{ flex: '1' }}
            selected={this.state.category === 'tech'}
            onChange={(selected) => { this.setState({ category: selected ? 'tech' : '' }) }}
          >技术</Tag>
        </div>

        {this.props.articleList && !this.props.loading
          ? this.props.articleList.map((item, index) => {
            if ((item.category === this.state.category) || (this.state.category === 'tech' && item.category === undefined)) {
              let time = new Date(item.time).toLocaleString();
              return (
                <WingBlank size="lg" key={index}>
                  <WhiteSpace size="md" />
                  <Card style={{ minHeight: 'auto' }}>
                    <Card.Header
                      title={
                        <div onClick={this.switchCardBody} style={{ fontSize: '15px' }}>
                          {item.title}
                        </div>
                      }
                      extra={
                        document.location.search === '?delete' ? (
                          <span onClick={this.handleRemoveCard} data-time={item.time}>
                            ×
                            </span>
                        ) : null
                      }
                    />
                    <Card.Footer content={time} />
                  </Card>
                </WingBlank>
              )
            }
          })
          : null}
        <p style={{ textAlign: 'center', margin: '15px', borderBottom: '1px dotted #ddd' }}></p>
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
