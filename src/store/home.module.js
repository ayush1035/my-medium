import
HttpService
from "@/shared/http.service";
import {
    GET_GLOBAL_ARTICLES,
    GET_PROFILE_ARTICLES
} from "./actionType";
import { GET_START, GET_END } from "./mutationType";


const state = {
    articles: [],
    isLoading: true,
    totalArticles:0
};

const getters = {
    articles(state) {
        return state.articles;
    },
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
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};