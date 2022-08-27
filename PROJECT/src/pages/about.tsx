import styles from '../index.module.css'

export default () => {
  const img = document.createElement('img')
  img.src =
    'https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/'
  img.onload = () => {
    const load = document.querySelector('.load-counter')
    load && load.classList.remove('load-counter')
    load && load.appendChild(img)
  }
  return (
    <div className={ styles['about-container'] }>
      <h4>访客们的情况（利用flagcounter记录来访信息）</h4>
      <div className='load-counter' style={ { marginTop: '10px' } }></div>
      <h4>为什么不用互联网平台记录</h4>
      <p>通过robots.txt，本站拒绝善意的爬虫和搜索引擎脚本抓取数据或记录快照，因此这里的内容一般不会被人搜到。</p>
      <p>对数据而言磁盘和局域网是最可靠的，现在采用微软GitHub和腾讯云存储是增加一些风险换取便利性，会定时通过Git将文字备份到磁盘。</p>
      <h4>本站依赖哪些资源</h4>
      <p>依赖GitHub的私有仓库和托管功能，客户端使用GitHub Restful API与私有仓库通信，如提交内容或获取内容。</p>
      <h4>为什么不是Hexo</h4>
      <p>因为Hexo依赖Git和命令行脚本，不够自动化。本站将Markdown内容生成HTML页面的工作交给React来完成。</p>
      <h4>全站主题色（现已支持自定义字体）</h4>
      <p>点击导航栏最左侧的emoji表情，使用系统配色板选择一个主题色，将应用到全站各个界面。</p>
    </div>
  )
}
