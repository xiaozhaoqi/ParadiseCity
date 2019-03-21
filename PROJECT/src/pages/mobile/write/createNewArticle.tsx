import React from 'react';
import { InputItem, TextareaItem, WingBlank, WhiteSpace, Toast, Icon, Button } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
const Markdown = require('react-markdown/with-html');
class CreateNewArticle extends React.Component<
  {
    dispatch: any;
    loading: boolean;
    isSuccessSubmit: boolean;
  },
  {
    title: string;
    content: string;
    isPreview: boolean;
    rightBtn: Array<string>;
  }
  > {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      isPreview: false,
      rightBtn: ['预览', '编辑']
    };
  }
  handleTitleChange(e) {
    if (e.length > 20) {
      Toast.info('标题过长', 1);
    }
    this.setState({
      title: e,
    });
  }
  handleContentChange(e) {
    this.setState({
      content: e,
    });
  }
  push() {
    if (!this.state.title) {
      Toast.info('你不写标题怎么行！', 1);
      return 0;
    }
    if (this.state.title.length > 20) {
      Toast.info('标题过长', 1);
      return 0;
    }
    if (!this.state.content) {
      Toast.info('你不写内容怎么行！', 1);
      return 0;
    }
    this.props.dispatch({
      type: 'global/sendNewArticle',
      payload: {
        title: this.state.title,
        content: this.state.content,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccessSubmit) {
      Toast.success('发布成功', 2);
      this.props.dispatch({
        type: 'global/changeSubmitState',
        payload: false,
      });
    }
  }
  render() {
    return (
      <div>
        <WingBlank size="md">
          <WhiteSpace size="lg" />
          <InputItem clear placeholder="输入标题" onChange={this.handleTitleChange.bind(this)} />
          {
            this.state.isPreview
              ?
              <Markdown source={this.state.content} escapeHtml={false} />
              :
              <TextareaItem
                clear
                rows={15}
                count={65535}
                placeholder="输入内容"
                value={this.state.content}
                onChange={this.handleContentChange.bind(this)}
              />
          }
          <div style={{ display: 'flex', position: 'absolute', bottom: '1vh', width: '100%', justifyContent: 'center' }}>
            <Button
              type="primary"
              size="small"
              style={{ width: '30%', marginRight: '5px' }}
              onClick={this.push.bind(this)}
            >发布</Button>
            <Button
              size="small"
              style={{ width: '30%' }}
              onClick={() => {
                this.setState({ isPreview: !this.state.isPreview, rightBtn: this.state.rightBtn.reverse() })
              }}
            >{this.state.rightBtn[0]}</Button>
          </div>
          <WhiteSpace size="lg" />
        </WingBlank>
        {this.props.loading ? (
          <Icon
            type="loading"
            size="lg"
            style={{ position: 'relative', bottom: '150px', left: '45%' }}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    isSuccessSubmit: state.global.isSuccessSubmit,
  };
}

export default connect(mapStateToProps)(CreateNewArticle);
