import
HttpService
from "@/shared/http.service";
import {
    GET_PROFILE,
} from "./actionType";
import { GET_START, GET_END } from "./mutationType";


const state = {
    profile: {},
    isLoading: true
};

const getters = {
    profile(state) {
        return state.profile;
    },
};

const actions = {
    [GET_PROFILE](context, payload) {
        context.commit(GET_START);
        //checking the version of the feed
        return HttpService.get("profiles",payload.username).then(({data})=>{
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
    [GET_END](state,{profile}){
        state.isLoading = false;
        state.profile = profile;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};