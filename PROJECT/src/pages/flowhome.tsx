// @ts-nocheck
import styles from '../index.module.css'
import { getArticle } from '../utils/request'
import Markdown from 'react-markdown/with-html'

const colors = [
  '#123456',
  '#234567',
  '#345678',
  '#456789',
  '#567890'
]
const { withRouter } = ReactRouterDOM

export default withRouter((props) => {
  const [cardList, setCardList] = React.useState([])
  const [catagory, setCatagory] = React.useState('')
  const [index, setIndex] = React.useState(0)
  const [y, setY] = React.useState(0)
  React.useEffect(() => {
    if (window.PARADISE_lastest_catagory) {
      setCatagory(window.PARADISE_lastest_catagory)
    } else {
      if (props.articleList[0]) {
        setCatagory(props.articleList[0].catagory)
      }
    }
    if (cardList.length < props.articleList.length) {
      props.articleList.slice(cardList.length, Math.min(cardList.length + 10, props.articleList.length)).forEach(item => {
        getArticle(item.name).then((v) => {
          if (v) {
            let content = JSON.parse(decodeURIComponent(escape(atob(v.content)))).content
            let time = JSON.parse(decodeURIComponent(escape(atob(v.content)))).time
            let imgs = []
            for (let c of content.matchAll(/\!\[.*\]\((.*)\)/g)) {
              if (c[1]) {
                imgs.push(c[1])
              }
            }
            let summary = content.replace(/[\#\+\-\`]|\s*[#+]*<[^>]*>|<\/[^>]*>|\!\[.*\]\(.*\)/g, '').slice(0, 63)
            setCardList(arr => {
              let list = [...arr, { ...item, time, content, summary, imgs }].sort((a, b) => (a.sort > b.sort ? 1 : -1))
              const m = new Map();
              list = list.filter((item) => !m.has(item['sort']) && m.set(item['sort'], 1));
              let flowList1 = []
              let flowList2 = []
              for (let i = 0; i < list.length; i++) {
                if (i % 2 === 0) {
                  flowList1.push(list[i])
                } else {
                  flowList2.push(list[i])
                }
              }
              return [...flowList1, ...flowList2]
            })
            window.scrollTo(0, y)
          }
        })
      })
    }
  }, [props.articleList, index])
  return (
    <div className={ styles['flow-container'] }>
      { cardList.length < props.articleList.length ? <a className={ styles['back-v2ex'] } style={ { bottom: '-40px' } } onClick={ () => {
        setY(window.scrollY)
        setIndex(i => i + 1)
      } }>
        再看 10 条
      </a> : null }
      {/* <a className={ styles['back-v2ex'] } onClick={ () => {
        props.history.push('/ParadiseCity/way2explore')
      } }>
        归档
      </a> */}
      {
        cardList.map((item) => (
          <p
            className={ styles['flow-card'] }
            key={ item.name }
            onClick={ () => {
              getArticle(item.name).then((v) => {
                if (v) {
                  window.PARADISE_lastest_catagory = catagory
                  window.PARADISE_history.push('/ParadiseCity/article', {
                    title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
                    content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
                    time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
                    catagory: JSON.parse(decodeURIComponent(escape(atob(v.content)))).catagory,
                    author: JSON.parse(decodeURIComponent(escape(atob(v.content)))).author,
                    sha: v.sha,
                  })
                  document.location.hash = v.sha
                }
              })
            } }
          >
            {
              item.imgs && item.imgs.length ?
                item.imgs.map(src => {
                  return <img src={ src } />
                }) : null
            }
            <div className={ styles['detail'] }>
              <p className={ styles['title-name'] }>{ item.name.slice(0, -3).split('-')[0] }</p>
              <p style={ { margin: '3px 0' } }>{ item.summary }...</p>
              <div>
                <span className={ styles['title-props'] + ' ' + styles['title-props-catagory'] }>{ item.catagory }</span>
                { item.author ? <span className={ styles['title-props'] }>{ item.author }</span> : null }
                <span className={ styles['title-props'] }>{ item.date }</span>
              </div>
            </div>
          </p>
        ))
      }
    </div >
  )
})
