import { List, Card, Tabs, Select, Col, Row } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
interface IProps {
  dispatch: any;
  loading: any;
  infoFromAPI: any;
}
class Main extends React.Component<IProps, {

}> {
  constructor(props: IProps) {
    super(props);
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'journalismApi',
      search: ''
    });
    this.props.dispatch({
      type: 'global/getInfoFromAPI',
      pathname: 'weatherApi',
      search: 'city=北京'
    });
  }

  render() {
    let { infoFromAPI, loading } = this.props;
    let news = infoFromAPI.journalismApi_ || null;
    let weather = infoFromAPI.weatherApi_city_北京 || null;
    return (
      <div style={{ overflow: 'hidden' }}>
        {weather ?
          <>
            <h2>weather</h2>
            <List
              size="small"
              bordered
              dataSource={
                [
                  "今日气温：" + weather.data.wendu + "℃",
                  weather.data.ganmao,
                  ...weather.data.forecast.map((item, index) => {
                    return (
                      <>
                        <span style={{ flex: 1 }}>{item.date}</span>
                        <span style={{ flex: 1 }}>{item.type}</span>
                        <span style={{ flex: 1 }}>{item.fengxiang}</span>
                        <span style={{ flex: 1 }}>{item.high}</span>
                        <span style={{ flex: 1 }}>{item.low}</span>
                      </>
                    )
                  })
                ]
              }
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </>
          : null}
        {news ? Object.keys(news.data).map((item, index) => {
          return (
            <div style={{ margin: '10px 0' }}>
              <h2>{item}</h2>
              <List
                size="small"
                bordered
                dataSource={
                  news.data[item].filter((item) => (item.title)).map((item, index) => {
                    return (
                      <>
                        <span
                          style={{
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            window.open(item.link)
                          }}
                        >
                          <a>{item.title}</a>
                          <span style={{ position: 'absolute', right: '10px' }}>{item.source}</span>
                        </span>
                      </>
                    )
                  })
                }
                renderItem={item => (<List.Item>{item}</List.Item>)}
              />
            </div>
          )
        }) : null
        }
      </div>
    );
  }
}

export default connect(state => {
  return {
    loading: state.loading.global,
    infoFromAPI: state.global.infoFromAPI
  };
})(Main);
