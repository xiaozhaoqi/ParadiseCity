const Markdown = require('react-markdown/with-html');
export default () => {
  return <Markdown
    source={`
## 0x00 站点原理  
我的博客目前托管在Github Pages，和著名的Hexo等静态博客框架相比，改进了生成和管理文章的方式：  
+ Hexo搭建的博客需要在本地编辑器写好Markdown文章，使用脚本命令编译生成HTML，然后在Git提交所有静态文件，最后推送到托管服务器。  
+ 本站是把任何静态资源都当做文件，如文章、照片、评论，通过GitHub API(v3)上传到仓库文件系统。同时编写了一套图形用户界面，即使不熟悉具体技术细节也可以实现自动化的向本站（即文件系统）发布内容。  

看起来像是个人版的博客园、简书等创作平台，只是这里动态的部分由GitHub负担，类比来看：
+ GitHub Repo --> NoSQL数据库  
+ GitHub Pages --> Nginx Web服务  
+ GitHub API --> 服务端程序  
+ 我只是写了整个系统中的客户端，以及如何与GitHub连接。  

## 0x01 个人简介  
+ 1996年出生在北京最西部一个宗教特色的小镇，并读过三所小学、一所初中、一所高中。  
+ 2014年考入北京工业大学计算机科学与技术专业，进行了四年的专业学习。  
+ 2018年毕业后即参加工作，所在民营企业属于互联网/房产/金融领域，从事Web前端开发工作。  
`}
    escapeHtml={false}
  />;
};
// TODO: 个人简介 -> CSS编写的可交互大事件记录
