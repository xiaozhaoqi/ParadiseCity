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
    let tabs = [];
    if (weather) {
      tabs.push(
        <TabPane tab="天气" key="weather">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={8}>
              <Card title={"今日气温：" + weather.data.wendu + "℃"} style={{ margin: '10px 0', height: '200px', overflow: 'auto' }}>
                <p> {weather.data.ganmao} </p>
              </Card>
            </Col>
            {weather.data.forecast.map((item, index) => {
              return (
                <Col span={8} key={item.date}>
                  <Card title={item.date + ' ' + item.type + ' ' + item.fengxiang} style={{ margin: '10px 0', height: '200px', overflow: 'auto' }}>
                    <p> {item.high} </p>
                    <p> {item.low} </p>
                  </Card>
                </Col>
              )
            })}
          </Row>

        </TabPane >
      )
    }
    if (news) {
      Object.keys(news.data).forEach(function (key) {
        tabs.push(
          <TabPane tab={news.data[key][0].category || '推荐'} key={key}>
            <List
              size="small"
              bordered
              dataSource={
                news.data[key].map((item, index) => {
                  if (item.title) {
                    return (
                      <>
                        <span onClick={() => {
                          window.open(item.link)
                        }}>
                          {index + 1 + '. ' + item.source + '：' + item.title}
                        </span>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <span>
                          {index + 1 + '. 这条新闻走丢了'}
                        </span>
                      </>
                    )
                  }
                })
              }
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </TabPane>
        )
      })
    }

    return (
      <div>
        <div style={{
          height: '6%'
        }}>
          <Tabs defaultActiveKey="weather">
            {tabs.reverse()}
          </Tabs>
        </div>
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
