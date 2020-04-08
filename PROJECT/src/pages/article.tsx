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
    <div>
      <p className={ styles['article-title'] }>{ article.title }</p>
      <p className={ styles['article-timestamp'] }>
        { article.time ? (
          <>
            <span
              className={ styles['back'] }
              onClick={ () => { props.history.push('/') } }
            >RETURN</span>
            { document.querySelector(':root').getAttribute('style') ===
              '--mainColor: #f0f0f0' ? (
                <span
                  className={ styles['back'] }
                  style={ { color: 'red' } }
                  onClick={ () => {
                    removeArticle(article.title + '-' + article.time, article.sha)
                      .then(() => {
                        location.href = location.origin
                      })
                  } }
                >DELETE</span>
              ) : null }
          </>
        ) : null }
      </p>
      <Markdown
        className={ styles['article-content'] }
        source={ article.content }
        escapeHtml={ false }
      />
      <span
        className={ styles['back'] }
        onClick={ () => { props.history.push('/') } }
      >RETURN</span>
    </div>
  )
})
