import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './pages/about';
import Article from './pages/article';
import Write from './pages/write';

import styles from './index.module.css';

export default class Layout extends React.Component {
  state = {
    loading: false
  }

  loading = () => { this.setState({ loading: !this.state.loading }) }

  render() {
    return (
      <Router>
        <nav className={ styles['sider-menu'] }>
          <div>
            <span role="img" aria-label="author">👫</span>
            <h3>Jovi & Candy</h3>
          </div>
          <Link to="/">
            <ruby>记录<rt>ji lu</rt></ruby>
          </Link>
          <Link to="/write">
            <ruby>写作<rt>xie zuo</rt></ruby>
          </Link>
          <Link to="/about">
            <ruby>关于<rt>guan yu</rt></ruby>
          </Link>
          <div className={ styles.flagcounter } title="一个简单的访问量统计"></div>
        </nav>
        <div className={ styles['content'] }>
          <Switch>
            <Route exact path="/"><Article loading={ this.loading } /></Route>
            <Route exact path="/write"><Write loading={ this.loading } /></Route>
            <Route exact path="/about"><About /></Route>
          </Switch>
        </div>
        { this.state.loading ? <div className={ styles['loading'] }>加载中...</div> : null }
      </Router>
    )
  }
}
