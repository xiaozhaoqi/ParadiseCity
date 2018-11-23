import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
// PC entry
class ArticleList extends React.Component<{
  articleList: Array<{
    title: string;
    content: string;
    time: number;
  }>;
  dispatch: any;
}, {}>{
  constructor(props) {
    super(props);
    if (!/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)) {
      window.location.pathname = "/pc";
    }
    props.dispatch({
      type: 'global/getCurrentArticleList'
    })
  }
  render() {
    return (
      <div>
        {
          this.props.articleList.map((item, index) => {
            let time = (new Date(item.time)).toLocaleString();
            return (
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Header
                    title={item.title}
                  // extra={<span>this is extra</span>}
                  />
                  <Card.Body>
                    <div>{item.content}</div>
                  </Card.Body>
                  <Card.Footer content={time} />
                </Card>
                <WhiteSpace size="lg" />
              </WingBlank>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    articleList: state.global.articleList
  };
}

export default connect(mapStateToProps)(ArticleList);