import React from 'react';
import { Button, Popconfirm, Input, Select, notification, Icon, Radio } from 'antd';
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
      category: 'life'
    };
  }

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
      this.openNotification(
        '保存草稿成功！',
        '草稿存储于您的磁盘中，当您下次访问本页时，将自动填充草稿到编辑器中。',
        <Icon type="smile" style={{ color: 'green' }} />
      );
    } else {
      this.openNotification(
        '保存草稿失败！',
        '您的浏览器可能不支持离线存储，请使用Edge、Chrome等现代浏览器体验。',
        <Icon type="frown" style={{ color: 'red' }} />
      );
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
          placeholder="标题"
          onChange={e => { this.setState({ title: e.target.value }) }}
          className={styles.primaryTitle}
        />
        <div>
          <TextArea
            onChange={e => { this.setState({ text: e.target.value }) }}
            className={styles.writeArea}
            value={this.state.text}
            placeholder="Markdown语法编辑器"
            autosize={true}
          />
          <Markdown source={this.state.text} className={styles.parseMarkdown} escapeHtml={false} />
        </div>
        <div style={{ float: 'left' }}>
          <Button type="primary" onClick={this.push} className={styles.submitButton}>
            发布
          </Button>
          {localStorage ? (
            <Button type="default" onClick={this.save} className={styles.submitButton}>
              存为草稿
            </Button>
          ) : null}
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
          <Button
            type="dashed"
            onClick={() => {
              window.open('https://www.baidu.com/s?wd=markdown语法', '_blank');
            }}
            className={styles.submitButton}
          >
            Help
          </Button>
        </div>
      </div>
    );
  }
}

export default connect()(Push);
