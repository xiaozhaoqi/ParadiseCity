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

  componentDidMount() {
    this.loading()
    this.initData()
  }

  initData = () => {
    getArticleList().then((articleList = []) => {
      if (document.location.hash) {
        const sha = document.location.hash.split('#')[1]
        const target = articleList.filter((v) => sha.indexOf(v.sha) > -1)
        if (target.length) {
          this.loading()
          getArticle(target[0].name).then((v) => {
            if (v) {
              this.setState({
                article: {
                  title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
                  content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
                  time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
                  catagory: JSON.parse(decodeURIComponent(escape(atob(v.content)))).catagory,
                  sha: v.sha,
                }
              })
            }
          }).finally(() => { this.loading() })
        } else {
          location.href = location.origin
        }
      }
      this.setState({
        articleList: articleList.map((item) => {
          const dateStr = item.name.slice(-16, -3).replace(/\D*/, '')
          if (dateStr.length === 13) {
            const date = new Date(parseInt(dateStr))
            item.year = date.getFullYear()
            item.month = date.getMonth() + 1
            item.day = date.getDate()
            item.date = date.toLocaleDateString()
            item.catagory = item.name.slice(0, -17).split('-')[1] || '技术'
          } else {
            item.year = 0
            item.month = 0
            item.day = 0
            item.date = '0000/00/00'
          }
          return item
        }).sort((a, b) => (a.date < b.date ? 1 : -1)) || []
      })
    }).finally(() => { this.loading() })
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
          <Link to='/about'>统计</Link>
          <Link to='/write'>记录</Link>
          <Link to='/' onClick={ this.initData }>回顾</Link>
          <input type='color' id='color' onChange={ this.coloring } />
        </nav>
        <div className={ styles['content'] }>
          <Switch>
            <Route exact path='/'>
              <Main loading={ this.loading } articleList={ this.state.articleList } />
            </Route>
            <Route exact path='/article'>
              <Article loading={ this.loading } article={ this.state.article } />
            </Route>
            <Route exact path='/write'>
              <Write loading={ this.loading } />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
          </Switch>
        </div>
        { this.state.loading ? (
          <div className={ styles['loading'] }></div>
        ) : (
            <div className={ styles['loaded'] }></div>
          ) }
      </Router>
    )
  }
}
