import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Article from './pages/article';
import Write from './pages/write';
import About from './pages/about';
import styles from './index.module.css';

export default class Layout extends React.Component {
  state = {
    loading: false
  }

  loading = () => { this.setState({ loading: !this.state.loading }) }

  coloring = (e) => {
    document.querySelector(':root').setAttribute('style', '--mainColor: ' + e.target.value)
    this.forceUpdate()
  }

  render() {
    return (
      <Router>
        <nav className={ styles['sider-menu'] }>
          <Link to="/">
            <ruby>记录<rt>ji lu</rt></ruby>
          </Link>
          <label htmlFor="color"> 👫 </label>
          <Link to="/write">
            <ruby>写作<rt>xie zuo</rt></ruby>
          </Link>
          <input type="color" id="color" onChange={ this.coloring } />
        </nav>
        <div className={ styles['content'] }>
          <Switch>
            <Route exact path="/"><Article loading={ this.loading } /></Route>
            <Route exact path="/write"><Write loading={ this.loading } /></Route>
            <Route exact path="/about"><About /></Route>
          </Switch>
        </div>
        <div className={ styles.flagcounter } title="一个简单的访问量统计"></div>
        <Link to="/about">
          <ruby>关于作者<rt>guan yu zuo zhe</rt></ruby>
        </Link>
        { this.state.loading ? <div className={ styles['loading'] }></div> : <div className={ styles['loaded'] }></div> }
      </Router>
    )
  }
}
