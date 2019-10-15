import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import LocalStorageService from "./localStorage.service";
import {API_URL} from "./constants.js";

const HttpService = {
    setup() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;

    },
    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${LocalStorageService.get()}`;
    },
    get(url, id = "") {
        return Vue.axios.get(`${url}/${id}`).catch(error => {
            console.log(error)
        });
    },

    getWithParams(url,params){
        return Vue.axios.get(url,params).catch(error => {
            console.log(error)
        });
    },

    post(url, params) {
        return Vue.axios.post(`${url}`, params);
    },

    put(url, params) {
        return Vue.axios.put(`${url}`, params);
    },

    delete(url) {
        return Vue.axios.delete(url).catch(error => {
            console.log(error)
        });
    }
}

export default HttpService;