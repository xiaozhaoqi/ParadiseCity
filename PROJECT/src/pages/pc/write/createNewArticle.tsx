
import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
// import fetch from 'dva/fetch';

export default class Push extends React.Component<{
    dispatch: any
},{
    text: string
}> {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
    }
    handleText(e){
        this.setState({
            text: e.target.value
        })
    }
    push() {
        fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1/'+ Math.random() +'.md?access_token=15ee6307bfd0967e2f4e13b49c004ff11abfdf86', {
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
                <textarea onChange={this.handleText.bind(this)}></textarea>
            </div>
        )
    }
};