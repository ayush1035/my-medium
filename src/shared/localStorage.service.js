import {TOKEN} from './constants.js'

export const get = () => {
    return window.localStorage.getItem(TOKEN);
};

export const update = (token) => {
    window.localStorage.setItem(TOKEN, token);
};

export const remove = () => {
    window.localStorage.removeItem(TOKEN);
};

export default {
    get,
    update,
    remove
};