import React from 'react';
import { Button, Popconfirm, Input, Select, notification, Icon, message } from 'antd';
import { connect } from 'dva';
const Markdown = require('react-markdown/with-html');
const styles = require('./index.css');
const InputGroup = Input.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class Push extends React.Component<
  {
    dispatch: any;
    loading: any;
  },
  {
    text: string;
    title: string;
    category: string;
  }
  > {
  constructor(props) {
    super(props);
    let title;
    let text;
    if (localStorage) {
      title = localStorage.getItem('writing-title');
      text = localStorage.getItem('writing-text');
    }
    this.state = {
      text: text || '',
      title: title || '',
      category: 'life',
    };
  }

  componentDidMount() {
    if (localStorage) {
      this.recorder = setInterval(() => {
        if (Math.abs(localStorage.getItem('writing-text').length - this.state.text.length) > 100) {
          this.save()
        }
      }, 30000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.recorder)
  }

  recorder: any

  openNotification = (message, description, icon) => {
    notification.open({
      message,
      description,
      icon,
    });
  };

  clearInput = () => {
    this.setState({ text: '', title: '' });
    if (localStorage) {
      localStorage.removeItem('writing-title');
      localStorage.removeItem('writing-text');
    }
  };

  save = () => {
    if (localStorage) {
      localStorage.setItem('writing-title', this.state.title);
      localStorage.setItem('writing-text', this.state.text);
      message.info((new Date).toLocaleString() + '，自动保存草稿成功！', 5);
    }
  };

  push = () => {
    if (this.state.title) {
      this.props.dispatch({
        type: 'global/sendNewArticle',
        payload: {
          title: this.state.title,
          content: this.state.text,
          category: this.state.category
        },
      });
      this.openNotification(
        '发布中……',
        '您的留言正在写入GitHub静态文件服务器，稍后将在留言卡片中展示。',
        <Icon type="smile" style={{ color: 'green' }} />
      );
      this.clearInput();
    } else {
      this.openNotification(
        '现在还不能发布',
        '请输入标题。',
        <Icon type="frown" style={{ color: 'red' }} />
      );
    }
  };

  render() {
    return (
      <div>
        <Button
          type={this.state.category === 'life' ? "primary" : "dashed"}
          size="small"
          style={{ margin: '0 10px 10px 0', borderRadius: '5px' }}
          onClick={() => { this.setState({ category: 'life' }) }}
        >生活</Button>
        <Button
          type={this.state.category === 'tech' ? "primary" : "dashed"}
          size="small"
          style={{ borderRadius: '5px' }}
          onClick={() => { this.setState({ category: 'tech' }) }}
        >技术</Button>
        <Input
          value={this.state.title}
          placeholder="题目"
          onChange={e => { this.setState({ title: e.target.value }) }}
          className={styles.primaryTitle}
        />
        <div className={styles['editor-container']}>
          <TextArea
            onChange={e => { this.setState({ text: e.target.value }) }}
            className={styles.writeArea}
            value={this.state.text}
            placeholder="正文"
          />
          <Markdown source={this.state.text} className={styles.parseMarkdown} escapeHtml={false} />
        </div>
        <div>
          <Button type="primary" onClick={this.push} className={styles.submitButton}>
            发布
          </Button>
          <Popconfirm
            title="确定清除正在编辑的内容，并清空草稿箱？"
            onConfirm={this.clearInput}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger" className={styles.submitButton}>
              重置
            </Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default connect()(Push);
