// @ts-nocheck
import styles from '../index.module.css'
const colors = [
  '#123456',
  '#234567',
  '#345678',
  '#456789',
  '#567890'
]
const { withRouter } = ReactRouterDOM

export default withRouter((props) => {
  const [catagory, setCatagory] = React.useState('')
  React.useEffect(() => {
    if (window.PARADISE_lastest_catagory) {
      setCatagory(window.PARADISE_lastest_catagory)
    } else {
      if (props.articleList[0]) {
        setCatagory(props.articleList[0].catagory)
      }
    }
  }, [props.articleList])
  return (
    <div className={ styles['main-container'] }>
      <a className={ styles['back-v2ex'] } onClick={ () => {
        props.history.push('/ParadiseCity')
      } }>
        体验新版
      </a>
      <div className={ styles['catagory'] }>
        {
          props.articleList.map((item) => {
            return item.catagory || '技术'
          }).filter((v, i, arr) => arr.indexOf(v, 0) === i).reverse().map((item) => (
            <a
              onClick={ (e) => { setCatagory(e.target.innerText) } }
              className={ catagory === item ? styles['catagory-item-active'] : styles['catagory-item'] }
            >{ item }</a>
          ))
        }
      </div>
      {
        props.articleList.filter(v => v.catagory === catagory).map((item) => {
          if (item.avatar) {
            return item
          } else {
            const data = []
            for (let i = 0; i < 5; i++) {
              data.push([
                Math.floor(Math.random() * 2),
                Math.floor(Math.random() * 2),
                Math.floor(Math.random() * 2)
              ])
            }
            data.forEach((d) => {
              d.push(d[1], d[0])
            })
            item.color = colors[Math.floor(Math.random() * colors.length)]
            item.avatar = data
            return item
          }
        }).map((item) => (
          <p
            className={ styles['title'] }
            key={ item.name }
            onClick={ () => {
              window.PARADISE_lastest_catagory = catagory
              window.PARADISE_history.push('/ParadiseCity/article', {
                ...item,
                from: 'way2explore'
              })
              document.location.hash = item.sha
            } }
          >
            <div
              className={ styles['title-user'] }
            >
              {
                item.avatar.map((d) => (
                  d.map((_d) => {
                    return (
                      <div
                        data={ _d }
                        className={ 'avatar' }
                        style={ { background: item.color } }
                      ></div>
                    )
                  })
                ))
              }
            </div>
            <p className={ styles['title-name'] }>{ item.name.slice(0, -3).split('-')[0] }</p>
            {/* <span className={ styles['title-props'] + ' ' + styles['title-props-catagory'] }>{ item.catagory }</span> */ }
            { item.author ? <span className={ styles['title-props'] }>{ item.author }</span> : null }
            <span className={ styles['title-props'] }>{ item.date }</span>
            <span className={ styles['title-props'] }>{ item.size + '字节' }</span>
          </p>
        ))
      }
    </div >
  )
})
