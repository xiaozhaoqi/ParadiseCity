const leftToken = '61e06fdec3996fbda3c';
const rightToken = 'eb8094d137bf927e7e5b2';
// 文字
async function getArticleList() {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/article?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'GET',
    }
  )
    .then(res => {
      if (res.status < 299) return res.json();
      else return null;
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
async function getArticle(name) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/article/' +
    name +
    '?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'GET',
    }
  )
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
async function sendNewArticle(title, content, category) {
  const time = Date.now();
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/article/' +
    time +
    '.md?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'PUT',
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
                category: category
              })
            )
          )
        ),
      }),
    }
  )
    .then(res => res.json())
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
}
async function removeArticle(title, sha) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/article/' +
    title +
    '.md?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'DELETE',
      body: JSON.stringify({
        message: 'AutoDelete article: ' + title,
        // @ts-ignore
        sha: sha,
      }),
    }
  )
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
// 图片
async function getPhotoList() {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/photo?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'GET',
    }
  )
    .then(res => {
      if (res.status < 299) return res.json();
      else return null;
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
async function getPhoto(name) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/photo/' +
    name +
    '?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'GET',
    }
  )
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}
async function sendNewPhoto(title, content) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/photo/' +
    title +
    '.png?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'PUT',
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
    .then(res => res.json())
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
}
async function removePhoto(title, sha) {
  return await fetch(
    'https://api.github.com/repos/xiaozhaoqi/ParadiseCity/contents/files/photo/' +
    title +
    '.png?access_token=' +
    leftToken +
    rightToken,
    {
      method: 'DELETE',
      body: JSON.stringify({
        message: 'AutoDelete Photo: ' + title,
        // @ts-ignore
        sha: sha,
      }),
    }
  )
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

async function getInfoFromAPI(pathname, search) {
  return await fetch('https://www.apiopen.top/' + pathname + '?' + search)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

async function getHotInfo() {
  return await fetch('https://www.printf520.com:8080/GetType')
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

async function getHotDetail(id) {
  return await fetch('https://www.printf520.com:8080/GetTypeInfo?id=' + id)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

async function getUserInfo() {
  return await fetch('https://api.github.com/search/users?q=xiaozhaoqi')
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

export {
  getArticleList,
  getArticle,
  sendNewArticle,
  sendNewPhoto,
  getPhotoList,
  getPhoto,
  removePhoto,
  removeArticle,
  getInfoFromAPI,
  getUserInfo,
  getHotInfo,
  getHotDetail
};
