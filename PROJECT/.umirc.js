
// ref: https://umijs.org/config/
export default {
  exportStatic: true,
  outputPath: '../',
  targets: {
    ie: 9,
    chrome: 49, 
    android: 6,
    ios: 8
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'IO',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: true,
    }],
  ],
}
