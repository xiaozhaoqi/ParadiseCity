const Markdown = require('react-markdown/with-html');
export default () => {
  return <Markdown
    source={`
## 0x00 站点介绍  
本站托管在Github Pages，和著名的Hexo静态博客框架相比，我改进了生成和管理文章的方式：
Hexo搭建的博客需要在本地编辑Markdown文章，使用脚本命令生成HTML，再利用Git将静态博客提交并推送到托管服务器。
本站把任何文章、照片、评论都当做文件，通过GitHub API(v3)上传到仓库文件系统。
再为这些文件编写一套Web GUI，即使不熟悉具体技术细节也可以实现自动化的向本站（即文件系统）发布内容。  

类比博客园、简书等写作平台，本站动态的部分借用了GitHub的各个概念，做个比较：
+ GitHub Repo --> NoSQL数据库  
+ GitHub Pages --> Nginx Web服务  
+ GitHub API --> 服务端程序  

我只是写了客户端的部分，以及如何与GitHub连接  

## 0x01 个人介绍  
+ 1996年出生于北京市门头沟区  
+ 2002年开始依次读了三所小学、一所初中、一所高中  
+ 2014年在北京工业大学的计算机学院学习，业余学过Qt桌面客户端开发、Flask网站开发等等  
+ 2017年参加实习，开始接触JavaScript，并挖掘兴趣方向  
+ 2018年本科毕业后参加工作，岗位是Web开发工程师  
+ 2019年......
`}
    escapeHtml={false}
  />;
};
