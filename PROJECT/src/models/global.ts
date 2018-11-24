// import { routerRedux } from 'dva/router';
import { getArticleList, getArticle, sendNewArticle } from '../utils/fetchArticle';

export default {
    namespace: 'global',
    state: {
        articleList: [],
        tabSelected: 1,
        isTabBarHidden: false,
        isSuccessSubmit: false
    },
    reducers: {
        updateArticleList(state, action) {
            let articleList = [];
            if (action.payload) {
                action.payload.map((item, index) => {
                    articleList.push({
                        title: JSON.parse(decodeURIComponent(escape(atob(item.content)))).title,
                        content: JSON.parse(decodeURIComponent(escape(atob(item.content)))).content,
                        time: JSON.parse(decodeURIComponent(escape(atob(item.content)))).time,
                    })
                })
            }
            if(articleList){
                articleList.sort(function (a, b) {
                    return b.time - a.time;
                })
            }
            return {
                ...state,
                articleList: articleList
            }
        },
        hideTabBar(state, action) {
            return {
                ...state,
                isTabBarHidden: action.payload
            }
        },
        changeTabSelected(state, action) {
            return {
                ...state,
                tabSelected: action.payload
            }
        },
        changeSubmitState(state, action) {
            return {
                ...state,
                isSuccessSubmit: action.payload
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
        *sendNewArticle(action, { put, call }) {
            const isSuccessSubmit = yield call(sendNewArticle, action.payload.title, action.payload.content);
            // console.log(isSuccessSubmit)
            if (isSuccessSubmit) {
                yield put({
                    type: 'changeSubmitState',
                    payload: true
                })
            } else {
                yield put({
                    type: 'changeSubmitState',
                    payload: false
                })
            }
        }
    },
};