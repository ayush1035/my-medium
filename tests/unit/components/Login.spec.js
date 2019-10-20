import {
    mount,
    createLocalVue
} from "@vue/test-utils";

import router from "../../../src/router";
import store from "../../../src/store";
import Login from "../../../src/views/Login";

const localVue = createLocalVue();
const createWrapper = () => {
    return mount(Login, {
        localVue,
        router,
        store
    });
};

describe("Login", () => {
    it("should  update the route on click on home route", async () => {
        const wrapper = createWrapper();
        const routerBefore = wrapper.vm.$route.path;
        wrapper.find("a").trigger("click");
        await localVue.nextTick();
        expect(wrapper.vm.$route.path).not.toBe(routerBefore); // Signup route
    });

    it("total number of routers", () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll("a").length).toEqual(1);
    });
    it("total number of input fields", () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll("input").length).toEqual(2);
    })
});