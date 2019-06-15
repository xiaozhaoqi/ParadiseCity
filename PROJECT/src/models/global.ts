// import { routerRedux } from 'dva/router';
import {
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
} from '../utils/request';

export default {
  namespace: 'global',
  state: {
    articleList: [],
    tabSelected: 1,
    isTabBarHidden: false,
    isSuccessSubmit: false,
    isSuccessRemove: false,
    photoFiles: [],
    infoFromAPI: {},
    userInfo: {},
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
          });
        });
      }
      if (articleList) {
        articleList.sort(function(a, b) {
          return b.time - a.time;
        });
      }
      return {
        ...state,
        articleList: articleList,
      };
    },
    hideTabBar(state, action) {
      return {
        ...state,
        isTabBarHidden: action.payload,
      };
    },
    changeTabSelected(state, action) {
      return {
        ...state,
        tabSelected: action.payload,
      };
    },
    changeSubmitState(state, action) {
      return {
        ...state,
        isSuccessSubmit: action.payload,
      };
    },
    changeRemoveState(state, action) {
      return {
        ...state,
        isSuccessRemove: action.payload,
      };
    },
    updatePhotoList(state, action) {
      let photoFiles = [];
      if (action.payload) {
        action.payload.map((item, index) => {
          photoFiles.push({
            title: JSON.parse(decodeURIComponent(escape(atob(item.content)))).title,
            url: JSON.parse(decodeURIComponent(escape(atob(item.content)))).content,
            time: JSON.parse(decodeURIComponent(escape(atob(item.content)))).time,
          });
        });
      }
      if (photoFiles) {
        photoFiles.sort(function(a, b) {
          return a.time - b.time;
        });
      }
      return {
        ...state,
        photoFiles: photoFiles,
      };
    },
    saveInfoFromAPI(state, action) {
      const search = action.search.replace(/&+|=+/g, '_');
      return {
        ...state,
        infoFromAPI: {
          ...state.infoFromAPI,
          [action.pathname + '_' + search]: action.payload,
        },
      };
    },
    saveUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
  effects: {
    // 文字
    *getCurrentArticleList(action, { call, put }) {
      // 模拟网络延迟
      // yield new Promise((resolve) => {
      //   setTimeout(resolve, 3000);
      // })
      const articleList = yield call(getArticleList);
      if (articleList) {
        const article = yield articleList.map((item, i) => {
          return call(getArticle, articleList[i].name);
        });
        yield put({
          type: 'updateArticleList',
          payload: article,
        });
      } else {
        yield put({
          type: 'updateArticleList',
          payload: [],
        });
      }
    },
    *sendNewArticle(action, { put, call }) {
      const isSuccessSubmit = yield call(
        sendNewArticle,
        action.payload.title,
        action.payload.content
      );
      if (isSuccessSubmit) {
        yield put({
          type: 'changeSubmitState',
          payload: true,
        });
      } else {
        yield put({
          type: 'changeSubmitState',
          payload: false,
        });
      }
    },
    *removeArticle(action, { put, call }) {
      const articleInfo = yield call(getArticle, action.payload + '.md');
      const isSuccessRemove = yield call(removeArticle, action.payload, articleInfo.sha);
      if (isSuccessRemove) {
        yield put({
          type: 'changeRemoveState',
          payload: true,
        });
      } else {
        yield put({
          type: 'changeRemoveState',
          payload: false,
        });
      }
    },
    // 图片
    *getCurrentPhotoList(action, { call, put }) {
      const photoList = yield call(getPhotoList);
      if (photoList) {
        const photo = yield photoList.map((item, i) => {
          return call(getPhoto, photoList[i].name);
        });
        yield put({
          type: 'updatePhotoList',
          payload: photo,
        });
      } else {
        yield put({
          type: 'updatePhotoList',
          payload: [],
        });
      }
    },
    *sendNewPhoto(action, { put, call }) {
      const isSuccessSubmit = yield call(
        sendNewPhoto,
        action.payload.title,
        action.payload.content
      );
      if (isSuccessSubmit) {
        yield put({
          type: 'changeSubmitState',
          payload: true,
        });
      } else {
        yield put({
          type: 'changeSubmitState',
          payload: false,
        });
      }
    },
    *removePhoto(action, { put, call }) {
      const photoInfo = yield call(getPhoto, action.payload + '.png');
      const isSuccessRemove = yield call(removePhoto, action.payload, photoInfo.sha);
      if (isSuccessRemove) {
        yield put({
          type: 'changeRemoveState',
          payload: true,
        });
      } else {
        yield put({
          type: 'changeRemoveState',
          payload: false,
        });
      }
    },
    *getInfoFromAPI(action, { put, call }) {
      const info = yield call(getInfoFromAPI, action.pathname, action.search);
      if (info) {
        yield put({
          type: 'saveInfoFromAPI',
          payload: info,
          pathname: action.pathname,
          search: action.search,
        });
      }
    },
    *getUserInfo(action, { put, call }) {
      const info = yield call(getUserInfo);
      if (info && info.items) {
        yield put({
          type: 'saveUserInfo',
          payload: info.items[0],
        });
      }
    },
  },
};
