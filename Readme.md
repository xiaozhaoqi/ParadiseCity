## 一个精巧的 GitHub Pages 博客
假如使用现代 Web 系统中的概念来描述
```
数据库：GitHub 私有仓库，以文件形式存储文章、图片等数据（个人免费使用私有仓库）；

API 服务器：GitHub v3 API，一组符合 Restful 标准的 CRUD 接口，每个 Token 每天最多拥有 5000 次免费调用；

Web 服务器：GitHub Pages，使用开放仓库（即本仓库）的 docs 目录托管静态网页，其他文件为网页源代码，使用 Webpack 将单页应用的源代码构建到 docs 目录中；
```
数据交换过程
```
1. 用户访问 https://paradise-city.club
2. 用户与网页交互，向 API 服务器查询/新增/删除文章
3. API 服务器从私有仓库获取/修改/删除数据，将处理结果以 JSON 格式返回给网页
4. 网页控制路由和渲染数据
```
开发日志
+ 性能：
  + 国内访问 GitHub 实际是访问微软在韩国的 CDN 服务器，访问博客需要下载 Webpack 构建文件总体积超过 120kb，目前已经将 react/react-dom/react-router-dom 三个包通过国内 bootcss 的免费 CDN 服务进行加载，其余构建文件总体积缩小到了 60kb
