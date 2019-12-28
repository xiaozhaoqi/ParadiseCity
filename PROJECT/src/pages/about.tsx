import React from 'react';
import styles from '../index.module.css';
import Markdown from 'react-markdown/with-html';
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <h3>关于作者</h3>
      <p>你好，访客。</p>
      <p>我的博客记录一些关于编程工作的灵感和想法。</p>
      <Link to="/write"><a>你可以通过留言的方式联系我。</a></Link>
    </>
  )
}
