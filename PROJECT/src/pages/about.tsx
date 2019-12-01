import React from 'react';
import Markdown from 'react-markdown/with-html';
export default () => {
  return <Markdown
    source={ `
<span title="Gun N' Rose乐队的一首音乐，描述了一个独处的快乐的世界">Paradise City</span> 
站点托管在Github Pages，是一套伪动态的博客系统。  
+ 本站把任何文章、照片、评论都认为是文件资源，通过GitHub API(v3)上传到仓库，再编写一套Web GUI将用户指令转化为对这些文件资源的操作。  

本站动态的部分借用了GitHub的一些功能，与正统的Web系统做个类比：
+ GitHub Repo  &ensp;&ensp;       --> &ensp;  NoSQL数据库  
+ GitHub Pages &ensp;             --> &ensp;  Nginx Web服务  
+ GitHub API   &ensp;&ensp;&ensp; --> &ensp;  服务端程序  

因此，本站没有真正的服务端程序，只是借助GitHub实现了静态博客的动态化。
`}
    escapeHtml={ false }
  />;
};
