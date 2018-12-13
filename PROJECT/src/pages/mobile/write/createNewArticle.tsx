import React from 'react';
import { InputItem, TextareaItem, WingBlank, WhiteSpace, Toast, Icon } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';

class CreateNewArticle extends React.Component<
  {
    dispatch: any;
    loading: boolean;
    isSuccessSubmit: boolean;
  },
  {
    title: string;
    content: string;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
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
          <TextareaItem
            clear
            rows={10}
            count={200}
            placeholder="输入内容"
            onChange={this.handleContentChange.bind(this)}
          />
          <div className={styles.bottomBtn} onClick={this.push.bind(this)}>
            发布
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
