const leftToken = '61e06fdec3996fbda3c';
const rightToken = 'eb8094d137bf927e7e5b2';
// 文字
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
// 图片
async function getPhotoList() {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test2?access_token=' + leftToken + rightToken, {
    method: 'GET',
  }).then(res => {
    if(res.status < 299)
      return res.json();
    else
      return null;
  }).then((res) => {
    return res;
  }).catch((err) => { console.log(err); })
}
async function getPhoto(name) {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test2/' + name + '?access_token=' + leftToken + rightToken, {
    method: 'GET',
  }).then(res => res.json()).then((res) => {
    return res;
  }).catch((err) => { console.log(err); })
}
async function sendNewPhoto(title, content) {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test2/' + title + '.png?access_token=' + leftToken + rightToken, {
    method: 'PUT',
    body: JSON.stringify({
      message: 'AutoPush Photo: ' + title,
      // @ts-ignore
      content: btoa(unescape(encodeURIComponent((JSON.stringify({
        title: title,
        content: content,
        time: title
      })))))
    })
  }).then(res => res.json()).then((res) => {
    return true;
  }).catch((err) => {
    return false;
  })
}
async function removePhoto(title, sha) {
  return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test2/' + title + '.png?access_token=' + leftToken + rightToken, {
    method: 'DELETE',
    body: JSON.stringify({
      message: 'AutoDelete Photo: ' + title,
      // @ts-ignore
      sha: sha
    })
  }).then(res => res.json()).then((res) => {
    return res;
  }).catch((err) => { console.log(err); })
}
export {
  getArticleList,
  getArticle,
  sendNewArticle,
  sendNewPhoto,
  getPhotoList,
  getPhoto,
  removePhoto
}