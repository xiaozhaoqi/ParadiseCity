import React from 'react';
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <h3>关于作者</h3>
      <p>你好，访客。</p>
      <p>为了避免遗忘，我搭建了这个博客用来记录一切。</p>
      <Link to="/write"><a>你可以通过留言的方式联系我。</a></Link>
      <p></p>
      <img width="200px" src="https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/" alt="" />
    </>
  )
}
