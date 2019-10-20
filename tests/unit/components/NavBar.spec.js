import { mount, createLocalVue } from "@vue/test-utils";

import router from "../../../src/router";
import store from "../../../src/store";
import VTag from "../../../src/components/NavBar";

const localVue = createLocalVue();
const createWrapper = () => {
  return mount(VTag, {
    localVue,
    router,
    store
  });
};

describe("NavBar", () => {
  it("should not update the route on click on home route", async () => {
    const wrapper = createWrapper();
    const routerBefore = wrapper.vm.$route.path;
    wrapper.find("a").trigger("click");
    await localVue.nextTick();
    expect(wrapper.vm.$route.path).toBe(routerBefore); // home route
  });

  it("total number of routers", () => {
    const wrapper = createWrapper();
    expect(wrapper.findAll("a").length).toEqual(4);
    // expect(wrapper.vm.$route.path).toBe(routerBefore); // home route
  })
});
