// import Link from 'umi/link';
import { Button, Card, WingBlank, WhiteSpace, ImagePicker, Toast } from 'antd-mobile';
import styles from '../index.css';
import { connect } from 'dva';
import React from 'react';
import WxImageViewer from 'react-wx-images-viewer';

class PhotoList extends React.Component<{
    isSuccessSubmit: boolean;
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
        }
        this.props.dispatch({
            type: 'global/changeSubmitState',
            payload: false
        })
    }

    onChange = (files, type, index) => {
        if (type === 'add') {
            this.props.dispatch({
                type: 'global/sendNewPhoto',
                payload: files[files.length - 1].url
            })
        }
        else {
            Toast.info(type + '功能未完成', 2)
        }
        // todo: remove
    }
    handleSelectFail = (msg) => {
        console.log(msg)
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading.global,
        photoFiles: state.global.photoFiles,
        isSuccessSubmit: state.global.isSuccessSubmit
    };
}

export default connect(mapStateToProps)(PhotoList);