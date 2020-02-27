// @ts-nocheck
import Article from './pages/article'
import Write from './pages/write'
import About from './pages/about'
import styles from './index.module.css'
const { BrowserRouter: Router, Switch, Route, Link } = ReactRouterDOM
export default class Layout extends React.Component {
  state = {
    loading: false,
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
      <Router>
        <nav className={styles['sider-menu']}>
          <Link to='/'>Article</Link>
          <label htmlFor='color'>👫</label>
          <Link to='/write'>Writing</Link>
          <input type='color' id='color' onChange={this.coloring} />
        </nav>
        <div className={styles['content']}>
          <Switch>
            <Route exact path='/'>
              <Article loading={this.loading} />
            </Route>
            <Route exact path='/write'>
              <Write loading={this.loading} />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
          </Switch>
        </div>
        <div className={styles.flagcounter}></div>
        <Link to='/about'>Author</Link>
        {this.state.loading ? (
          <div className={styles['loading']}></div>
        ) : (
          <div className={styles['loaded']}></div>
        )}
      </Router>
    )
  }
}
