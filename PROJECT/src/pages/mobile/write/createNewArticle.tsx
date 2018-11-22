
import React from 'react';
import { Button, InputItem, TextareaItem } from 'antd-mobile';
import Link from 'umi/link';
// import fetch from 'dva/fetch';

export default class Push extends React.Component<{
    dispatch: any;
}, {
        text: string
    }> {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    handleText(e) {
        this.setState({
            text: e.target.value
        })
    }
    push() {
        const leftToken = 'd6920daff4658f60146';
        const rightToken = 'dac245849a4be1a5f5072';
        fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1/' + Math.random() + '.md?access_token=' + leftToken + rightToken, {
            method: 'PUT',
            body: JSON.stringify({
                message: 'this is an AutoPush article',
                content: btoa(this.state.text)
            })
        }).then(res => res.json()).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.push.bind(this)}>发布</Button>
                <Link to='/'>返回</Link>
                <InputItem
                    clear
                    placeholder="输入标题"
                >标题</InputItem>
                <TextareaItem
                    rows={5}
                    count={200}
                    placeholder='输入内容'
                />
                <textarea onChange={this.handleText.bind(this)}></textarea>
            </div>
        )
    }
};