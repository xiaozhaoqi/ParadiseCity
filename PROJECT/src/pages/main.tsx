// @ts-nocheck
import styles from '../index.module.css'
import { getArticle } from '../utils/request'
import User from '../images/user.png'

export default (props) => {
  const [catagory, setCatagory] = React.useState('')
  React.useEffect(() => {
    if (props.articleList[0]) {
      setCatagory(props.articleList[0].catagory)
    }
  }, [props.articleList])
  return (
    <div className={ styles['main-container'] }>
      <div className={ styles['catagory'] }>
        {
          props.articleList.map((item) => {
            return item.catagory || '技术'
          }).filter((v, i, arr) => arr.indexOf(v, 0) === i).reverse().map((item, index, list) => (
            <a
              onClick={ (e) => { setCatagory(e.target.innerText) } }
              className={ catagory === item ? styles['catagory-item-active'] : styles['catagory-item'] }
            >{ item }</a>
          ))
        }
      </div>
      {
        props.articleList.filter(v => v.catagory === catagory).map((item) => (
          <p
            className={ styles['title'] }
            key={ item.name }
            onClick={ () => {
              getArticle(item.name).then((v) => {
                if (v) {
                  window.PARADISE_history.push('/article', {
                    title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
                    content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
                    time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
                    catagory: JSON.parse(decodeURIComponent(escape(atob(v.content)))).catagory,
                    sha: v.sha,
                  })
                  document.location.hash = v.sha
                }
              })
            } }
          >
            <img src={ User } alt="" className={ styles['title-user'] } />
            <p className={ styles['title-name'] }>{ item.name.slice(0, item.date === '0000/00/00' ? -3 : -17).split('-')[0] }</p>
            <span className={ styles['title-props'] }>{ item.date }</span>
            <span className={ styles['title-props'] }>{ item.size + '字节' }</span>
          </p>
        ))
      }
    </div >
  )
}
