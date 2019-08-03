import { List, Button, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
interface IProps {
  dispatch: any;
  loading: any;
  infoFromAPI: any;
  hotInfo: any;
  hotDetail: any;
}
class Main extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'journalismApi',
      search: '',
    });
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'weatherApi',
      search: 'city=北京',
    });
    this.props.dispatch({
      type: 'global/getHotInfo'
    })
  }

  render() {
    let { infoFromAPI, hotDetail, hotInfo } = this.props;
    let news = infoFromAPI.journalismApi_ || null;
    let weather = infoFromAPI.weatherApi_city_北京 || null;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ overflow: 'hidden', flex: '1', marginRight: '10px' }}>
          {weather ? (
            <>
              <h2>weather</h2>
              <List
                size="small"
                bordered
                dataSource={[
                  '今日气温' + weather.data.wendu + '℃，' + weather.data.ganmao,
                  ...weather.data.forecast.map((item, index) => {
                    return (
                      <>
                        <span style={{ flex: 1 }}>{item.date}</span>
                        <span style={{ flex: 1 }}>{item.type}</span>
                        <span style={{ flex: 1 }}>{item.fengxiang}</span>
                        <span style={{ flex: 1 }}>{item.high}</span>
                        <span style={{ flex: 1 }}>{item.low}</span>
                      </>
                    );
                  }),
                ]}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </>
          ) : null}
          {news
            ? Object.keys(news.data).map((item, index) => {
              return (
                <div style={{ margin: '10px 0' }}>
                  <h2>{item}</h2>
                  <List
                    size="small"
                    bordered
                    dataSource={news.data[item]
                      .filter(item => item.title)
                      .map((item, index) => {
                        return (
                          <>
                            <span
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                window.open(item.link);
                              }}
                            >
                              <a style={{ display: 'inline-block', marginRight: '20px' }}>{item.title.slice(0, 26)}</a>
                              <span style={{ position: 'absolute', right: '10px' }}>
                                {item.source}
                              </span>
                            </span>
                          </>
                        );
                      })}
                    renderItem={item => <List.Item>{item}</List.Item>}
                  />
                </div>
              );
            })
            : null}
        </div>
        <div style={{ overflow: 'hidden', flex: '1' }}>
          <Tooltip title="数据源来自v2ex网友printf520.com提供的爬虫接口" placement="left">
            <h2>聚合热榜</h2>
          </Tooltip>
          {
            hotInfo && hotInfo.Data && hotInfo.Data.length ?
              hotInfo.Data.map(item => {
                return <Button
                  size="small"
                  type="dashed"
                  style={{ margin: '0 10px 10px 0' }}
                  onClick={() => {
                    this.props.dispatch({
                      type: 'global/getHotDetail',
                      payload: item.id
                    })
                  }}>{item.title}</Button>
              }) : null
          }

          {
            hotDetail && hotDetail.Data && hotDetail.Data.length ?
              <List
                size="small"
                bordered
                dataSource={hotDetail.Data.map(item =>
                  <a href={item.url} target="_blank">{item.title}</a>
                )}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
              : null
          }
        </div>
      </div>
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
})(Main);
