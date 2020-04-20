// @ts-nocheck
import Markdown from 'react-markdown/with-html'
import styles from '../index.module.css'

import { sendNewArticle, updateArticle } from '../utils/request'

class Push extends React.Component<
  {
    loading: Function
  },
  {
    text: string
    title: string
    catagory: string
    help: string
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
    this.setState({ text: '', title: '', help: '' })
    localStorage.removeItem('writing-title')
    localStorage.removeItem('writing-text')
  }

  save = () => {
    localStorage.setItem('writing-title', this.state.title)
    localStorage.setItem('writing-text', this.state.text)
  }

  push = () => {
    const { state: { isEdit = false, article: { title = '', catagory = '', time = '', sha = '' } = {} } = {} } = this.props.location
    if (this.state.title) {
      if (isEdit) {
        updateArticle(
          sha,
          title,
          this.state.title,
          catagory,
          this.state.catagory || '技术',
          time,
          this.state.text,
        ).then(() => {
          this.setState({ text: '', title: '', help: '😊更新成功了，私有库存储的文件对你来说是不可见的，但在首页可以看到!' })
        })
      } else {
        sendNewArticle(this.state.title, this.state.text, this.state.catagory || '技术').then(() => {
          this.setState({ text: '', title: '', help: '😊发布成功了，私有库存储的文件对你来说是不可见的，但在首页可以看到!' })
        })
      }
    } else {
      this.setState({ help: '🤢你需要一个标题，"标题+分类+时间戳"将作为私有库存储文件的唯一标识!' })
    }
  }

  render() {
    const { state: { isEdit = false } = {} } = this.props.location
    return (
      <div className={ styles['write-container'] }      >
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
            placeholder="使用Markdown语法书写正文，右侧面板预览格式"
            className={ styles['write-textarea'] }
            value={ this.state.text }
          />
          <Markdown
            source={ this.state.text }
            className={ styles['parseMarkdown'] }
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
        <div>
          <button onClick={ this.push } className={ styles['submitButton'] }>
            { isEdit ? '更新这篇文章到GitHub私有库' : '发布到GitHub私有库' }
          </button>
          <button className={ styles['submitButton'] } onClick={ this.clearInput }>
            清空输入内容
          </button>
        </div>
        <p style={ { color: 'red', marginTop: '10px' } }>{ this.state.help }</p>
      </div>
    )
  }
}
const { withRouter } = ReactRouterDOM

export default withRouter(Push)
