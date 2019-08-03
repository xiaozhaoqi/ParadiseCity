const Markdown = require('react-markdown/with-html');
export default () => {
  return <Markdown
    source={`
  我的博客所有功能完全由自己从零开始实现，托管在Github Pages，和Hexo等静态博客框架相比，生成文章和管理文章的方式不同。  
  使用Hexo编辑文章，需要在本地编辑器写好Markdown文件，编译成静态HTML，然后在Git提交，最后推送到静态资源服务器。  
  这种方式依赖命令行，其实可以看作每次发布文章，都要重复一次“部署”。  
  其实不必部署，也不需要服务端，文件系统就可以满足，把文章和图片当做文件资源，用Git管理就可以了。  
  利用Github v3 API，可以实现自动化的向任意仓库（即文件系统）提交任意文件。  
  `}
    escapeHtml={false}
  />;
};
// TODO: 学习笔记模块，源码解读，读书笔记，printf520.com聚合接口，排查问题记录等等
