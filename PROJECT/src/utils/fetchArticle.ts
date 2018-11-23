const leftToken = '61e06fdec3996fbda3c';
const rightToken = 'eb8094d137bf927e7e5b2';
async function getArticleList() {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1?access_token=' + leftToken + rightToken, {
    method: 'GET',
  }).then(res => res.json()).then((res) => {
    return res;
  }).catch((err) => { console.log(err); })
}
async function getArticle(name) {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1/' + name + '?access_token=' + leftToken + rightToken, {
    method: 'GET',
  }).then(res => res.json()).then((res) => {
    return res;
  }).catch((err) => { console.log(err); })
}
async function sendNewArticle(title, content) {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1/' + Math.random() + '.md?access_token=' + leftToken + rightToken, {
    method: 'PUT',
    body: JSON.stringify({
      message: 'AutoPush Article: ' + title,
      // @ts-ignore
      content: btoa(unescape(encodeURIComponent((JSON.stringify({
        title: title,
        content: content,
        time: Date.now()
      })))))
    })
  }).then(res => res.json()).then((res) => {
    return true;
  }).catch((err) => {
    return false;
  })
}

export {
  getArticleList,
  getArticle,
  sendNewArticle
}