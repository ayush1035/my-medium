import
HttpService
from "@/shared/http.service";
import {
    GET_GLOBAL_ARTICLES,
    GET_PROFILE_ARTICLES,
    GET_TAG_ARTICLES,
    UPDATE_ARTICLE_IN_LIST,
    GET_TAGS
} from "./actionType";
import { GET_START, GET_END,SET_TAGS } from "./mutationType";


const state = {
    articles: [],
    isLoading: true,
    totalArticles:0,
    tags:[]
};

const getters = {
    articles(state) {
        return state.articles;
    },
    totalArticles(state){
        return state.totalArticles
    },
    tags(state){
        return state.tags;
    },
    isLoading(state){
        return state.isLoading
    }
};

const actions = {
    [GET_GLOBAL_ARTICLES](context, payload) {
        context.commit(GET_START);
        //checking the version of the feed
        let url = payload.version == "global" ? 'articles':'articles/feed';
        return HttpService.getWithParams(url,payload).then(({data})=>{
            context.commit(GET_END,data);
        }).catch(error=>{
            console.log(error);
        })

    },
    [GET_PROFILE_ARTICLES](context,payload){
        context.commit(GET_START);  
        return HttpService.getWithParams("articles",payload).then(({data})=>{
            context.commit(GET_END,data);
        }).catch(error=>{
            console.log(error);
        })
    },
    [GET_TAG_ARTICLES](context,payload){
        context.commit(GET_START);  
        return HttpService.getWithParams("articles",payload).then(({data})=>{
            context.commit(GET_END,data);
        }).catch(error=>{
            console.log(error);
        })
    },
    [GET_TAGS](context){
        return HttpService.get("tags")
      .then(({ data }) => {
        context.commit(SET_TAGS, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
    }
};

const mutations = {
    [GET_START](state) {
        state.isLoading = true;
    },
    [GET_END](state,{articles,articlesCount}){
        state.isLoading = false;
        state.articles = articles;
        state.totalArticles = articlesCount;
    },
    [UPDATE_ARTICLE_IN_LIST](state, data) {
        state.articles = state.articles.map(article => {
          if (article.slug !== data.slug) {
            return article;
          }
          // We could just return data, but it seems dangerous to
          // mix the results of different api calls, so we
          // protect ourselves by copying the information.
          article.favorited = data.favorited;
          article.favoritesCount = data.favoritesCount;
          return article;
        });

    },
    [SET_TAGS](state, tags) {
        state.tags = tags;
      },
};

export default {
    state,
    actions,
    mutations,
    getters
};