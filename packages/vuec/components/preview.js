import transform from "../utils/transform";
import { compile, parseComponent } from "vue-template-compiler";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
export default {
  name: "vuec-preview",

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

      if (parse.styles[0]) {
        this.compliorStyle(parse.styles[0].content);
      }

      return transform.renderFunc(h, code.ast, parse.script, self);
    }
  },
  methods: {
    compliorStyle(content) {
      postcss([autoprefixer])
        .process(content, {
          from: undefined,
          to: undefined
        })
        .then(result => {
          result.warnings().forEach(warn => {
            console.warn(warn.toString());
          });
          // console.log(result.css);
          let style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = result.css;
          document
            .getElementsByTagName("HEAD")
            .item(0)
            .appendChild(style);
        });
    }
  }
};
