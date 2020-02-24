import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import { createRenderer } from "vue-server-renderer";
import preview from "../components/preview.js";
import ElementUI from "element-ui";

import HelloWorld from "../../../src/components/HelloWorld.vue";

const localVue = createLocalVue();

// localVue.component("HelloWorld", HelloWorld);

describe("vuec ", () => {
  it("simple template", () => {
    localVue;
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

  it("simple template with attr", () => {
    const code = `
    <template>
      <hello-world :msg="msg" />
    </template>

    <script>
      export default {
        data() {
          return {  msg: "Hello, world!" }
        }
      }
    </script>
    `;

    const wrapper = mount(preview, {
      localVue,
      sync: false,
      propsData: { value: code },
      stubs: {
        // 使用一个特定的实现作为存根
        "hello-world": HelloWorld
      }
    });

    expect(wrapper.find("h1").text()).toBe("Hello, world!");
  });

  it("simple template with elementui button", () => {
    const code = `
    <template>
      <div>
        <el-button type="primary">{{ msg }}</el-button>
      </div>
    </template>

    <script>
      export default {
        data() {
          return {  msg: "Hello, world!" }
        }
      }
    </script>
    `;

    localVue.use(ElementUI);

    const wrapper = mount(preview, {
      localVue,
      sync: false,
      propsData: { value: code }
    });

    expect(wrapper.find("span").text()).toBe("Hello, world!");
  });
});
