// @ts-nocheck
import Markdown from 'react-markdown/with-html'
import styles from '../index.module.css'

import { sendNewArticle, updateArticle } from '../utils/request'

class Push extends React.Component<
  {},
  {
    text: string
    title: string
    catagory: string
    help: string
    author: string
  }
  > {
  constructor(props) {
    super(props)
    const { state: { article: { content = '', title = '', catagory = '' } = {} } = {} } = props.location
    this.state = {
      text: content || localStorage.getItem('writing-text') || '',
      title: title || localStorage.getItem('writing-title') || '',
      catagory: catagory || '',
      help: '',
      author: localStorage.getItem('author') || '',
    }
  }

  componentDidMount() {
    this.recorder = setInterval(() => {
      const savedLength =
        (localStorage.getItem('writing-text') && localStorage.getItem('writing-text').length) || 0
      if (Math.abs(savedLength - this.state.text.length) > 100) {
        this.save()
      }
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.recorder)
  }

  recorder: any

  clearInput = () => {
    this.setState({ text: '', title: '', help: '', author: '', catagory: '' })
    localStorage.removeItem('writing-title')
    localStorage.removeItem('writing-text')
    localStorage.removeItem('author')
  }

  save = () => {
    localStorage.setItem('writing-title', this.state.title)
    localStorage.setItem('writing-text', this.state.text)
  }

  push = () => {
    const { state: { isEdit = false, article: { title = '', catagory = '', time = '', sha = '' } = {} } = {} } = this.props.location
    localStorage.setItem('author', this.state.author)
    if (this.state.title && this.state.title.match(/[\/-]/ig) === null) {
      if (isEdit) {
        updateArticle(
          sha,
          title,
          this.state.title,
          catagory,
          this.state.catagory || '技术',
          time,
          this.state.text,
          this.state.author,
        ).then(() => {
          this.setState({ text: '', title: '', help: '😊更新成功了' })
        })
      } else {
        sendNewArticle(this.state.title, this.state.text, this.state.catagory || '技术', this.state.author).then(() => {
          this.setState({ text: '', title: '', help: '😊发布成功了' })
        })
      }
    } else {
      this.setState({ help: '🤢你需要一个标题，且标题中不能含有保留字"/"和"-"，"标题+分类+时间戳"将作为存储文件的唯一标识!' })
    }
  }

  render() {
    const { state: { isEdit = false } = {} } = this.props.location
    return (
      <>
        <h2>{ isEdit ? '修改' : '创建' }文章 <span onClick={ () => { this.props.history.go(-1) } }>🔙</span></h2>
        <div className={ styles['write-container'] }>
          <input
            className={ styles['write-title'] }
            placeholder="标题"
            value={ this.state.title }
            onChange={ (e) => {
              this.setState({ title: e.target.value })
            } }
          />
          <div className={ styles['editor-container'] }>
            <textarea
              onChange={ (e) => {
                this.setState({ text: e.target.value })
              } }
              placeholder="Markdown Supported"
              className={ styles['write-textarea'] + ' scrollbar' }
              value={ this.state.text }
            />
            <Markdown
              source={ this.state.text }
              className={ styles['parseMarkdown'] + ' scrollbar' }
              escapeHtml={ false }
            />
          </div>
          <input
            className={ styles['write-catagory'] }
            placeholder="自定义分类，默认为[技术]"
            value={ this.state.catagory }
            onChange={ (e) => {
              this.setState({ catagory: e.target.value })
            } }
          />
          <br />
          <input
            className={ styles['write-catagory'] }
            placeholder="文章署名"
            value={ this.state.author }
            onChange={ (e) => {
              this.setState({ author: e.target.value })
            } }
          />
          <div>
            <button onClick={ this.push } className={ styles['submitButton'] }>
              { isEdit ? '更新这篇文章' : '发布' }
            </button>
            <button className={ styles['submitButton'] } onClick={ this.clearInput }>
              清空内容
          </button>
          </div>
          <p style={ { color: 'red', marginTop: '10px' } }>{ this.state.help }</p>
        </div>
      </>
    )
  }
}
const { withRouter } = ReactRouterDOM

export default withRouter(Push)
