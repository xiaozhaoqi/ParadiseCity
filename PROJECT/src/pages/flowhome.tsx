// @ts-nocheck
import styles from '../index.module.css'
const { withRouter } = ReactRouterDOM

export default withRouter((props) => {
  React.useEffect(() => {
    window.scrollTo(0, localStorage.getItem('flowY'))
  }, [])
  return (
    <div className={ styles['flow-container'] }>
      {
        props.articleList.map((item) => (
          <p
            className={ styles['flow-card'] }
            key={ item.name }
            onClick={ () => {
              localStorage.setItem('flowY', window.scrollY)
              window.PARADISE_history.push('/ParadiseCity/article', item)
              document.location.hash = item.sha
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
