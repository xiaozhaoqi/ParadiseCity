import React, { useEffect, useState } from 'react';
import styles from '../index.module.css';
import Markdown from 'react-markdown/with-html';

import { getArticleList, getArticle } from '../utils/request';

export default (props) => {
  const [type, setType] = useState('titleList');
  const [articleList, setArticleList] = useState([]);
  const [article, setArticle] = useState({ title: '', content: '', time: '', category: '' });
  useEffect(() => {
    props.loading();
    getArticleList().then((articleList) => {
      props.loading();
      setArticleList(articleList);
    })
  }, [])

  return (
    <div>
      {
        type === 'titleList' ?
          articleList.map((item) => (
            <h4
              className={ styles['title'] }
              onClick={ () => {
                props.loading()
                setType('articleDetail');
                getArticle(item.name).then((v) => {
                  props.loading()
                  setArticle({
                    title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
                    content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
                    time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
                    category: JSON.parse(decodeURIComponent(escape(atob(v.content)))).category,
                  })
                })
              } }
            >{ item.name }</h4>
          ))
          :
          <div>
            <button onClick={ () => {
              setType('titleList');
              setArticle({ title: '', content: '', time: '', category: '' });
            } }>返回文章列表</button>
            <h3>{ article.title }</h3>
            <Markdown
              className={ styles['article-content'] }
              source={ article.content }
              escapeHtml={ false }
            />
          </div>
      }
    </div>
  )
}
