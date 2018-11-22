// import { routerRedux } from 'dva/router';
import { getArticleList, getArticle } from '../utils/fetchArticle';

export default {
    namespace: 'global',
    state: {
        articleList: [],
    },
    reducers: {
        updateArticleList(state, action) {
            let articleList = [];
            action.payload.map((item, index) => {
                articleList.push({
                    title: JSON.parse(decodeURIComponent(escape(atob(item.content)))).title,
                    content: JSON.parse(decodeURIComponent(escape(atob(item.content)))).content,
                    time: JSON.parse(decodeURIComponent(escape(atob(item.content)))).time,
                })
            })
            return {
                ...state,
                articleList: articleList
            }
        }
    },
    effects: {
        *getCurrentArticleList(action, { call, put, select, takeEvery }) {
            const state = yield select(state => state.global)
            const articleList = yield call(getArticleList);
            const article = yield articleList.map((item, i) => {
                return call(getArticle, articleList[i].name);
            });
            yield put({
                type: 'updateArticleList',
                payload: article
            })

        },
    },
};