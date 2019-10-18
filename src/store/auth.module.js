import LocalStorgeService from "@/shared/localStorage.service";
import
HttpService
from "@/shared/http.service";
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    CHECK_USER
} from "./actionType";

import {
    SET_USER,
    UNSET_USER
} from "./mutationType";
import Vue from 'vue'


const state = {
    status: '',
    token: LocalStorgeService.get() || '',
    isLoggedIn: !!LocalStorgeService.get(),
    user: {}
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isLoggedIn(state) {
        return state.isLoggedIn;
    }
};

const actions = {
    [LOGIN](context, payload) {
        return new Promise(res => {
            HttpService.post("users/login", {
                user: payload
            }).then(({
                data
            }) => {
                context.commit(SET_USER, data.user);
                res(data);
            }).catch((error)=>{
                Vue.toasted.show("Email or password "+error.response.data.errors["email or password"]);
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
                .then(({
                    data
                }) => {
                    context.commit(SET_USER, data.user);
                    res(data);
                }).catch((error)=>{
                    let err = error.response.data.errors;
                    for(var eobj in err)
                    {
                        Vue.toasted.show(eobj +" "+  err[eobj]);   
                    }

                });
        });
    },
    [CHECK_USER](context) {
        if (LocalStorgeService.get()) {
            HttpService.setHeader();
            HttpService.get("user")
                .then(({
                    data
                }) => {
                    context.commit(SET_USER, data.user);
                })
                .catch(({
                    response
                }) => {
                    console.log(response.data.errors);
                });
        } else {
            context.commit(UNSET_USER);
        }
    }

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