import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace, Icon, Toast } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
const Markdown = require('react-markdown/with-html');

class WxArticle extends React.Component<
  {
    loading: boolean;
    articleList: Array<{
      title: string;
      content: string;
      time: number;
    }>;
    dispatch: any;
  },
  {
    title: any;
    renderArticle: any;
  }
  > {
  constructor(props) {
    super(props);
    this.state = {
      title: decodeURI(document.location.hash.split('title=')[1]),
      renderArticle: {}
    }
    props.dispatch({
      type: 'global/getCurrentArticleList',
    }).then(() => {
      props.articleList.map((item, index) => {
        if (item.title === this.state.title) {
          this.setState({ renderArticle: item })
        }
      })
    });
    console.log(this.state.title)
  }
  render() {

    return (
      <div style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
        {this.props.articleList && !this.props.loading
          ?
          <WingBlank
            size="lg"
          >
            <WhiteSpace size="md" />
            <h2>{this.state.renderArticle.title}</h2>
            <Markdown source={this.state.renderArticle.content} escapeHtml={false} />
          </WingBlank>
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    articleList: state.global.articleList,
  };
}

export default connect(mapStateToProps)(WxArticle);
