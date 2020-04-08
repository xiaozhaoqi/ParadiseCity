// @ts-nocheck
import styles from '../index.module.css'
import { getArticle } from '../utils/request'

export default (props) => (
  props.articleList.map((item) => (
    <p
      className={ styles['title'] }
      key={ item.name }
      onClick={ () => {
        props.loading()
        getArticle(item.name).then((v) => {
          if (v) {
            window.PARADISE_history.push('/article', {
              title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
              content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
              time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
              category: JSON.parse(decodeURIComponent(escape(atob(v.content)))).category,
              sha: v.sha,
            })
            document.location.hash = v.sha
          }
        }).finally(() => { props.loading() })
      } }
    >
      { item.name.slice(0, item.date === '0000/00/00' ? -3 : -17) }
    </p>
  ))
)
