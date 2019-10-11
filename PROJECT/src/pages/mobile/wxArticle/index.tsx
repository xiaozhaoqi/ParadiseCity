import { WingBlank, WhiteSpace, Icon } from 'antd-mobile';
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
    time: any;
    renderArticle: any;
    toTop: string;
  }
  > {
  constructor(props) {
    super(props);
    this.state = {
      time: Number(document.location.hash.split('time=')[1]),
      renderArticle: {},
      toTop: 'none',
    };

    window.addEventListener('scroll', e => {
      if (document.body.scrollTop > document.body.offsetHeight) {
        this.setState({ toTop: 'block' });
      } else {
        this.setState({ toTop: 'none' });
      }
    });
  }

  componentDidMount() {
    this.props
      .dispatch({
        type: 'global/getCurrentArticleList',
      })
      .then(() => {
        this.props.articleList.map((item, index) => {
          if (item.time === this.state.time) {
            this.setState({ renderArticle: item });
          }
        });
      });
  }

  render() {
    let time = new Date(this.state.renderArticle.time).toLocaleString();
    return (
      <div style={{ wordBreak: 'break-all', wordWrap: 'break-word', overflow: 'hidden' }}>
        {this.props.articleList && !this.props.loading ? (
          <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: '1.4',
                marginBottom: '14px',
              }}
            >
              {this.state.renderArticle.title}
            </h2>
            <div
              style={{
                lineHeight: '20px',
                wordWrap: 'break-word',
                wordBreak: 'break-all',
              }}
            >
              <span
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  margin: '0 10px 10px 0',
                  fontSize: '15px',
                }}
              >
                zhaoqi.xiao
              </span>
              <span
                onClick={() => {
                  router.push('/mobile');
                }}
                style={{
                  color: '#576b95',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  margin: '0 10px 10px 0',
                  fontSize: '15px',
                }}
              >
                IOBoard
              </span>
              <span
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  margin: '0 10px 10px 0',
                  fontSize: '15px',
                }}
              >
                {time}
              </span>
            </div>
            <Markdown source={this.state.renderArticle.content} escapeHtml={false} />
          </WingBlank>
        ) : (
            <Icon
              type="loading"
              size="lg"
              style={{ position: 'absolute', top: '50%', left: '45%' }}
            />
          )}
        <Icon
          type="up"
          size="lg"
          style={{
            position: 'fixed',
            right: '20vw',
            bottom: '10vh',
            display: this.state.toTop,
          }}
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        />
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
