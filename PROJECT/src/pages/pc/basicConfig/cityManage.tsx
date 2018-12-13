import { List, Card, Divider } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from '../index.css';

interface IProps {
  dispatch: any;
  loading: any;
  articleList: Array<{
    content: string;
    time: string;
    title: string;
  }>;
}
class CityManage extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.props.dispatch({
      type: 'global/getCurrentArticleList',
    });
  }
  public static getDerivedStateFromProps(nextProps: IProps) {
    const { articleList, loading } = nextProps;
    console.log(articleList);
    return {
      articleList,
    };
  }
  render() {
    return (
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
        renderItem={item => (
          <List.Item>
            {this.props.loading ? (
              <div className={styles.skeleton}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonContent} />
                <div className={styles.skeletonTime} />
              </div>
            ) : (
              <Card title={item.title}>{item.content}</Card>
            )}
          </List.Item>
        )}
      />
    );
  }
}

export default connect(state => {
  return {
    loading: state.loading.global,
    articleList: state.global.articleList,
  };
})(CityManage);
