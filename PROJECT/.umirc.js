// ref: https://umijs.org/config/
export default {
  // 当服务器不能配置返回单页面的时候，在构建时为每个路由页面输出一个初始index.html，使之重定向
  exportStatic: true,
  // 由于browser路由的单页面在github page中导航时不能找到子路由的静态文件，这里只能使用history路由
  history: 'hash',
  // 每次构建时将生产资源输出到根目录docs文件夹内，只有命名为docs才能被github page找到并启动服务
  outputPath: '../docs/',
  // 静态资源位置，位于/docs/...，与index.html在同级目录下
  publicPath: './',
  // 非根目录部署的时候（生产资源放到根目录太乱了），设置react-router的根路径，比如将应用部署在/SweetChild目录下。
  base: '/SweetChild/',
  // 兼容性，umi在构建的时候会做好所有事情
  targets: {
    ie: 9,
    chrome: 49,
    android: 6,
    ios: 8,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        // Todo: 下一版使用按需引入模块
        dynamicImport: true,
        // vendor单独打包
        dll: true,
        // pwa需要配置service-worker，现在还没学到这里。
        // 目前安卓只有chrome能主动触发pwa，小米浏览器要手动设置才能添加到主屏。
        pwa: false,
        routes: {
          exclude: [],
        },
        // 构建加速用的，暂时用不到。
        hardSource: false,
      },
    ],
  ],
};
