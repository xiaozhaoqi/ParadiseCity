import { List, Card, Divider, Icon, Calendar } from 'antd';
import React from 'react';
import { connect } from 'dva';
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
      search: 'city=上海'
    });
  }

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  render() {

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',

      }}>
        <div style={{
          flex: 3
        }}>
          <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
        </div>
        <div style={{
          flex: 2
        }}>
          <List
            size="small"
            header={<h3>今日头条</h3>}
            bordered
            dataSource={
              this.props.infoFromAPI.journalismApi_ ?
                this.props.infoFromAPI.journalismApi_.data.toutiao.map((item, index) => {
                  return (
                    <>
                      <span onClick={()=>{
                        window.open(item.link)
                      }}>
                        {index + 1 + '. ' + item.source + '：' + item.title}
                      </span>
                    </>
                  )
                })
                : []
            }
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
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
