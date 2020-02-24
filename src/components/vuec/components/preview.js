import transform from "../utils/transform";
import { compile, parseComponent } from "vue-template-compiler";
export default {
  name: "preview",

  props: {
    value: String,
    default: ""
  },

  render(h) {
    // 查找template
    const parse = parseComponent(this.value);
    const code = compile(parse.template.content);

    // debugger;
    return transform.renderFunc(h, code.ast, parse.script);
  }
};
