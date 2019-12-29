import React, { useEffect, useState } from 'react';
import styles from '../index.module.css';
import Markdown from 'react-markdown/with-html';

import { getArticleList, getArticle, removeArticle } from '../utils/request';

export default (props) => {
  const [type, setType] = useState('titleList');
  const [articleList, setArticleList] = useState([]);
  const [article, setArticle] = useState({ title: '', content: '', time: '', category: '', sha: '' });
  useEffect(() => {
    props.loading();
    getArticleList().then((articleList = []) => {
      props.loading();
      setArticleList(articleList.map(item => {
        const dateStr = item.name.slice(-16, -3).replace(/\D*/, '')
        if (dateStr.length === 13) {
          const date = new Date(parseInt(dateStr))
          item.year = date.getFullYear()
          item.month = date.getMonth() + 1
          item.day = date.getDate()
          item.date = date.toLocaleDateString()
        } else {
          item.year = 0
          item.month = 0
          item.day = 0
          item.date = '0000/00/00'
        }
        return item
      }).sort((a, b) => a.date < b.date ? 1 : -1) || []);
    })
  }, [])

  return (
    <div>
      {
        type === 'titleList' ?
          articleList.map((item) => (
            <p
              className={ styles['title'] }
              key={ item.name }
              onClick={ () => {
                props.loading()
                setType('articleDetail');
                getArticle(item.name).then((v) => {
                  props.loading()
                  v && setArticle({
                    title: JSON.parse(decodeURIComponent(escape(atob(v.content)))).title,
                    content: JSON.parse(decodeURIComponent(escape(atob(v.content)))).content,
                    time: JSON.parse(decodeURIComponent(escape(atob(v.content)))).time,
                    category: JSON.parse(decodeURIComponent(escape(atob(v.content)))).category,
                    sha: v.sha
                  })
                })
              } }
            >
              <span>[{ item.date }] </span>
              { item.name.slice(0, item.date === '0000/00/00' ? -3 : - 17) }
            </p>
          ))
          :
          <div>
            <p className={ styles['article-title'] }>{ article.title }</p>
            <p className={ styles['article-timestamp'] }>
              {
                article.time ?
                  <>
                    <button
                      className={ styles['back'] }
                      onClick={ () => {
                        setType('titleList');
                        setArticle({ title: '', content: '', time: '', category: '', sha: '' });
                      } }
                    >返回</button>
                    {
                      document.querySelector(':root').getAttribute('style') === '--mainColor: #f0f0f0' ?
                        <button
                          className={ styles['back'] }
                          onClick={ () => {
                            removeArticle(article.title + '-' + article.time, article.sha).then(() => {
                              location.reload()
                            })
                          } }
                        >删除</button> : null
                    }
                    <span>{ new Date(article.time).toLocaleString() }</span>
                  </>
                  : null
              }
            </p>
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
