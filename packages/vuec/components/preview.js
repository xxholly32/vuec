import transform from "../utils/transform";
import { compile, parseComponent } from "vue-template-compiler";
export default {
  name: "preview",

  props: {
    value: String,
    default: ""
  },

  render: function(h) {
    let self = this;
    if (self.value.indexOf("template") > -1) {
      // 查找template
      const parse = parseComponent(self.value);
      const code = compile(parse.template.content);

      return transform.renderFunc(h, code.ast, parse.script, self);
    }
  }
};
