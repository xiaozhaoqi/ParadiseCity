import { List } from 'antd';
import React from 'react';
import { connect } from 'dva';

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
  };
})((props) => {
  let news = props.infoFromAPI.journalismApi_ || null;
  return (
    <div style={{ overflow: 'hidden', margin: '12px' }}>
      {
        news ?
          Object.keys(news.data).map((item, index) => {
            return (
              <div style={{ margin: '10px 0' }} key={index}>
                <h2>{newsTitleMap[item] || ''}</h2>
                <List
                  size="small"
                  dataSource={news.data[item]
                    .filter(item => item.title)
                    .map((item, index) => {
                      return (
                        <span
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            window.open(item.link);
                          }}
                          key={index}
                        >
                          <a>{item.title.slice(0, 30)}</a>
                        </span>
                      );
                    })}
                  rowKey={item}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </div>
            );
          }) : null
      }
    </div>
  );
});
