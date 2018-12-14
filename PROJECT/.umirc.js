// ref: https://umijs.org/config/
export default {
  exportStatic: true,
  // history: 'hash',
  outputPath: '../docs/',
  publicPath: './',
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
        dynamicImport: true,
        title: 'IO',
        dll: true,
        pwa: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
};
