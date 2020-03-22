import { createLocalVue, shallowMount } from "@vue/test-utils";
import preview from "../components/preview.js";

const localVue = createLocalVue();

describe("vuec ", () => {
  it("simple template", () => {
    localVue;
    const code = `
    <template>
      <div>Hello, world!</div>
    </template>
    <style scoped>
      .test-style {
        color: red;
      }
    </style>
    `;
    const wrapper = shallowMount(preview, {
      localVue,
      propsData: { value: code }
    });

    console.log(document.getElementsByTagName("style"))
    // got 
    // console.log packages/vuec/__tests__/style.spec.js:24
    //   HTMLCollection {}
    expect(wrapper.element).toBe(true);
  });
});
