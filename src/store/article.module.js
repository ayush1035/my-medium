import
HttpService
from "@/shared/http.service";
import {
    GET_ARTICLE,
    GET_COMMENTS,
    COMMENT_CREATE,
    COMMENT_DELETE
} from "./actionType";
import {
    GET_START,
    GET_END,
    SET_COMMENTS
} from "./mutationType";


const state = {
    article: {},
    comments: [],
    isLoading: true
};

const getters = {
    article(state) {
        return state.article;
    },
    comments(state) {
        return state.comments;
    }
};

const actions = {
    [GET_ARTICLE](context, payload) {
        context.commit(GET_START);
        //checking the version of the feed
        return HttpService.get("articles", payload.slug).then(({
            data
        }) => {
            context.commit(GET_END, data);
        }).catch(error => {
            console.log(error);
        })

    },
    [GET_COMMENTS](context, payload) {
        context.commit(GET_START);
        //checking the version of the feed
        return HttpService.get("articles/"+payload.slug + '/comments').then(({
            data
        }) => {
            context.commit(SET_COMMENTS, data);
        }).catch(error => {
            console.log(error);
        })
    },
    [COMMENT_CREATE](context,payload){
        context.commit(GET_START);
        //checking the version of the feed
        return HttpService.post("articles/"+ payload.slug + '/comments',{comment:{body:payload.comment}}).then((
        ) => {
            context.dispatch(GET_COMMENTS, payload);
        }).catch(error => {
            console.log(error);
        })
        
    },
    [COMMENT_DELETE](context,payload){
        context.commit(GET_START);
        //checking the version of the feed
        debugger
        return HttpService.delete(`articles/${payload.slug}/comments/${payload.commentId}`).then((
        ) => {
            context.dispatch(GET_COMMENTS, payload);
        }).catch(error => {
            console.log(error);
        })
    }
};

const mutations = {
    [GET_START](state) {
        state.isLoading = true;
    },
    [GET_END](state, {
        article
    }) {
        state.isLoading = false;
        state.article = article;
    },
    [SET_COMMENTS](state, {
        comments
    }) {
        state.isLoading = false;
        state.comments = comments;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};