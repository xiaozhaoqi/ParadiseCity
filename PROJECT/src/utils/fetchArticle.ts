async function getArticleList() {
    return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1?access_token=d6920daff4658f60146' + 'dac245849a4be1a5f5072', {
        method: 'GET',
    }).then(res => res.json()).then((res) => {
        return res;
    }).catch((err) => { console.log(err); })
}
async function getArticle(name){
    return await fetch('https://api.github.com/repos/xiaozhaoqi/xiaozhaoqi.github.io/contents/test1/' + name + '?access_token=d6920daff4658f60146' + 'dac245849a4be1a5f5072', {
        method: 'GET',
    }).then(res => res.json()).then((res) => {
        return res;
    }).catch((err) => { console.log(err); })
}

export {
    getArticleList,
    getArticle
}