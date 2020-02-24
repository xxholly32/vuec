import { createLocalVue, shallowMount } from "@vue/test-utils";
import preview from "@/components/vuec/components/preview.js";

const localVue = createLocalVue();

describe("vuec ", () => {
  it("simple template", () => {
    const code = `
    <template>
      <div>Hello, world!</div>
    </template>
    `;
    const wrapper = shallowMount(preview, {
      localVue,
      propsData: { value: code }
    });
    expect(wrapper.contains("div")).toBe(true);
  });

  it("simple template with data", () => {
    const code = `
    <template>
      <div>Hello, {{ name }}!</div>
    </template>

    <script>
      export default {
        data() {
          return { name: 'world' }
        }
      }
    </script>
    `;
    const wrapper = shallowMount(preview, {
      localVue,
      propsData: { value: code }
    });
    expect(wrapper.find("div").text()).toBe("Hello, world!");
  });

  // it("simple template with attr", () => {
  //   const code = `
  //   <template>
  //     <hello-world :msg="msg" />
  //   </template>

  //   <script>
  //     export default {
  //       data() {
  //         return {  msg: "Hello, world!" }
  //       }
  //     }
  //   </script>
  //   `;
  //   const wrapper = shallowMount(preview, {
  //     localVue,
  //     propsData: { value: code }
  //   });
  //   expect(wrapper.find("div").text()).toBe("Hello, world!");
  // });
});
