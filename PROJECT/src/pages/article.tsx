// @ts-nocheck
import styles from '../index.module.css'
import Markdown from 'react-markdown/with-html'
import { removeArticle } from '../utils/request'

const { withRouter } = ReactRouterDOM

export default withRouter((props) => {
  const article = window.PARADISE_history.location.state || props.article
  if (!document.location.hash) {
    props.history.push('/')
  }
  return (
    <>
      <span
        className={ styles['back'] }
        onClick={ () => { props.history.push('/') } }
      >返回</span>
      <span
        className={ styles['back'] }
        onClick={ () => { props.history.push('/write', { article: article, isEdit: true }) } }
      >编辑</span>
      <span
        className={ styles['back'] }
        style={ { color: 'red' } }
        onClick={ () => {
          removeArticle(article)
            .then(() => {
              location.href = location.origin
            })
            .catch(() => { })
        } }
      >删除</span>
      <div className={ styles['article-container'] }>
        <p className={ styles['article-title'] }>{ article.title }</p>
        <p className={ styles['article-props'] }>
          <span>{ article.catagory || '技术' }</span>
          { article.time && <span>{ article.author || 'zhaoqi.xiao' } 最后编辑于 { (new Date(article.time)).toLocaleDateString() }</span> }
          { article.content && <span>预计阅读时间 { (article.content.length / 200 + 1).toFixed(0) } 分钟</span> }
        </p>
        <Markdown
          className={ styles['article-content'] }
          source={ article.content }
          escapeHtml={ false }
        />
      </div>
    </>
  )
})
