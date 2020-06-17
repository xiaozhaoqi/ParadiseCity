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
      <h4>访客们的情况</h4>
      <div className='load-counter' style={ { marginTop: '10px' } }></div>
      <h4>依赖哪些资源</h4>
      <p>依赖GitHub的私有仓库和托管功能，客户端使用GitHub Restful API与私有仓库通信，如提交内容或获取内容。</p>
      <h4>为什么不是Hexo</h4>
      <p>因为Hexo依赖Git和命令行脚本，不够自动化。本站将Markdown内容生成HTML页面的工作交给React来完成。</p>
      <h4>全站主题色</h4>
      <p>点击导航栏最左侧的emoji表情，使用系统配色板选择一个主题色，将应用到全站各个界面。</p>
      <h4>关于爬虫、网络快照和搜索引擎收录</h4>
      <p>通过robots.txt，本站拒绝善意的爬虫和搜索引擎脚本抓取数据或记录快照，因此网站内容一般不会暴露在互联网上。</p>
      <p>记录内容仅供作者回顾或偶然来到这里的访客们参考。</p>
      <h4>作者的邮箱</h4>
      <p>Email: zhaoqi.xiao@qq.com</p>
    </div>
  )
}
