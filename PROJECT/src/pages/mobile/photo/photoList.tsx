// import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace, ImagePicker, Toast, Icon } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
import WxImageViewer from 'react-wx-images-viewer';

class PhotoList extends React.Component<{
  isSuccessSubmit: boolean;
  isSuccessRemove: boolean;
  loading: boolean;
  photoFiles: any;
  dispatch: any;
}, {
    url: any;
    isPreviewPhoto: boolean;
  }>{
  constructor(props) {
    super(props);
    if (!/Android|webOS|iPhone|iPad|BlackBerry|SymbianOS|IEMobile/i.test(navigator.userAgent)) {
      window.location.pathname = "/pc";
    }
    props.dispatch({
      type: 'global/getCurrentPhotoList'
    })
    this.state = {
      url: [],
      isPreviewPhoto: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccessSubmit) {
      Toast.success('上传成功', 2);
      this.props.dispatch({
        type: 'global/getCurrentPhotoList',
      })
      this.props.dispatch({
        type: 'global/changeSubmitState',
        payload: false
      })
    }
    if (nextProps.isSuccessRemove) {
      Toast.success('移除成功', 2);
      this.props.dispatch({
        type: 'global/getCurrentPhotoList',
      })
      this.props.dispatch({
        type: 'global/changeRemoveState',
        payload: false
      })
    }
  }

  onChange = (files, type, index) => {
    if (type === 'add') {
      if (files[files.length - 1].url.length > 1000000) {
        Toast.fail('超过1MB无法上传', 2);
        return 0;
      }
      this.props.dispatch({
        type: 'global/sendNewPhoto',
        payload: {
          title: Date.now(),
          content: files[files.length - 1].url
        }
      })
    }
    if (type === 'remove') {
      // 点击 × 返回的files数组表示的是移除当前图片后的结果集
      // files与store中的图片对象集合photoFiles匹配，差值为当前移除的对象
      // match匹配集合：默认值为false，当photoFiles中的对象在files中找到时，标记为true
      let match = new Array(this.props.photoFiles.length).fill(false);
      for (let i = 0; i < this.props.photoFiles.length; i++) {
        for (let j = 0; j < files.length; j++) {
          if (this.props.photoFiles[i].title === files[j].title) {
            match[i] = true;
          }
        }
      }
      // 标记位为false的项是当前移除的对象
      this.props.dispatch({
        type: 'global/removePhoto',
        payload: this.props.photoFiles[match.indexOf(false)].title
      })
    }
  }
  handleSelectFail = (msg) => {
    Toast.fail(msg, 2)
  }

  handleClickPhoto = (index, fs) => {
    this.setState({
      url: [fs[index].url],
      isPreviewPhoto: true
    })
  }
  onClose = () => {
    this.setState({
      isPreviewPhoto: false
    })
  }
  render() {

    return (
      <div>
        <ImagePicker
          files={this.props.photoFiles}
          onChange={this.onChange}
          onImageClick={this.handleClickPhoto}
          selectable={true}
          multiple={false}
          onFail={this.handleSelectFail}
          length={4}
        />
        {
          this.state.isPreviewPhoto ? <WxImageViewer urls={this.state.url} onClose={this.onClose} /> : null
        }
        {
          this.props.loading ? <Icon type="loading" size="lg" style={{ position: 'relative', top: '150px', left: '45%' }} /> : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.global,
    photoFiles: state.global.photoFiles,
    isSuccessSubmit: state.global.isSuccessSubmit,
    isSuccessRemove: state.global.isSuccessRemove
  };
}

export default connect(mapStateToProps)(PhotoList);