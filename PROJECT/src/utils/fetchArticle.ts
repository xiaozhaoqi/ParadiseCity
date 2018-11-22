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

export {
    getArticleList,
    getArticle
}