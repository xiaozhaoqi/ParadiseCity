import React from 'react';
import Markdown from 'react-markdown/with-html';
import styles from '../index.module.css';

import { sendNewArticle } from '../utils/request';

class Push extends React.Component<
  {
    loading: Function;
  },
  {
    text: string;
    title: string;
    category: string;
  }
  > {
  constructor(props) {
    super(props);
    this.state = {
      text: localStorage.getItem('writing-text') || '',
      title: localStorage.getItem('writing-title') || '',
      category: 'life',
    };
  }

  componentDidMount() {
    this.recorder = setInterval(() => {
      const savedLength = (localStorage.getItem('writing-text') && localStorage.getItem('writing-text').length) || 0
      if (Math.abs(savedLength - this.state.text.length) > 100) {
        this.save()
      }
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.recorder)
  }

  recorder: any

  clearInput = () => {
    this.setState({ text: '', title: '' });
    localStorage.removeItem('writing-title');
    localStorage.removeItem('writing-text');
  };

  save = () => {
    localStorage.setItem('writing-title', this.state.title);
    localStorage.setItem('writing-text', this.state.text);
    console.log((new Date).toLocaleString() + '，自动保存草稿成功！');
  };

  push = () => {
    if (this.state.title) {
      this.props.loading();
      sendNewArticle(this.state.title, this.state.text, '技术').then(() => {
        this.props.loading();
        alert('恭喜，发布成功！');
        this.clearInput();
      })
    } else {
      alert('请输入标题。');
    }
  };

  render() {
    return (
      <div>
        <input
          className={styles['write-title']}
          value={this.state.title}
          onChange={e => { this.setState({ title: e.target.value }) }}
        />
        <div className={styles['editor-container']}>
          <textarea
            onChange={e => { this.setState({ text: e.target.value }) }}
            className={styles['write-textarea']}
            value={this.state.text}
          />
          <Markdown source={this.state.text} className={styles['parseMarkdown']} escapeHtml={false} />
        </div>
        <div>
          <button onClick={this.push} className={styles['submitButton']}>
            发布
          </button>
          <button className={styles['submitButton']} onClick={this.clearInput}>重置</button>
        </div>
      </div>
    );
  }
}

export default Push;
