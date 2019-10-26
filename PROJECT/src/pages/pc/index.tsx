import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

const newsTitleMap = {
  'tech': '科技',
  'war': '军事',
  'auto': '汽车',
  'toutiao': '新闻',
  'money': '金融',
  'sports': '体育',
  'dy': '杂谈',
  'home': '地产'
}
export default connect(state => {
  return {
    loading: state.loading.global,
    infoFromAPI: state.global.infoFromAPI,
    loadNews: state.loading.effects['global/getInfoFromAPI'],
  };
})(props => {
  let news = props.infoFromAPI.journalismApi_ || null;
  return (
    props.loadNews ? 'loading...' :
      news ?
        <div className={styles.newsContainer}>
          {
            Object.keys(news.data).map((item) => {
              return (
                <div className={styles.newsCard} key={item}>
                  <h2>{newsTitleMap[item] || ''}</h2>
                  <div>
                    {news.data[item].filter(item => item.title && item.source && item.link).map((item) => (
                      <p onClick={() => { window.open(item.link); }} key={item.title} className={styles.newsItem}>
                        {item.title.slice(0, 30)}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        : 'load failed.'
  );
});
