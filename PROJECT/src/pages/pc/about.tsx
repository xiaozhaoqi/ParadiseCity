const Markdown = require('react-markdown/with-html');
export default () => {
  return <Markdown
    source={`
<span title="Gun N' Rose乐队的一首音乐，描述了一个令独处的人也能感到快乐的世界">Paradise City</span> 
站点托管在Github Pages，是一套伪动态的博客系统，和著名的Hexo静态博客框架相比：  
+ Hexo搭建的博客需要在本地编辑Markdown文章，使用脚本命令转化为HTML，再将静态资源提交并推送到托管服务器，由自定义主题的GUI框架处理交互体验；  
+ 本站把任何文章、照片、评论都认为是文件资源，通过GitHub API(v3)上传到仓库，再编写一套Web GUI将用户指令转化为对这些文件资源的操作，实现写作所见即所得、发布流程自动化、浏览体验定制化。  

本站动态的部分借用了GitHub的一些功能，与正统的Web系统做个类比：
+ GitHub Repo  &ensp;&ensp;       --> &ensp;  NoSQL数据库  
+ GitHub Pages &ensp;             --> &ensp;  Nginx Web服务  
+ GitHub API   &ensp;&ensp;&ensp; --> &ensp;  服务端程序  

无论如何，本站没有真正的服务端程序，只是借助GitHub实现了静态博客的动态化。
`}
    escapeHtml={false}
  />;
};
