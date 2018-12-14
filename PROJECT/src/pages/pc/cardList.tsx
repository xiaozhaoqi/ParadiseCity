import { List, Card, Divider } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

interface IProps {
  dispatch: any;
  loading: any;
  articleList: Array<{
    content: string;
    time: string;
    title: string;
  }>;
  photoFiles: Array<{
    url: string;
    time: string;
    title: string;
  }>;
}
class CardList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.props.dispatch({
      type: 'global/getCurrentArticleList',
    });
    this.props.dispatch({
      type: 'global/getCurrentPhotoList',
    });
  }
  public static getDerivedStateFromProps(nextProps: IProps) {
    const { articleList, loading } = nextProps;
    return {
      articleList,
    };
  }
  render() {
    return (
      <>
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 6,
        }}
        dataSource={this.props.loading ? new Array(10) : this.props.articleList}
        renderItem={(item) => {
          if (item) {
            let localTime = new Date(item.time).toLocaleString();
            return (
              // 真实数据
              <List.Item>
                <Card title={item.title}>
                  <p>{item.content}</p>
                  <span>{localTime}</span>
                </Card>
              </List.Item>
            )
          } else {
            return (
              // 骨架屏
              <List.Item>
                <div className={styles.skeleton}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonContent} />
                  <div className={styles.skeletonTime} />
                </div>
              </List.Item>
            )
          }
        }
        }
      />
      {/* {this.props.photoFiles.map((item,index)=>{
        console.log(item)
        return (
          <img src={item.url} alt={item.title} width="20%"/>
        )
      })} */}
      </>
    );
  }
}

export default connect(state => {
  return {
    loading: state.loading.global,
    articleList: state.global.articleList,
    photoFiles: state.global.photoFiles
  };
})(CardList);
