import LocalStorgeService from "@/shared/localStorage.service";
import 
    HttpService
 from "@/shared/http.service";
import {
    LOGIN,
    LOGOUT,
    REGISTER
} from "./actionType";

import {
    SET_USER,
    UNSET_USER
} from "./mutationType";

const state = {
    status: '',
    token: LocalStorgeService.get() || '',
    isLoggedIn: !!LocalStorgeService.get(),
    user: {}
};

const getters = {
    isLoggedIn(state) {
        return state.isLoggedIn;
    }
};

const actions = {
    [LOGIN](context, payload) {
        return new Promise(res => {
            HttpService.post("users/login", {
                user: payload
            }).then(({data}) => {
                context.commit(SET_USER, data.user);
                res(data);
            })
        })
    },
    [LOGOUT](context) {
        context.commit(UNSET_USER);
    },
    [REGISTER](context, payload) {
        return new Promise(res => {
            HttpService.post("users", {
                    user: payload
                })
                .then((
                    {data}
                ) => {
                    debugger;
                    context.commit(SET_USER, data.user);
                    res(data);
                });
        });
    },

};

const mutations = {
    [SET_USER](state, user) {
        state.user = user;
        state.isLoggedIn = true;
        LocalStorgeService.update(state.user.token);
    },
    [UNSET_USER](state) {
        state.isLoggedIn = false;
        state.user = {};
        LocalStorgeService.remove();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};