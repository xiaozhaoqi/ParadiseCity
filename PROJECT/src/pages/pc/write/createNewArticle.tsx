import React from 'react';
import { Button, Popconfirm } from 'antd';

const Markdown = require('react-markdown/with-html');
const styles = require('../index.css');

export default class Push extends React.Component<
  {
    dispatch: any;
  },
  {
    text: string;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  handleText(e) {
    this.setState({
      text: e.target.value,
    });
  }
  push() {
    // this.props.dispatch({
    //   type:'global/sendNewArticle',
    //   payload: {
    //     title:
    //     content:
    //   }
    // })
  }
  render() {
    return (
      <div>
        <textarea
          onChange={this.handleText.bind(this)}
          className={styles.writeArea}
          autoFocus
          value={this.state.text}
        />
        <Markdown source={this.state.text} className={styles.parseMarkdown} escapeHtml={false} />
        <Button type="default" onClick={this.push.bind(this)} className={styles.submitButton}>
          发布
        </Button>
        <Popconfirm
          title="确定清除编辑内容？"
          onConfirm={() => {
            this.setState({ text: '' });
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button type="danger" className={styles.submitButton}>
            重置
          </Button>
        </Popconfirm>
        <Button
          type="dashed"
          onClick={() => {
            window.open('https://www.jianshu.com/p/191d1e21f7ed', '_blank');
          }}
          className={styles.submitButton}
        >
          Help
        </Button>
      </div>
    );
  }
}
