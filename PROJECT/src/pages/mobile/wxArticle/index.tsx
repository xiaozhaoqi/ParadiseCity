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
  }
  render() {
    let time = new Date(this.state.renderArticle.time).toLocaleString();
    return (
      <div style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
        {this.props.articleList && !this.props.loading
          ?
          <WingBlank
            size="lg"
          >
            <WhiteSpace size="lg" />
            <h2 style={{ fontSize: '22px', lineHeight: '1.4', marginBottom: '14px' }}>{this.state.renderArticle.title}</h2>
            <div style={{
              marginBottom: '22px',
              lineHeight: '20px',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
            }}>
              <span style={{
                color: 'rgba(0,0,0,0.3)',
                display: 'inline-block',
                verticalAlign: 'middle',
                margin: '0 10px 10px 0',
                fontSize: '15px',
              }}>zhaoqi.xiao</span>
              <span
                onClick={() => { router.push('/#/mobile') }}
                style={{
                  color: '#576b95',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  margin: '0 10px 10px 0',
                  fontSize: '15px',
                }}>IOBoard</span>
              <span style={{
                color: 'rgba(0,0,0,0.3)',
                display: 'inline-block',
                verticalAlign: 'middle',
                margin: '0 10px 10px 0',
                fontSize: '15px',
              }}>{time}</span>
            </div>
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
