import React from 'react';
import { Button, Popconfirm, Input, Select } from 'antd';
import classnames from 'classnames';
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
    keyWord: string;
    selectValue: string;
    isNullTitle: boolean;
    isNullText: boolean;
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
      selectValue: '分类一',
      keyWord: '',
      isNullTitle: false,
      isNullText: false,
    };

  }
  handleKeyWord = (e) => {
    this.setState({
      keyWord: e.target.value
    });
  }

  handleText = (e) => {
    this.setState({
      text: e.target.value,
      isNullText: e.target.value ? false : true
    });
  }

  handleTitle = (e) => {
    this.setState({
      title: e.target.value,
      isNullTitle: e.target.value ? false : true
    })
  }

  handleSelect = (value) => {
    this.setState({
      selectValue: value
    })
  }

  save = () => {
    if (localStorage) {
      localStorage.setItem('writing-title', this.state.title);
      localStorage.setItem('writing-text', this.state.text);
    }
  }

  push = () => {
    if (this.state.title && this.state.text) {
      console.log(this.state.text, this.state.title, this.state.keyWord, this.state.selectValue);
      this.props.dispatch({
        type: 'global/sendNewArticle',
        payload: {
          title: this.state.title,
          content: this.state.text
        }
      })
    } else {
      if (!this.state.title) {
        window.scrollTo({ top: 0 });
        this.setState({
          isNullTitle: true
        })
      }
      if (!this.state.text) {
        window.scrollTo({ top: 0 });
        this.setState({
          isNullText: true
        })
      }
    }
  }

  render() {
    return (
      <div>
        <Select
          defaultValue="分类一"
          style={{ float: 'left', margin: '0 10px 10px 0' }}
          onSelect={this.handleSelect}
        >
          <Option value="分类一">分类一</Option>
          <Option value="分类二">分类二</Option>
        </Select>
        <Input
          placeholder="关键字（；或 ; 分隔）"
          style={{ width: '300px', float: 'left', borderRadius: '5px' }}
          onChange={this.handleKeyWord}
        />
        <Input
          value={this.state.title}
          placeholder="标题"
          onChange={this.handleTitle}
          className={this.state.isNullTitle ? styles.dangerTitle : styles.primaryTitle}
        />
        <div>
          <TextArea
            onChange={this.handleText}
            className={this.state.isNullText ? styles.dangerWriteArea : styles.writeArea}
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
          {
            localStorage ?
              <Button type="default" onClick={this.save} className={styles.submitButton}>
                存为草稿
            </Button>
              : null
          }
          <Popconfirm
            title="确定清除正在编辑的内容，并清空草稿箱？"
            onConfirm={() => {
              this.setState({ text: '', title: '' });
              if (localStorage) {
                localStorage.removeItem('writing-title');
                localStorage.removeItem('writing-text');
              }
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
      </div>
    );
  }
}

export default connect()(Push);
