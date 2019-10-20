import {
    mount,
    createLocalVue
} from "@vue/test-utils";

import router from "../../../src/router";
import store from "../../../src/store";
import Comment from "../../../src/components/Comment";

const localVue = createLocalVue();
const createWrapper = () => {
    return mount(Comment, {
        localVue,
        router,
        store,
        propsData: {
            slug: "Foo",
            comment:{
                id:1,
                body:"",
                author:{
                    username:'',
                    image:''
                }

            }
          }
    });
};

describe("Comment", () => {
    it("should not update the route on click on home route", async () => {
        const wrapper = createWrapper();
        const routerBefore = wrapper.vm.$route.path;
        wrapper.find("a").trigger("click");
        await localVue.nextTick();
        expect(wrapper.vm.$route.path).toBe(routerBefore); 
    });

    it("total number of routers", () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll("a").length).toEqual(2);
    });
    it("total number of p ", () => {
        const wrapper = createWrapper();
        expect(wrapper.findAll("p").length).toEqual(1);
    })
});