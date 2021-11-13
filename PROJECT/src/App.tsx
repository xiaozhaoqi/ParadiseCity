// @ts-nocheck
import Article from './pages/article'
import Main from './pages/main'
import Write from './pages/write'
import About from './pages/about'
import styles from './index.module.css'
import { getArticleList, getArticle } from './utils/request'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
const { BrowserRouter: Router, Switch, Route, Link } = ReactRouterDOM
window.PARADISE_history = window.PARADISE_history || history

export default class Layout extends React.Component {
  state = {
    loading: false,
    articleList: [],
    article: {},
  }

  constructor(props) {
    super(props)
    window.PARADISE_CITY_Loading = this.loading
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    getArticleList().then(articleList => {
      return articleList.filter(v => v.type === 'file')
    }).then((articleList = []) => {
      if (document.location.hash) {
        const sha = document.location.hash.split('#')[1]
        const target = articleList.filter((v) => sha.indexOf(v.sha) > -1)
        if (target.length) {
          getArticle(target[0].name).then((v) => {
            if (v) {
              this.setState({
                article: {
                  title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
                  content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
                  time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
                  catagory: JSON.parse(decodeURIComponent(escape(atob(v.content)))).catagory,
                  author: JSON.parse(decodeURIComponent(escape(atob(v.content)))).author,
                  sha: v.sha,
                }
              })
            }
          })
        } else {
          location.href = location.origin
        }
      }
      this.setState({
        articleList: articleList.map((item) => {
          const dateStr = item.name.slice(-16, -3).replace(/\D*/, '')
          if (dateStr.length === 13) {
            const args = item.name.slice(0, -3).split('-')
            const date = new Date(parseInt(dateStr))
            item.year = date.getFullYear()
            item.month = date.getMonth() + 1
            item.day = date.getDate()
            item.date = date.toLocaleDateString()
            item.catagory = args[1]
            item.author = args.length > 3 ? args[2] : 'zhaoqi.xiao'
          }
          return item
        }).sort((a, b) => (a.date < b.date ? 1 : -1)) || []
      })
    })
  }

  loading = () => {
    this.setState({ loading: !this.state.loading })
  }

  coloring = (e) => {
    document.querySelector(':root').setAttribute('style', '--mainColor: ' + e.target.value)
    this.forceUpdate()
  }

  render() {
    return (
      <Router history={ history }>
        <nav className={ styles['sider-menu'] }>
          <label htmlFor='color' title="点击更换文字颜色">👫</label>
          <Link to='/ParadiseCity/about'>更多了解</Link>
          <Link to='/ParadiseCity/write'>记录</Link>
          <Link to='/ParadiseCity/' onClick={ this.initData }>回顾</Link>
          <span className={ styles['scroll-tips'] }>
            <span style={ { letterSpacing: '-4px' } }>木</span>
            <span style={ { letterSpacing: '-5px', fontSize: '0.7em' } }>又</span>
            <span style={ { letterSpacing: '6px' } }>寸</span>
            <span style={ { letterSpacing: '-12px' } }>氵</span>
            <span style={ { letterSpacing: '0px' } }>同</span>
          </span>
          <input type='color' id='color' onChange={ this.coloring } />
        </nav>
        <div className={ styles['content'] }>
          <Switch>
            <Route exact path='/ParadiseCity/'>
              <Main articleList={ this.state.articleList } />
            </Route>
            <Route exact path='/ParadiseCity/article'>
              <Article article={ this.state.article } />
            </Route>
            <Route exact path='/ParadiseCity/write'>
              <Write />
            </Route>
            <Route exact path='/ParadiseCity/about'>
              <About />
            </Route>
          </Switch>
        </div>
        { this.state.loading && <div className={ styles['loading'] }></div> }
        <div className={ styles['mask'] + (this.state.loading ? '' : ' hide') }></div>
      </Router>
    )
  }
}
