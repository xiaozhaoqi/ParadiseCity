import { List, Button, Tooltip } from 'antd';
import { Card, WingBlank, WhiteSpace, Toast, Tag } from 'antd-mobile';
import React from 'react';
import { connect } from 'dva';
interface IProps {
  dispatch: any;
  loading: any;
  infoFromAPI: any;
  hotInfo: any;
  hotDetail: any;
}
class News extends React.Component<IProps, {
  focusBtn: string;
}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      focusBtn: '0'
    }
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'journalismApi',
      search: '',
    });
    this.props.dispatch({
      type: 'global/getHotInfo'
    })
    this.props.dispatch({
      type: 'global/getHotDetail',
      payload: 1
    })
  }

  render() {
    let { infoFromAPI, hotDetail, hotInfo } = this.props;
    let news = infoFromAPI.journalismApi_ || null;
    return (
      <WingBlank size="lg">
        <WhiteSpace size="md" />
        <div style={{ overflow: 'hidden' }}>
          <Tooltip title="数据源来自v2ex网友printf520.com提供的爬虫接口">
            <h2>聚合热榜</h2>
          </Tooltip>
          <Button
            size="small"
            type={this.state.focusBtn === '0' ? "primary" : "dashed"}
            style={{ margin: '0 10px 10px 0' }}
            onClick={() => { this.setState({ focusBtn: '0' }) }}
          >热搜</Button>
          {
            hotInfo && hotInfo.Data && hotInfo.Data.length ?
              hotInfo.Data.map(item => {
                return <Button
                  size="small"
                  key={item.id}
                  type={item.id === this.state.focusBtn ? "primary" : "dashed"}
                  style={{ margin: '0 10px 10px 0' }}
                  onClick={() => {
                    this.setState({ focusBtn: item.id })
                    this.props.dispatch({
                      type: 'global/getHotDetail',
                      payload: item.id
                    })
                  }}>{item.title}</Button>
              }) : null
          }

          {
            hotDetail && hotDetail.Data && hotDetail.Data.length && this.state.focusBtn !== '0' ?
              <List
                size="small"
                dataSource={hotDetail.Data.map(item =>
                  <a href={item.url} target="_blank" key={item.url}>{item.title}</a>
                )}
                renderItem={item => <List.Item key={item}>{item}</List.Item>}
              />
              : null
          }

          {
            this.state.focusBtn === '0' && news ?
              Object.keys(news.data).map((item, index) => {
                return (
                  <div style={{ margin: '10px 0' }} key={index}>
                    <h2>{item}</h2>
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
                              <a>{item.title.slice(0, 26)}</a>
                            </span>
                          );
                        })}
                      renderItem={item => <List.Item key={item}>{item}</List.Item>}
                    />
                  </div>
                );
              }) : null
          }
        </div>
      </WingBlank >
    );
  }
}

export default connect(state => {
  return {
    loading: state.loading.global,
    infoFromAPI: state.global.infoFromAPI,
    hotInfo: state.global.hotInfo,
    hotDetail: state.global.hotDetail
  };
})(News);
