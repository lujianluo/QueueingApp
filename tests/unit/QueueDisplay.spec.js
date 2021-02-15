import App from '@/App.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("App.vue", () => {
  it("router redirection", () => {
    const wrapper = shallowMount(App, {
      localVue
    })
    const $route = {
      name: "home"
    }
    expect(wrapper.vm.$route.name).toBe($route.name)
  });
});

