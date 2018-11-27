// import { routerRedux } from 'dva/router';
import { getArticleList, getArticle, sendNewArticle, sendNewPhoto, getPhotoList, getPhoto, removePhoto } from '../utils/request';

export default {
    namespace: 'global',
    state: {
        articleList: [],
        tabSelected: 1,
        isTabBarHidden: false,
        isSuccessSubmit: false,
        photoFiles:[]
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
        },
        updatePhotoList(state, action) {
            let photoFiles = [];
            if (action.payload) {
                action.payload.map((item, index) => {
                    photoFiles.push({
                        url: atob(item.content)
                    })
                })
            }
            return {
                ...state,
                photoFiles: photoFiles
            }
        },
    },
    effects: {
        // 文字
        *getCurrentArticleList(action, { call, put }) {
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
        },

        // 图片
        *getCurrentPhotoList(action, { call, put }) {
            const photoList = yield call(getPhotoList);
            const photo = yield photoList.map((item, i) => {
                return call(getPhoto, photoList[i].name);
            });
            yield put({
                type: 'updatePhotoList',
                payload: photo
            })
        },
        *sendNewPhoto(action, { put, call }) {
            const isSuccessSubmit = yield call(sendNewPhoto, action.payload);
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
        },
        *removePhoto(action, { put, call }) {
            const isSuccessSubmit = yield call(removePhoto, action.payload);
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