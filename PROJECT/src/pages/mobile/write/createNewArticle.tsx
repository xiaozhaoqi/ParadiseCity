
import React from 'react';
import { Button, InputItem, TextareaItem } from 'antd-mobile';
import Link from 'umi/link';
import styles from '../index.css';
// import fetch from 'dva/fetch';

export default class Push extends React.Component<
    {
        dispatch: any;
    },
    {
        title: string;
        content: string;
    }> {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }
    handleTitleChange(e) {
        this.setState({
            title: e
        })
    }
    handleContentChange(e) {
        this.setState({
            content: e
        })
    }
    push() {
        const leftToken = 'd6920daff4658f60146';
        const rightToken = 'dac245849a4be1a5f5072';
        fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1/' + Math.random() + '.md?access_token=' + leftToken + rightToken, {
            method: 'PUT',
            body: JSON.stringify({
                message: 'AutoPush Article: '+ this.state.title,
                // @ts-ignore
                content: btoa(unescape(encodeURIComponent((JSON.stringify({
                    title: this.state.title,
                    content: this.state.content,
                    time: Date.now()
                })))))
            })
        }).then(res => res.json()).then((res) => {
            console.log(res);
            alert('发布成功')
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <InputItem
                    clear
                    placeholder="输入标题"
                    onChange={this.handleTitleChange.bind(this)}
                />
                <TextareaItem
                    rows={5}
                    count={200}
                    placeholder='输入内容'
                    onChange={this.handleContentChange.bind(this)}
                />
                <div style={{display:'flex'}}>
                    <div className={styles.btn} onClick={this.push.bind(this)}>发布</div>
                    <Link to='/' className={styles.btn}>返回</Link>
                </div>
                
            </div>
        )
    }
};