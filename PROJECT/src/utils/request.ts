// 此Token拥有读写存储库的权限，但无法用于GitHub账户设置
const leftToken = '61e06fdec3996fbda3c'
const rightToken = 'eb8094d137bf927e7e5b2'

// 扩展fetch方法，任意AJAX调用都会展示进度条
window.PARADISE_CITY_Fetch = window.fetch
window.fetch = async (...args) => {
  window.PARADISE_CITY_Loading()
  return await window.PARADISE_CITY_Fetch(...args).finally(() => { window.PARADISE_CITY_Loading() })
}

// 增删改查存储库文件
async function getArticleList() {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article',
    {
      method: 'GET',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
    }
  )
    .then((res) => {
      if (res.status < 299) return res.json()
      else return null
    })
    .then((res) => {
      return res
    })
}
async function getArticle(name) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/' + name,
    {
      method: 'GET',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res
    })
}
async function sendNewArticle(title, content, catagory, author) {
  const time = Date.now()
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/' +
    title +
    '-' +
    catagory +
    '-' +
    author +
    '-' +
    time +
    '.md',
    {
      method: 'PUT',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
      body: JSON.stringify({
        message: 'AutoPush Article: ' + title,
        // @ts-ignore
        content: btoa(
          unescape(
            encodeURIComponent(
              JSON.stringify({
                title: title,
                content: content,
                time: time,
                catagory: catagory,
                author: author,
              })
            )
          )
        ),
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return true
    })
    .catch((err) => {
      return false
    })
}
async function updateArticle(sha, oldTitle, newTitle, oldCatagory, newCatagory, createTime, content, author) {
  // 私有库仅以文件名作为标识，使用先删除再新增的方式，可以满足对文件名进行变更的需要。
  const removeRes = await removeArticle({ sha, title: oldTitle, catagory: oldCatagory, time: createTime, author })
    .then((e) => { return e })
    .catch((e) => { return e })
  if (removeRes === 'remove failed') {
    return Promise.reject('update failed')
  }
  return await sendNewArticle(newTitle, content, newCatagory, author)
}
async function removeArticle(article) {
  const token = prompt('你正在变更私有库的文件存储，输入Token:')
  if (token !== 'rm') {
    alert(token + ' 不是有效的 Token')
    return Promise.reject('remove failed');
  }
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/article/' +
    article.title +
    '-' +
    article.catagory +
    '-' +
    article.author +
    '-' +
    article.time +
    '.md',
    {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
      body: JSON.stringify({
        message: 'AutoDelete article: ' + article.title,
        // @ts-ignore
        sha: article.sha,
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
async function getPhotoList() {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/photo',
    {
      method: 'GET',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
    }
  )
    .then((res) => {
      if (res.status < 299) return res.json()
      else return null
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
async function getPhoto(name) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/photo/' + name,
    {
      method: 'GET',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
async function sendNewPhoto(title, content) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/photo/' +
    title +
    '.png',
    {
      method: 'PUT',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
      body: JSON.stringify({
        message: 'AutoPush Photo: ' + title,
        // @ts-ignore
        content: btoa(
          unescape(
            encodeURIComponent(
              JSON.stringify({
                title: title,
                content: content,
                time: title,
              })
            )
          )
        ),
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return true
    })
    .catch((err) => {
      return false
    })
}
async function removePhoto(title, sha) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/privateRepository/contents/files/photo/' +
    title +
    '.png',
    {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + leftToken + rightToken,
      },
      body: JSON.stringify({
        message: 'AutoDelete Photo: ' + title,
        // @ts-ignore
        sha: sha,
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
async function getUserInfo() {
  return await fetch('https://api.github.com/search/users?q=xiaozhaoqi')
    .then((res) => res.json())
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export {
  getArticleList,
  getArticle,
  sendNewArticle,
  updateArticle,
  sendNewPhoto,
  getPhotoList,
  getPhoto,
  removePhoto,
  removeArticle,
  getUserInfo,
}
