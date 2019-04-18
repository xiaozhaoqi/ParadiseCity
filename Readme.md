### 主要技术栈
+ 语言：TypeScript, ES7.
+ 视图：React, antd, antd-mobile.
+ 路由：umi/react-router.
+ 数据流：dva/redux, reducers, saga/effects.
+ 服务：GitHub V3 RESTful API.
+ 工程化：dva/roadhog/webpack, tslint, prettier, ts-jest, husky.
---
### 开发流程
+ 在 /PROJECT 目录下写代码；
+ 构建输出资源到 /docs 目录；
+ GitHub静态服务器将以 /docs 作为根目录，启动Pages服务。
---
### 使用流程
+ web/mobile 提交留言/照片；
+ 容器组件 dispatch(action,payload) 到 model；
+ model 处理编码并请求 GitHub API 创建内容到 /files/article 或 photo。